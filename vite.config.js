import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const dataFile = new URL('./src/data/portfolio.json', import.meta.url)

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

/**
 * Fills the %SITE_*% placeholders in index.html from the `site` block of
 * portfolio.json, so the page title and meta tags share the same source of
 * truth as the rest of the app (and are present in the HTML for crawlers).
 */
function portfolioMeta() {
  return {
    name: 'portfolio-meta',
    transformIndexHtml(html) {
      const { site } = JSON.parse(readFileSync(dataFile, 'utf-8'))
      return html
        .replaceAll('%SITE_TITLE%', escapeHtml(site.title))
        .replaceAll('%SITE_DESCRIPTION%', escapeHtml(site.description))
        .replaceAll('%SITE_THEME_COLOR%', escapeHtml(site.themeColor))
    },
  }
}

export default defineConfig({
  plugins: [react(), portfolioMeta()],
})

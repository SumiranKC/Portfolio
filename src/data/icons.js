/**
 * JSON can't hold React components, so `portfolio.json` refers to icons by
 * name (e.g. "icon": "Code2") and this registry turns the name into a
 * lucide-react component.
 *
 * To use a new icon: import it from lucide-react and add it to `icons`.
 * Icons are imported one by one (not `import * as`) so the bundle stays small.
 */
import { BrainCircuit, Brush, Code2, Layers3, Sparkles } from 'lucide-react'

const icons = { BrainCircuit, Brush, Code2, Layers3, Sparkles }

const FALLBACK_ICON = Sparkles
const warned = new Set()

export function getIcon(name) {
  const icon = icons[name]
  if (!icon && import.meta.env.DEV && !warned.has(name)) {
    warned.add(name)
    console.warn(`[portfolio] Unknown icon "${name}" in portfolio.json. Available: ${Object.keys(icons).join(', ')}`)
  }
  return icon ?? FALLBACK_ICON
}

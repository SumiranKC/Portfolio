/**
 * Data-access layer for the portfolio.
 *
 * `portfolio.json` is the single source of truth for every piece of content
 * shown on the site. Components never import the JSON directly — they call the
 * functions below. If the data ever moves (a CMS, an API, a different file),
 * only this module needs to change.
 */
import data from './portfolio.json'

/** Page <title>, meta description and theme colour (also injected into index.html at build time). */
export const getSiteMeta = () => data.site

/** Name, initial, brand label and contact email. */
export const getProfile = () => data.profile

/** Header navigation links and the call-to-action button. */
export const getNavigation = () => data.navigation

/** Hero kicker, headline, intro text and the words around the spinning orbit. */
export const getHero = () => data.hero

/** Phrases shown in the scrolling ticker strip. */
export const getTicker = () => data.ticker

/** Heading copy, filter labels and modal copy for the projects section (without the items). */
export const getProjectsSection = () => {
  const { items: _items, ...section } = data.projects
  return section
}

/** Every project, in display order. */
export const getProjects = () => data.projects.items

/** Filter buttons: the "All" label followed by each project category. */
export const getProjectCategories = () => [data.projects.allCategoryLabel, ...data.projects.categories]

/** Projects belonging to `category`; the "All" label returns every project. */
export const getProjectsByCategory = (category) => (
  category === data.projects.allCategoryLabel
    ? data.projects.items
    : data.projects.items.filter((project) => project.category === category)
)

/** About section copy, stamp text and résumé link settings. */
export const getAbout = () => data.about

/** "What I bring" skills list. */
export const getSkills = () => data.skills

/** Experience section copy and the list of roles. */
export const getExperience = () => data.experience

/** Education section copy and the list of qualifications. */
export const getEducation = () => data.education

/** Contact section copy and contact form labels. */
export const getContact = () => data.contact

/** Footer tagline and social links. */
export const getFooter = () => data.footer

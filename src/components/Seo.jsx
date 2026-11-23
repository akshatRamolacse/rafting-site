import { useEffect } from 'react'

const SITE = 'Rishikesh Epic Adventure'

// Sets the tab title + meta description for the current page.
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : SITE
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    if (description) meta.content = description
  }, [title, description])
  return null
}

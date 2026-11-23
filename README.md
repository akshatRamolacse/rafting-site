# Rishikesh Epic Adventure

A fast, animated marketing and booking website for a Rishikesh adventure operator — **river rafting, bungee jumping and riverside camping on the Ganga**.

Built with React 19, Vite, Tailwind CSS v4, Framer Motion and React Router.

## Features

- **Multi-page site** – Home, Rafting, Bungee, Camping, Gallery, About, Guide, FAQ and Booking pages
- **Package listings** – rafting runs (9–70 km), camping trails ending at Neem Beach, and bungee jumps (55–200 m)
- **Booking form** – submissions can be sent to a Google Sheet through a Google Apps Script web app
- **One-tap contact** – call and WhatsApp buttons with a pre-filled message that matches the page being viewed
- **Visual polish** – scroll-driven "ride" hero built from image frames, a WebGL water shader, and reveal animations
- **SEO & accessibility** – per-page meta tags, FAQ accordion, mobile-first layout
- **Google Maps embed** for the office location

## Getting started

Requires [Node.js](https://nodejs.org) 20+.

```bash
git clone https://github.com/akshatRamolacse/rafting-site.git
cd rafting-site
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server with HMR        |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Lint with Oxlint                     |

## Configuration

### Booking form → Google Sheets (optional)

1. Create a Google Sheet and deploy a Google Apps Script web app that appends each POSTed JSON body as a row.
2. Copy `.env.example` to `.env` and set the web-app URL:
   ```
   VITE_SHEET_URL=https://script.google.com/macros/s/XXXX/exec
   ```
3. Restart the dev server.

Without `VITE_SHEET_URL`, the form still works but bookings are only logged to the browser console.

### Business details & content

Edit the files in `src/data/`:

| File          | Content                                       |
| ------------- | --------------------------------------------- |
| `contact.js`  | Phone, WhatsApp, email, address, map location |
| `packages.js` | Rafting, camping and bungee packages          |
| `faq.js`      | FAQ questions and answers                     |
| `gallery.js`  | Gallery items                                 |
| `team.js`     | Team members                                  |
| `images.js`   | Image paths used across the site              |

## Project structure

```
public/
  images/        Photos and logo
  frames/        Image sequence for the scroll-driven ride hero
src/
  components/    Navbar, Footer, heroes, cards, water shader, etc.
  pages/         One component per route
  data/          Editable site content
  lib/           Booking submission helper
```

## Deployment

It's a static single-page app, so it deploys to any static host (Vercel, Netlify, GitHub Pages, ...). Run `npm run build` and serve `dist/`. Configure the host to fall back to `index.html` for unknown routes so client-side routing works, and set `VITE_SHEET_URL` in the host's environment variables if you use the booking sheet.

## Tech stack

React 19 · Vite · Tailwind CSS 4 · Framer Motion · React Router 7 · Oxlint

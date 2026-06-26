# My Portfolio

Personal portfolio website for **Lan** — web developer.

Showcases projects, skills, and a contact form. Built with React, TypeScript, Tailwind CSS, and shadcn/ui.

**Owner:** Lan ([itsmeLan](https://github.com/itsmeLan))

## Tech stack

- Vite
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Recharts

## Getting started

Requires [Node.js](https://nodejs.org/) and npm.

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Enter the project directory
cd MyPortfolio

# Install dependencies
npm i

# Start the development server (http://localhost:8080)
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── components/     # Page sections (Hero, About, Projects, Contact, etc.)
├── pages/          # Index and NotFound routes
├── assets/         # Images (profile, project screenshots)
├── hooks/          # Custom React hooks
└── lib/            # Utilities
```

## Customization

- **Projects** — Edit the `projects` array in `src/components/Projects.tsx` (titles, links, descriptions, images).
- **About / skills** — Update `src/components/About.tsx`.
- **Contact** — Social links and form settings in `src/components/Contact.tsx`.
- **Theme** — Colors in `src/index.css`; dark/light toggle in the navbar.

## Deploy

Build the site with `npm run build` and deploy the `dist` folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## License

© Lan. All rights reserved.

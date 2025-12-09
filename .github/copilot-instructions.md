<!--
Guidance for AI coding agents working on this repository.
Keep concise — reference concrete files and patterns found in the codebase.
-->

# AI Assistant Instructions — portfolio

Quick summary
- This is a single-page React portfolio built with Vite + Tailwind CSS and Framer Motion.
- Core UI lives in `src/components/*`. App root is `src/App.jsx` which wraps the app in `CursorProvider`.

Architecture & data flow
- SPA (no React Router). Navigation uses anchor links (e.g. `#projects`) and `react-scroll` for smooth scrolling.
- Global interaction state: `src/context/CursorContext.jsx` provides `cursorVariant` and is consumed by `src/components/CustomCursor.jsx` and many components (see `Navbar.jsx`, `Contact.jsx`).
- Mouse position is tracked in `src/hooks/useMousePosition.js` and drives `CustomCursor` variants.
- Project content is data-driven: see `src/data/projects.js` for the `projectData` array used by `Projects.jsx`.

Important files to inspect for changes (examples)
- `src/components/Contact.jsx` — contact form implementation and Web3Forms integration. Search for `accessKey` (currently inlined) and follow the existing fetch POST pattern to `https://api.web3forms.com/submit`.
- `src/context/CursorContext.jsx` and `src/components/CustomCursor.jsx` — cursor state and motion variants. Variants are defined inline in the component and use `useMousePosition`.
- `src/components/Navbar.jsx` — header layout, mobile menu (Framer Motion + AnimatePresence), and `navLinks` array of anchors.
- `src/data/projects.js` — canonical shape for adding project entries (title, description, tech, imageUrl, githubUrl, liveUrl).
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup (class names used widely across components).

Build, run, and developer workflows
- Install dependencies: `npm install` (Node.js + npm required).
- Dev server: `npm run dev` (Vite default — serves on `http://localhost:5173` unless port overridden).
- Build: `npm run build`.
- Preview production build: `npm run preview`.
- Linting: `npm run lint` (project uses ESLint — check `eslint.config.js`).
- There are no automated tests present in the repo.

Conventions & patterns
- File types: mostly `.jsx` for React components and `.js` for hooks/data.
- Component naming: PascalCase (e.g. `Navbar.jsx`, `CustomCursor.jsx`). Place new components under `src/components`.
- Styling: Tailwind utility classes inline; avoid adding extra CSS unless required. Global styles in `src/index.css` and `App.css`.
- Animations: use `framer-motion` `motion` components and `variants` pattern, consistent with existing components.
- State: prefer lightweight React state and small Context providers (no global state manager).

Integration points & external dependencies
- Web3Forms: contact form posts to `https://api.web3forms.com/submit`. The access key is currently hard-coded in `Contact.jsx`. If moving to env vars, update `README.md` steps and ensure Vite uses `import.meta.env.VITE_...` and `.env` entries.
- SweetAlert2: used for form success/error UI in `Contact.jsx` via `sweetalert2-react-content` wrapper.
- Framer Motion: used extensively for micro-interactions and menu animations.
- `@google-cloud/dialogflow` is listed in `package.json` but no obvious client-side usage — search before changing or removing.

Editing and adding new features (practical tips)
- When updating navigation or adding a new section:
  - Add an anchor id in the section component (e.g. `<section id="newsection">`).
  - Add a nav entry in `Navbar.jsx` `navLinks` array.
- To add a new project: follow `src/data/projects.js` shape and import the image into `src/assets/images`.
- To change cursor behavior: update `cursorVariant` values in `CursorContext` usage sites and the `variants` object in `CustomCursor.jsx`.
- If moving secrets into environment variables, follow Vite conventions (`VITE_` prefixed vars) and replace inline keys in `Contact.jsx` accordingly.

Search shortcuts for the repo
- Find contact form: `grep -R "web3forms" -n src || grep -R "web3forms" -n .`
- Find cursor usage: `grep -R "useCursor" -n src`
- Find project data: open `src/data/projects.js`.

Safety & change guidance
- Do not expose private keys or personal secrets in committed source. If you find keys (e.g. in `Contact.jsx`), notify maintainers and suggest using a `VITE_` env var.
- Confirm removal of dependencies like `@google-cloud/dialogflow` by searching usages first — it might be a leftover.

If unsure
- Run the dev server (`npm run dev`) to see live UI changes — it's the fastest feedback loop.
- Ask for clarification on desired UX before making visual changes (Framer Motion seat-of-the-pants edits can break timing).

Files referenced in these instructions
- `src/App.jsx`, `src/components/*`, `src/context/CursorContext.jsx`, `src/components/CustomCursor.jsx`, `src/hooks/useMousePosition.js`, `src/data/projects.js`, `src/components/Contact.jsx`, `package.json`, `README.md`, `tailwind.config.js`, `eslint.config.js`.

Please review and tell me if you'd like more detail in any section (examples, code snippets, or recipes for common edits).

# AGENTS.md

## Commands
- `npm run dev` - Start dev server with HMR
- `npm run build` - Production build to `dist/`
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Tech Stack
- React 19 + React Compiler (Babel)
- Vite 8
- No TypeScript
- @dnd-kit for drag-and-drop

## Notes
- Entry point: `src/App.jsx`
- Build output: `dist/`
- ESLint uses flat config (`eslint.config.js`)
- Ignore `dist/` directory in linting
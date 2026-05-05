# Bilingual Robotics Research Report

Single-page bilingual (ZH/EN) web report template for robotics and embodied AI market investigation, partnership strategy, and commercial engagement support.

## Run

```bash
npm install
npm run dev
```

Build preview:

```bash
npm run build
npm run preview
```

## Content Replacement Guide

Update data-only files without touching UI components:

- `src/data/chapters.ts`: chapter order, chapter labels, titles.
- `src/data/content.ts`: all bilingual text blocks, bullets, table content, stats, scenario cards, competitor cards, references.

Language switch is controlled globally by `language` state in `src/pages/Home.tsx`.

## Implemented Features

- Dark-themed executive report layout.
- Bilingual content toggle (`zh` / `en`).
- Structured sections aligned to market research, partnership strategy, and commercial support.
- Charts and matrix tables for market and strategy analysis.
- Scroll spy navigation, reading progress bar, mobile TOC drawer, section reveal animations, back-to-top button.
- Print-friendly base (`vite.config.ts` uses `base: "./"` for local file access compatibility).
# Embodied Robot Investigation Report

Single-page bilingual (ZH/EN) web report for robotics and embodied AI research presentation.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content Replacement Guide

This project separates content from UI. Update data files only:

- `src/data/chapters.ts`: chapter order and labels.
- `src/data/content/reportContent.ts`: all bilingual section content, tables, chart numbers, and references.

### Common replacement targets

- **Section text**: update `intro` and `bullets`.
- **Market numbers**: update `marketTrendData`.
- **Capability radar**: update `capabilityRadarData`.
- **Comparison tables**: update `table.headers` and `table.rows`.
- **Reference links**: update `references` entries.

## Presentation Features

- Scroll spy desktop navigation
- Mobile chapter drawer
- Top reading progress bar
- Back-to-top button
- Section reveal animation
- Market area chart and capability radar chart
- Responsive table containers

## Recommended Delivery Checklist

- Replace placeholder data with final sources.
- Verify all external links open and are current.
- Confirm bilingual text is aligned by meaning.
- Validate mobile display (`<1024px`) for table scrolling.
- Export to PDF using browser print once final data is in place.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

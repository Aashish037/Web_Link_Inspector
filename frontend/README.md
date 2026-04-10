# PhishGuard — Frontend (React + Vite)

This folder contains the React web client for the PhishGuard application.
The frontend calls the backend API to extract URL features and display predictions.

## Frontend folder structure
```
frontend/
├── package.json            ← npm scripts and dependencies
├── postcss.config.js       ← Tailwind / PostCSS config
├── vite.config.js          ← Vite build configuration
├── public/                 ← Static assets served by Vite
└── src/
    ├── App.jsx             ← Main application component
    ├── main.jsx            ← React entry point
    ├── index.css           ← Global styles
    ├── components/         ← Reusable UI components
    │   ├── analyzer/
    │   │   ├── FeaturePanel.jsx
    │   │   ├── FeatureToggle.jsx
    │   │   ├── ResultCard.jsx
    │   │   └── URLInput.jsx
    │   ├── common/
    │   │   ├── Footer.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── Navbar.jsx
    │   └── features/
    │       └── FeatureChart.jsx
    ├── hooks/              ← Custom React hooks
    │   └── useAnalyzer.js
    ├── pages/              ← Page views
    │   ├── AboutPage.jsx
    │   ├── AnalyzerPage.jsx
    │   ├── FeaturesPage.jsx
    │   └── HomePage.jsx
    ├── services/           ← API calls and helpers
    │   └── api.js
    └── utils/              ← Shared utilities
        └── featureLabels.js
```

## Prerequisites
- Node.js 18+ installed
- npm available in your PATH
- Backend server running separately for full API access

## Setup and run
1. Open a terminal in `d:\phishguard\frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at the URL shown by Vite, typically:
   - `http://localhost:5173`

## Build and preview
Build the production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## Useful scripts
- `npm run dev` — start the Vite development server
- `npm run build` — build the frontend for production
- `npm run preview` — preview the built app
- `npm run lint` — run ESLint on the frontend code

## Notes
- Start the backend server before using the frontend if you want real API responses.
- The frontend code is located under `src/`, with UI components in `src/components/` and API helpers in `src/services/api.js`.

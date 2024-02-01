# OffBlocks Admin Dashboard

[![Main CI Status](https://github.com/dwolfgram/offblocks-admin/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/dwolfgram/offblocks-admin/actions?query=workflow:test+branch:master)

A dashboard to view a list of transactions and transaction details. APIs including sign up are mocked in /src/mocks. I chose to use react-query to handle data fetching / caching / retrying due to ease of use and the large amount of features it offers. Jotai atoms for global state such as auth information. Zod is used for type validation.

Testing Steps:

- Sign up with email and password (this will be stored so you can login again with it)
- View list of transactions and use pagination
- Click transaction to see transaction detail modal
- Light and dark themes provided

Mock data & apis live in src/mocks.
Querying / endpoints are in src/api.

The API is built to be able to pull lists of transactions by accounts where ideally only the necessary fields to show them in a table are returned. Then, when
a user clicks into the modal it can load the whole object. React-query makes it really easy to set how long the data is considered fresh for and so data that won't change can be cached for a long time.

## Installation

- [Install nvm](https://github.com/nvm-sh/nvm) (Node version manager)
- Install Node v20 and upgrade npm
  ```bash
  nvm install 20
  nvm use 20
  npm upgrade -g npm
  ```
- Clone this repository
  ```bash
  git clone https://github.com/dwolfgram/offblocks-admin.git
  ```
- Install project dependencies
  ```bash
  npm i
  ```
- Edit the `.env` file

## Usage

Start the app locally

```bash
npm start
```

Vite will run web server in the development mode at `http://localhost:3000`.

This project includes [Mock Service Worker](https://mswjs.io/) to mock API. It starts automatically and provides API for authentication and user functionality.

## Building for Production

Build the app for production

```bash
npm run build
```

The app is then ready to be deployed from the `/dist` folder. See the [Building for Production](https://vitejs.dev/guide/build.html#browser-compatibility) and [Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html) for more information.

### Analysing & Visualizing production JS bundle

There are 2 different tools to analyze and visualize the production JS bundle:

- source-map-explorer
  ```bash
  npm run analyze
  ```
- rollup-plugin-visualizer
  ```bash
  npm run visualize
  ```

## Testing

Launch the test runner in the interactive watch mode

```bash
npm run test
```

Vitest also provides a [neat UI](https://vitest.dev/guide/ui.html) to view and interact with the tests. Open it by running `npm run test:ui`.

See [Vitest docs](https://vitest.dev/) for more information.

## Prettier

This project uses [Prettier](https://prettier.io/), an opinionated code formatter, to ensure that the whole codebase conforms to a consistent style.

Prettier runs when:

- developer manually executes `npm run format` command
- in IDE on file-save if configured ([VSCode](https://github.com/prettier/prettier-vscode), [IntelliJ IDEA](https://prettier.io/docs/en/webstorm.html))
- automatically on `pre-commit` hook, right before code is committed
- during CI

## ESLint

Project comes with ESLint configured. It helps us prevent common errors.

Code quality concerns, best practices, possible logical issues etc. are checked by [ESLint](https://eslint.org/docs/latest/user-guide/). Our custom ESLint configuration [.eslintrc.cjs](./.eslintrc.cjs) includes these rules and plugins:

ESLint runs when:

- developer manually executes `npm run lint` command
- developer starts Vite dev server by `npm start` command
- in IDE on background if supported ([VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [IntelliJ IDEA](https://www.jetbrains.com/help/webstorm/eslint.html))
- automatically on `pre-commit` hook, right before code is committed
  - defining actions ([.husky/pre-commit](./.husky/pre-commit)) for git hooks is enabled by [Husky](https://github.com/typicode/husky)
  - linting only the files and changes being committed enables [lint-staged](https://github.com/lint-staged/lint-staged)
- during continuous integration defined in [.github/workflows/test.yml](./.github/workflows/test.yml)

## i18n

Running `npm run i18n` will first parse the whole codebase to find all used i18n keys. Then it inserts missing keys into the JSON files and removes deprecated keys which are not used in the codebase anymore. The result will be an alphabetically sorted JSONs containing all the currently used i18n keys in the codebase.

## CI/CD

This project is using [GitHub's Actions](https://github.com/features/actions) to run [integration tests](.github/workflows/test.yml) on each PR and Main branch. It includes running eslint, prettier, tests and building the app. PR becomes mergable only if it passes. We also show badge on top of `README.md` to show Main branch status.

There is also a [code-quality action](.github/workflows/codeql-analysis.yml) to run [Github's CodeQL](https://codeql.github.com/) analysis.

If you don't use GitHub you can remove the `.github` folder, otherwise follow these steps to configure your GitHub repository:

1. Go to Settings -> Branches -> Add rule
   - Apply to your master branch
   - Require status checks to pass before merging
   - Select build checks being run in test.yml

## What's Included

- [React](https://react.dev/) - library to build user interfaces
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
  - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) - Tailwind plugin for creating animations
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge) - merge Tailwind classes without conflicts
  - [clsx](https://github.com/lukeed/clsx) - utility to construct classNames conditionally
  - [cva](https://github.com/joe-bell/cva) - utility to create style variants
- [Radix UI](https://www.radix-ui.com/primitives) - low-level UI component library with a focus on a11y
  - [shadcn/ui](https://ui.shadcn.com/) - collection of designed components mostly based on Radix UI with focus on a11y
- [lucide icons](https://lucide.dev/) - icons set
- [Postcss](https://github.com/postcss/postcss)
  - [postcss-nesting](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting) - supports nesting CSS, following the [CSS Nesting specification](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting)
  - [autoprefixer](https://github.com/postcss/autoprefixer) - parse CSS and add vendor prefixes to rules by (caniuse.com)[https://caniuse.com/]
- [Theme Provider](./src/app/providers/Theme.tsx) - supports Light, Dark and System themes
- [TanStack Query](https://tanstack.com/query/) - asynchronous state management with declarative, always-up-to-date auto-managed queries and mutations
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation with static type inference
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) based API client
  - [zod-fetch](https://github.com/mattpocock/zod-fetch) - to make API client type-safe
- [i18next](https://www.i18next.com/) - internationalization framework
  - [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) - language detection plugin
  - [i18next-parser](https://github.com/i18next/i18next-parser) - parses the code, extracts translation keys and produces i18n resource file
- [Jotai](https://jotai.org/) - state management library
- [React Router](https://reactrouter.com/) - declarative routing
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) - simple reusable React error boundary component
- [JWT](https://jwt.io/) Authentication - including all the common features such as Sign-up, Sign-in, Sign-out, Reset password, Email confirmation
- [TypeScript](https://www.typescriptlang.org/) - typed superset of JavaScript
  - [@tsconfig/bases](https://github.com/tsconfig/bases) - strictest & Vite-React
  - [ts-reset](https://github.com/total-typescript/ts-reset) - a 'CSS reset' for TypeScript, improving types for common JavaScript API's
- [Vite](https://vitejs.dev/) - next generation frontend tooling
  - [React SWC plugin](https://github.com/vitejs/vite-plugin-react-swc) - speed up Vite dev server with SWC
  - [SVG plugin](https://github.com/pd4d10/vite-plugin-svgr) - transform SVGs into React components
  - [TypeScript & ESLint check plugin](https://vite-plugin-checker.netlify.app)
  - [TSConfig paths plugin](https://github.com/aleclarson/vite-tsconfig-paths) - support for TypeScript's path mapping in Vite
  - [Validate ENV vars plugin](https://github.com/Julien-R44/vite-plugin-validate-env)
- [Vitest](https://vitest.dev/) - blazing fast Vite-native unit test framework
  - [Testing Library](https://testing-library.com/) - simple and complete testing utilities that encourage good testing practices
    - [user-event](https://testing-library.com/docs/user-event/intro/) - simulates user interactions
    - [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) - provides [custom DOM element matchers](https://github.com/testing-library/jest-dom#custom-matchers)
  - [jsdom-testing-mocks](https://github.com/trurl-master/jsdom-testing-mocks) - a set of tools for emulating browser behavior in jsdom environment
  - [MSW](https://mswjs.io/) - API mocking library for browser and Node.js
    - [@mswjs/data](https://github.com/mswjs/data) - data modeling and relation library for testing
- [Prettier](https://prettier.io/) - opinionated code formatter
  - [package.json plugin](https://github.com/matzkoh/prettier-plugin-packagejson) - to sort the keys of a `package.json` file
  - [TW plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) - to sort Tailwind classes
- [ESLint](https://eslint.org/) - pluggable linting utility
- [Husky](https://github.com/typicode/husky) & [lint-staged](https://github.com/okonet/lint-staged) - run ESLint & Prettier before commiting new code
- [CI/CD](https://github.com/features/actions) - Github Actions to run integration tests on each PR & Main branch
- [source-map-explorer](https://github.com/danvk/source-map-explorer) - analyze and debug space usage through source maps
- [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) - visualize and analyze the production bundle

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run mock`

Run mocked backend using JSON Server on 4200 port.

Run `npm install -g json-server` to install json-server globally

Resources generated:

-   http://localhost:4200/entities
-   http://localhost:4200/topLevelIds

### `npm run lint`

Lint the application code to identify and report linter issues.
To automatically fix linter issues when possible, you can use:
`npm run lint:fix`

### `npm run pretier`

Run Prettier to automatically format your code, improving code consistency.

### `npm run e2e`

Open the Playwright Test Runner interface. This allows you to interactively run and debug your Playwright test scenarios.

### `npm run e2e:headless`

Execute Playwright test scenarios in the terminal. This is useful for running your tests in a continuous integration (CI)
environment or as part of automated workflows.

### Requirements

-   Use the up-to-date React library to create component logic and presentation. ✅
-   We suggest using PostCSS, LESS/SASS, CSS-modules or CSS-in-JS library to create styles. SCSS used ✅
-   You must not use special libraries for building TOCs and trees, but you can use additional libraries for secondary
    things like animations. ✅
-   JSON data should be loaded asynchronously using a local web server. ✅
-   Until TOC elements are rendered, the user must see a placeholder from a design template. ✅
-   When clicking on the root element of the TOC section, the tree must hide or expand. ✅
-   Create smooth animations for color and icon position changes. ✅
    -   Add animation for expanded list
-   Create functional autotests for your TOC component, using one of the following frameworks: Playwright, Cypress, React
    Testing Library, Enzyme, Puppeteer. ✅

### Nice bonus if you can make:

-   JS API Active topic choice by ID ✅
-   Topic filtering by string value
    Active filtering when entering text in the input field (this is not present in a design template) Filter results
    should appear when the user enters the whole query, not after each symbol
    You can put a loading indicator while waiting for results to render
-   Hiding and expanding TOC elements animation

### My ideas

-   It would be nice to Make Tree(including its children) component fully generic, currently internal business logic is
    dependant on our [Page, PageList](./src/interfaces/Page.ts) interface and [Theme type](./src/context/ThemeContext.ts).
    If the theme could be moved to the same UI library, as this component, Pages structure is harder to be taken outside
    it.

### Testing Scenarios - Tree Component

-   #### Placeholder Display
    Should display a placeholder until data is loaded.
-   #### Display Top-Level Items
    Should display a list of top-level items.
-   #### Hidden Levels
    Should not display elements with class level1, level2, or level3.
-   #### Display Child Elements
    Should display elements with class level1 after clicking on an element with class level0.
-   #### Active Element Styling
    Should have the "active" class on the selected element.
-   #### Special Highlight
    Should have a special highlight on child nodes of the active node at the first level or deeper.
-   #### Theme Switching
    Should allow the theme to be changed upon clicking the switch.
-   #### Error Handling
    Should display a retry button on backend failure.

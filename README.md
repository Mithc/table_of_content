# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

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

### Requirements

-   Use the up-to-date React library to create component logic and presentation. ✅
-   We suggest using PostCSS, LESS/SASS, CSS-modules or CSS-in-JS library to create styles. SCSS used ✅
-   You must not use special libraries for building TOCs and trees, but you can use additional libraries for secondary things like animations. ✅
-   JSON data should be loaded asynchronously using a local web server. ✅
-   Until TOC elements are rendered, the user must see a placeholder from a design template. ✅
-   When clicking on the root element of the TOC section, the tree must hide or expand. ✅
-   Create smooth animations for color and icon position changes. ✅
    -   Add animation for expanded lst
-   Create functional autotests for your TOC component, using one of the following frameworks: Playwright, Cypress, React Testing Library, Enzyme, Puppeteer.

### Nice bonus if you can make:

-   JS API Active topic choice by ID
-   Topic filtering by string value
    Active filtering when entering text in the input field (this is not present in a design template)
    Filter results should appear when the user enters the whole query, not after each symbol
    You can put a loading indicator while waiting for results to render
-   Hiding and expanding TOC elements animation

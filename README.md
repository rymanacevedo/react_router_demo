## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all dependencies from a package.json file

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/main/login?abbrevName=automation_10](http://localhost:3000/main/login?abbrevName=automation_10) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner.\
See the section about [vitest](https://vitest.dev) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.

To learn React, check out the [React documentation](https://react.dev/learn).

Learn more about [why](https://vitejs.dev/guide/why.html) we converted from Create React App to Vite.

### `npm run e2e`

Runs all ui playwright tests in headless mode on [http://localhost:3000/main/]

### `npm run e2e-stage`

Runs all ui playwright tests in headless mode on stage environment (qa1, qa2, etc - whatever declared in .env file)

## Set up .env file

Playwright.config.ts file and UI tests use variables from .env file. **.env** file need to be configured before running e2e tests.

Create .env file in the root of the project.\
Copy variables from .env.example file and paste them in your .env file.\
Assign values to the variables.\
Add .env file to .gitignore.

**Do not commit values in .env file to git repository**

### `npm run coverage:text` and `npm run coverage:html`

Creates e2e tests coverage report in text and html formats. Must be run after `e2e` or `e2e-stage` commands.\
HTML report is available in folder `coverage/index.html` and can be open by any browser.

### `npm run nyc:clear`
Removes `.nyc_output` folder contents.\
When playwright runs tests, raw json files are created in `.nyc_output` folder. NYC uses those files to create report coverage.\
To get correct test coverage report, folder `.nyc_output` should be emty before evry test run.

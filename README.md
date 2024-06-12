# [0] Playwright Framework

Welcome to the Playwright framework, a powerful end-to-end testing framework for web applications. This framework is designed with a Page Object Model (POM) approach for better organization and maintainability.

## [1] Table of Contents

1. [Installation](#installation)
2. [Playwright CLI](#playwright-cli)
3. [Project Structure](#project-structure)
4. [Adding the Framework to Local Machines](#adding-the-framework-to-local-machines)
5. [Contributing](#contributing)
6. [Resources](#resources)

---

## [2] Installation(follow this step after following [6])

To get started with the Playwright framework, you need to install Playwright and also install the playwright extension from vscode extension marketplace:

```bash
npm init playwright@latest 
```
## [3] Steps
![image](https://github.com/Odiggo/sullyai-automated-tests/assets/153859312/c7060386-890f-4790-bb63-53d498c59c91)

![image](https://github.com/Odiggo/sullyai-automated-tests/assets/153859312/338f586e-2167-43b5-8944-fcea95f855ae)


## [4] Playwright CLI

The Playwright CLI provides a set of commands to help you interact with your Playwright project. Here are some basic commands:

- **Run Tests:**
  ```bash
  npx playwright test
  ```

- **View Available Commands:**
  ```bash
  npx playwright test --help
  ```

Refer to the [Playwright documentation](https://playwright.dev/docs/test-cli) for a comprehensive list of CLI commands and options.

## [5] Project Structure

The project structure is organized for better maintainability:

```
.
├── e2e
│   ├── locators
│   │   ├── login.locators.ts
│   │   └── home.locators.ts
│   ├── pages
│   │   ├── 001.loginPage.ts
│   │   └── 002.homePage.ts
│   ├── utility
│   │   └── Utility.ts
└── tests
    ├── 001.happy-path.spec.ts
    └── playwright.config.ts
```

- **locators:** Contains DOM locators and related information.
- **pages:** Implements the Page Object Model with individual page files.
- **utility:** Houses utility functions that can be reused across tests.
- **tests:** Contains test files, such as `001.happy-path.spec.ts`.

## [6] Adding the Framework to Local Machines

To add this framework to your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Odiggo/sullyai-automated-tests.git
   ```

2. Navigate to the project folder:
   ```bash
   cd your-repo
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

Now, you have the Playwright framework set up locally on your machine.

## Resources

- [Playwright Documentation](https://playwright.dev/docs/)



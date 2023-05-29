---
date: 2023-05-29
title: ESLint in VS Code for Gatsby 5 blog
published: 2023-05-29
lastModified: 2023-05-29
---

1. Check that you have [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed.
2. (Optional) While you are playing with linters and VS Code extensions, you can think about a [linter for Markdown](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) files.
3. Install required npm development packages
4. Edit the config file

## npm packages

- @babel/eslint-parser (the parser)
- eslint (the linter itself)
- eslint-config-react-app (ESLint configuration used by Create React App)
- eslint-plugin-import (little addon just for import statements)
- eslint-plugin-jsx-a11y (for amazing SEO results)
- eslint-plugin-react (for JSX)

Install them with `yarn add --dev <packages>`


## ESLint config

My `.eslintrc.js`

```js
module.exports = {
  extends: [
    require.resolve(`eslint-config-react-app`),
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
  ],
  plugins: ["react", "jsx-a11y"],
  rules: {
    // react plugin - options
    "react/jsx-indent": [2, 2, {indentLogicalExpressions: true}],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    
    "prefer-const": "error", // ?
    "no-var": "error", // optional, recommended when using es6+
    "no-unused-vars": 1, // recommended
    "arrow-spacing": ["error", { before: true, after: true }], // recommended
    indent: ["error", 2],
    "comma-dangle": [
      "error",
      {
        objects: "only-multiline",
        arrays: "only-multiline",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],

    // options to emulate prettier setup
    // semi: ["error", "never"],
    // quotes: ["error", "double",  { "allowTemplateLiterals": true }],
    "max-len": ["error", { code: 160 }],
    "template-curly-spacing": ["error", "always"],
    "arrow-parens": ["error", "as-needed"],

    // standard.js
    "space-before-function-paren": [
      "error",
      {
        named: "always",
        anonymous: "always",
        asyncArrow: "always",
      },
    ],
  },
  parser: require.resolve(`@babel/eslint-parser`),
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: "latest",
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
}
```


## Notes

- I made it working without **gatsby-plugin-eslint**. If I understand it correctly that plugin makes the build fail if you have any linter errors.

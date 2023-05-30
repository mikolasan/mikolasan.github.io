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
    "react/prop-types": "off", // TODO: move to TypeScript

    "no-mixed-operators": "off", // ignore unexpected mix of '&&' and '||'.
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
    // semi: ["warn", "never"],
    // quotes: ["warn", "double",  { "allowTemplateLiterals": true }],
    "max-len": ["error", { code: 160 }],
    "template-curly-spacing": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],

    // standard.js
    "space-before-function-paren": [
      "error",
      {
        named: "never",
        anonymous: "never",
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

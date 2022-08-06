module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
  ecmaVersion: 2022,
  sourceType: "module"
  },
  ignorePatterns: [
    '.eslint*',
    '**/dist/',
    '**/node_modules'
  ],
  plugins: [
    "@typescript-eslint",
    "react-hooks"
  ],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off"
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  }
}
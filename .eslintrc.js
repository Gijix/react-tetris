module.exports = {
  root: true,
  ignorePatterns: ['static/**', 'types/types.ts'],
  env: {
    browser: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'node/no-callback-literal': 'off'
  }
}

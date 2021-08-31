module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    `plugin:vue/essential`,
    `airbnb-base`,
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: `module`,
  },
  plugins: [
    `vue`,
  ],
  rules: {
    semi: [
      `error`,
      `never`,
      {
        beforeStatementContinuationChars: `always`,
      },
    ],
    quotes: [`error`, `backtick`],
    'consistent-return': `off`,
    'no-param-reassign': `off`,
    'no-console': [`error`, { allow: [`info`, `warn`, `error`, `log`] }],
    'prefer-promise-reject-errors': `off`,
    'arrow-body-style': `off`,
    'newline-per-chained-call': `off`,
    'max-len': `off`,
    'no-plusplus': `off`,
    strict: 0,
    'no-shadow': `off`,
  },
}

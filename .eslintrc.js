module.exports = {
  root: true,

  parserOptions: {
    sourceType: 'module',
  },

  extends: ['@metamask/eslint-config'],

  overrides: [
    {
      files: ['*.js'],
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['*.ts', '*.tsx'],
      extends: ['@metamask/eslint-config-typescript'],
      rules: {
        '@typescript-eslint/no-parameter-properties': 0,
        'jsdoc/require-jsdoc': 0,
        'import/no-anonymous-default-export': 0,
      },
    },

    {
      files: ['*.test.ts', '*.test.js'],
      extends: ['@metamask/eslint-config-jest'],
      rules: {
        '@typescript-eslint/no-shadow': ['error', { allow: ['describe', 'expect', 'it'] }],
      },
    },
  ],

  ignorePatterns: ['!.prettierrc.js', '**/!.eslintrc.js', '**/dist*/', '**/*__GENERATED__*', '**/build', '**/public', '**/.cache'],
};

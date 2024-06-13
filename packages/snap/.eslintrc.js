module.exports = {
  extends: ['../../.eslintrc.js'],

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  overrides: [
    {
      files: ['snap.config.ts'],
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],

  rules: {
    'jsdoc/match-description': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-param-description': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    'jsdoc/check-tag-names': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },

  ignorePatterns: ['!.eslintrc.js', 'dist/'],
};

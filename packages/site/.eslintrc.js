module.exports = {
  extends: ['../../.eslintrc.js'],

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['@metamask/eslint-config-browser'],
      rules: {
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        'no-nested-ternary': 0,
        'require-unicode-regexp': 0,
        'no-restricted-syntax': 0,
        'jsdoc/require-returns': 0,
        'jsdoc/match-description': 0,
        'import/no-unassigned-import': 0,
        'import/extensions': 0,
      },
    },
  ],

  ignorePatterns: ['.cache/', 'public/'],
};

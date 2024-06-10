module.exports = {
  collectCoverageFrom: [
    // UI
    'src/ui/**/*.(ts|js|tsx|jsx)',
    '!src/ui/Providers.tsx',
    '!src/ui/assets/**/*',
    '!src/ui/common/icons/**/*',
    '!src/ui/query/**/*',
    '!src/ui/router/**/*',
    '!src/ui/common/components/feedback/ErrorHandler/**/*',
    '!src/ui/**/pages/**/*',
    '!src/ui/**/router/*Router.tsx',
    '!src/ui/locale/**/*',
    '!src/ui/error/**/*',
    // Domain
    'src/domain/**/*.(ts|js|tsx|jsx)',
    '!src/domain/error/**/*',
    '!src/domain/**/state/*',
    // Data Access
    'src/data-access/**/*.(ts|js|tsx|jsx)',
    '!src/data-access/repository/error/**/*',
    '!src/data-access/api/**/*',
    // Common
    '!src/**/adapter/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      statements: 0,
    },
    'src/ui': {
      branches: 0,
      statements: 0,
    },
    'src/domain': {
      branches: 0,
      statements: 0,
    },
    'src/data-access': {
      branches: 0,
      statements: 0,
    },
  },
  projects: ['<rootDir>/test/*/jest.config.js'],
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {},
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
        paths: ['./src'],
      },
    },
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'import/no-unresolved': 'off',
    'sort-imports': 'off',
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
  },
};

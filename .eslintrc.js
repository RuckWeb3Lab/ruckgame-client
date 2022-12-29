module.exports = {
  extends: ['next/core-web-vitals', 'plugin:import/typescript'],
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    // project: './tsconfig.eslint.json',
  },
  rules: {}
}

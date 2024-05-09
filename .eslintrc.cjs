/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    commonjs: true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: false
    }
  },
  plugins: ['vue', 'prettier', 'import', 'promise', 'node']
})

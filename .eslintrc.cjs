/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
    // ecmaFeatures: {
    //   globalReturn: false,
    //   impliedStrict: true,
    //   jsx: false
    // }
  }
})

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': ['error', {
      // 以单个词命名vue文件的白名单
      ignores: ['Home', 'Dashboard', 'Login', 'Logo', 'User', 'Role', 'Menu', 'Dict', '404']
    }],
  }
}

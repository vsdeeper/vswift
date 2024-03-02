/*
 * @Author: Lvshang vsdeeper@qq.com
 * @Date: 2024-03-02 15:57:28
 * @LastEditTime: 2024-03-02 16:40:50
 * @LastEditors: Lvshang vsdeeper@qq.com
 * @Description:
 */
import { defineConfig } from 'eslint-define-config';

module.exports = defineConfig({
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    './vswift-epc/.eslintrc-auto-import.json',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue', 'pe'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
});

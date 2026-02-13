// @ts-check
// import withNuxt from './.nuxt/eslint.config.mjs'

// export default withNuxt(
//   // Your custom configs here
// )

import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'

export default [
  // 🚫 ignore generated & build files
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'node_modules/**',
      'dist/**',
    ],
  },

  // ✅ Vue SFC
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser, // ⬅️ WAJIB
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...vue.configs['flat/recommended'].rules,
      ...tseslint.configs.recommended.rules,

      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },

  // ✅ TS / JS
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
]

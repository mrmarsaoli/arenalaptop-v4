module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/recommended',
    // 'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: { 
    'nuxt/no-cjs-in-config': 'off',
    'vue/no-v-html': 0
  }
}

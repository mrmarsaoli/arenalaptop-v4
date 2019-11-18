module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // parser: 'babel-eslint',
    parser: '@typescript-eslint/parser'
  },
  extends: [
    // '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    // 'prettier',
    'prettier/vue',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
    // 'plugin:nuxt/recommended'
  ],
  plugins: [
    // 'prettier'
    'vue'
  ],
  // add your custom rules here
  rules: { 
    'nuxt/no-cjs-in-config': 'off'
  }
}

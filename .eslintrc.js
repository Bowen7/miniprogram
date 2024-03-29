module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    Vue: 'readonly',
    wx: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ['vue'],
  rules: {}
}

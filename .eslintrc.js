module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier-vue/recommended",
    "prettier",
  ],
  rules: {
    "prettier-vue/prettier": "off",
    "vue/script-setup-uses-vars": "off",
  },
};

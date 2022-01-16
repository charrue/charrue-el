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
    "vue/no-v-model-argument": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      parser: "babel-eslint",
    },
    {
      files: ["*.ts"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint/eslint-plugin"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
      }
    },
  ],
};

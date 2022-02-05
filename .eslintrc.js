module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    "@charrue/base",
    "@charrue/vue2",
    "prettier",
  ],
  rules: {
    "no-console": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
    "prettier-vue/prettier": "off",
    "vue/script-setup-uses-vars": "off",
    "vue/no-v-model-argument": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      parser: "@babel/eslint-parser",
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

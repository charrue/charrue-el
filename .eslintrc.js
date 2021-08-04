module.exports = {
  root: true,
  parser: "vue-eslint-parser",
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
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "eol-last": "error",
    "no-trailing-spaces": "error",
    "comma-style": ["error", "last"],
    "comma-dangle": ["error", "always-multiline"],
    "no-multi-spaces": "error",
    camelcase: ["error", { properties: "never" }],
    indent: ["error", 2, { SwitchCase: 1 }],
    "object-curly-spacing": ["error", "always"],
    "arrow-parens": ["error", "as-needed"],
    "prettier-vue/prettier": "off",
    "vue/script-setup-uses-vars": "off",
  },
};

module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier-vue/recommended",
    "prettier",
  ],
  rules: {
    // js/ts
    "eol-last": "error",
    "no-trailing-spaces": "error",
    "comma-style": ["error", "last"],
    "comma-dangle": ["error", "always-multiline"],
    "no-multi-spaces": "error",
    camelcase: ["error", { properties: "never" }],
    indent: ["error", 2, { SwitchCase: 1 }],
    "object-curly-spacing": ["error", "always"],
    "arrow-parens": ["error", "as-needed"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "none",
          requireLast: false,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
      },
    ],
    "prettier-vue/prettier": "off",
  },
};

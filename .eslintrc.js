module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  extends: "@react-native-community",
  plugins: ["import"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    quotes: ["error", "double"],
    semi: ["off"],
    "jsx-quotes": ["error", "prefer-double"],
    "no-restricted-imports": [2, { patterns: ["..", "../*"] }],
    "import/no-unresolved": [2],
    "import/no-duplicates": ["error"],
    "import/newline-after-import": ["error"],
    "import/no-cycle": [2],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
      },
    ],
    "react/jsx-filename-extension": [2, { extensions: [".tsx"] }],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true,
        },
      },
      {
        selector: "enumMember",
        format: ["PascalCase"],
      },
    ],
    "@typescript-eslint/explicit-member-accessibility": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars-experimental": "error",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": "allow-with-description",
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads `tsconfig.json` to eslint. Necessary for `eslint-plugin-import`
    },
  },
  globals: {
    JSX: "readonly",
  },
  env: {
    browser: true, // Blob
  },
}

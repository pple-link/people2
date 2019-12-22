module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-plugin-prettier"],
  extends: [
    // Airbnb style guide 적용
    "airbnb-base",
    // TypeScript ESLint recommanded style 적용
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:prettier/recommended",
    "eslint-plugin-prettier"
  ],
  rules: {
    "prettier:prettier": [
      "error",
      {
        endOfLine: "lf",
        semi: true,
        tabWidth: 2,
        trailingComma: "all",
        printWidth: 80,
        arrowParens: "always",
        parser: "babel",
        bracketSpacing: true,
        jsxBracketSameLine: true,
        jsxSingleQuote: true,
        useTabs: false,
        htmlWhitespaceSensitivity: "strict"
      }
    ]
  }
};

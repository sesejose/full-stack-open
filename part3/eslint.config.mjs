import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin";

export default [
  js.configs.recommended,
  {
    ignores: ["frontend/dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.js"],
    ignores: ["frontend/**"], // don't lint frontend here
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "windows"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "never"],
      eqeqeq: "off", // allow == and !=
      "no-trailing-spaces": "error", // prevent unnecessary trailing spaces at the ends of lines,
      "object-curly-spacing": ["error", "always"], // require that there is always a space before and after curly braces
      "arrow-spacing": "off", // Allowing flexibility in arrow function spacing can help accommodate different coding styles and improve readability based on team preferences.
      // "arrow-spacing": ["error", { before: true, after: true }], // demand a consistent use of whitespaces in the function parameters of arrow functions.
      "no-console": "off", // Disabling the no-console rule will allow us to use console.log statements without ESLint flagging them as issues. This can be particularly useful during development when you need to debug your code.
    },
  },
];

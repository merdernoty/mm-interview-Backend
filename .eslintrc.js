const globals = require("globals"); // Подключаем необходимые модули
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  globals: globals.browser, // Подключение глобальных переменных (если нужно)
  rules: {
    // Настройки TypeScript-специфических правил
    "@typescript-eslint/no-unused-vars": "warn", // Предупреждение при неиспользованных переменных
    "@typescript-eslint/explicit-function-return-type": "warn", // Требование явного указания типа возвращаемого значения функций
    "@typescript-eslint/no-explicit-any": "warn", // Предупреждение при использовании типа 'any'

    // Общие правила ESLint
    eqeqeq: "error", // Требование использования строгого равенства (=== и !==)
    curly: "error", // Требование использования блочных скобок для всех управляющих конструкций
    quotes: ["warn", "double"], // Предупреждение при использовании одинарных кавычек
    "max-len": ["error", { code: 120 }], // Ограничение длины строки до 100 символов

    // Дополнительные правила
    semi: ["error", "always"], // Требование использования точек с запятой
  },
  extends: [
    "eslint:recommended", // Базовый набор правил ESLint
    "plugin:@typescript-eslint/recommended", // Рекомендуемые правила от @typescript-eslint
    "plugin:prettier/recommended", // Интеграция с Prettier
  ],
};

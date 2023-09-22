/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
    root:true,
    env: {
        es6: true,
        node: true
    },
    extends: [
        "next",
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "prettier"
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "node",
        "@typescript-eslint",
        "import",
    ],
    rules: {
        quotes: ["error", "backtick"],
        "jsx-quotes": ["error", "prefer-single"],
        "array-element-newline": ["error",
            {
                "multiline":true,
                "minItems": 3
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
}

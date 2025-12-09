import { Linter } from "eslint"
import globals from "globals"
import path from "node:path"
import { parser } from "typescript-eslint"
import { sharedFiles } from "./shared"

export const languageOptions: Linter.Config = {
  files: sharedFiles,
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.es2015,
    },
    parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 10,
      project: "./tsconfig.json",
      sourceType: "module",
      tsconfigRootDir: path.resolve(__dirname, ".."),
    },
  },
  name: "eslint/language-options",
}

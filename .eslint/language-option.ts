import type { TSESLint } from "@typescript-eslint/utils"
import { Linter } from "eslint"
import globals from "globals"
import { parser } from "typescript-eslint"
import { sharedFiles } from "./shared"

export const languageOptionFactory = (
  project: TSESLint.ParserOptions["project"] = true,
  config: Linter.Config = {},
): Linter.Config => {
  const { languageOptions = {}, ...rest } = config
  return {
    files: sharedFiles,
    languageOptions: {
      parser,
      ...languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2015,
        ...languageOptions.globals,
      },
      parserOptions: {
        ecmaVersion: 10,
        sourceType: "module",
        ...languageOptions.parserOptions,
        ecmaFeatures: {
          jsx: true,
        },
        project,
      },
    },
    name: "eslint/language-options",
    ...rest,
  }
}

import { readFile } from "fs/promises"
import { MDXRemote } from "next-mdx-remote/rsc"
import { components } from "@/ui/components/mdx"
import { DocumentLayout } from "@/ui/layouts"

export async function InstallManual() {
  const source = await readFile("src/content/install-manual.mdx", "utf-8")

  return (
    <DocumentLayout>
      <MDXRemote components={components} source={source} />
    </DocumentLayout>
  )
}

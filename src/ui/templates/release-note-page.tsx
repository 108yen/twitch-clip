import { components } from "@/ui/components/mdx"
import { DocumentLayout } from "@/ui/layouts"
import { readFile } from "fs/promises"
import { MDXRemote } from "next-mdx-remote/rsc"

export async function ReleaseNote() {
  const source = await readFile("CHANGELOG.md", "utf-8")

  return (
    <DocumentLayout>
      <MDXRemote components={components} source={source} />
    </DocumentLayout>
  )
}

import { readFile } from "fs/promises"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { components } from "@/ui/components/mdx"
import { DocumentLayout } from "@/ui/layouts"
import { AboutFooter } from "../components/layouts"

export async function About() {
  const source = await readFile("src/content/about.mdx", "utf-8")

  return (
    <DocumentLayout>
      <MDXRemote
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        source={source}
      />

      <AboutFooter />
    </DocumentLayout>
  )
}

import type { MDXComponents } from "mdx/types"

import { DiscList, Heading, ListItem } from "@yamada-ui/react"
import { readFile } from "fs/promises"
import { MDXRemote } from "next-mdx-remote/rsc"

const components: MDXComponents = {
  h1: (props) => <Heading as="h1" size="3xl" {...props} />,
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" size="md" {...props} />,
  li: (props) => <ListItem {...props} />,
  ul: (props) => <DiscList {...props} />,
}

async function getChangelog() {
  return await readFile("CHANGELOG.md", "utf-8")
}

export async function ReleaseNote() {
  const source = await getChangelog()

  return <MDXRemote components={components} source={source} />
}

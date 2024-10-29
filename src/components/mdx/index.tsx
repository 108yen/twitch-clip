import {
  Code,
  DiscList,
  Heading,
  ListItem,
  Text,
  Link as UILink,
} from "@yamada-ui/react"
import { MDXComponents } from "mdx/types"
import Link from "next/link"

export const components: MDXComponents = {
  a: (props) => <UILink as={Link} target="_blank" {...props} />,
  code: (props) => <Code {...props} />,
  h1: (props) => <Heading as="h1" mb="6" mt="12" size="3xl" {...props} />,
  h2: (props) => <Heading as="h2" mb="6" mt="12" {...props} />,
  h3: (props) => <Heading as="h3" mb="6" mt="8" size="md" {...props} />,
  li: (props) => <ListItem {...props} />,
  strong: (props) => <Text as="strong" fontWeight="semibold" {...props} />,
  ul: (props) => <DiscList {...props} />,
}

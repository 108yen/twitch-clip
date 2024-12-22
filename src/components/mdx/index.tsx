import { EllipsisVerticalIcon, ShareIcon } from "@yamada-ui/lucide"
import {
  Code,
  DecimalList,
  DiscList,
  Heading,
  ListItem,
  Separator,
  Text,
  Link as UILink,
} from "@yamada-ui/react"
import { MDXComponents } from "mdx/types"
import Link from "next/link"

export const components: MDXComponents = {
  a: (props) => <UILink as={Link} target="_blank" {...props} />,
  code: (props) => <Code {...props} />,
  EllipsisVerticalIcon,
  h1: (props) => (
    <Heading as="h1" mb="6" mt="12" size="3xl" textAlign="center" {...props} />
  ),
  h2: (props) => (
    <Heading
      as="h2"
      borderBottom="solid"
      borderColor="border"
      mb="md"
      mt="12"
      pb="md"
      {...props}
    />
  ),
  h3: (props) => <Heading as="h3" mb="6" mt="8" size="md" {...props} />,
  hr: (props) => <Separator {...props} />,
  li: (props) => <ListItem {...props} />,
  ol: (props) => <DecimalList {...props} />,
  ShareIcon,
  strong: (props) => <Text as="strong" fontWeight="semibold" {...props} />,
  ul: (props) => <DiscList {...props} />,
}

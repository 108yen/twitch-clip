import {
  DiscList,
  Heading,
  ListItem,
  Text,
  Link as UILink,
} from "@yamada-ui/react"
import { MDXComponents } from "mdx/types"
import Link from "next/link"

export const components: MDXComponents = {
  a: (props) => (
    <UILink
      as={Link}
      target="_blank"
      {...props}
      _hover={{ textDecoration: "none" }}
    />
  ),
  code: (props) => (
    <Text
      as="code"
      bg={["gray.50", "gray.800"]}
      color={["gray.800", "gray.50"]}
      fontFamily="mono"
      fontSize="sm"
      lineHeight="6"
      minH="6"
      px="2"
      rounded="md"
      {...props}
    />
  ),
  h1: (props) => <Heading as="h1" mb="6" mt="12" size="3xl" {...props} />,
  h2: (props) => <Heading as="h2" mb="6" mt="12" {...props} />,
  h3: (props) => <Heading as="h3" mb="6" mt="8" size="md" {...props} />,
  li: (props) => <ListItem {...props} />,
  strong: (props) => <Text as="strong" fontWeight="semibold" {...props} />,
  ul: (props) => <DiscList {...props} />,
}

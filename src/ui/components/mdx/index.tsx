import {
  EllipsisVerticalIcon,
  ShareIcon,
  SquarePlusIcon,
} from "@yamada-ui/lucide"
import {
  Code,
  DecimalList,
  DiscList,
  Heading,
  ListItem,
  NativeTable,
  Separator,
  Td,
  Text,
  Th,
} from "@yamada-ui/react"
import { MDXComponents } from "mdx/types"
import { Inquiry } from "../form"
import { Link } from "./link"

const UIComponents = {
  EllipsisVerticalIcon,
  Inquiry,
  ShareIcon,
  SquarePlusIcon,
}

export const components: MDXComponents = {
  ...UIComponents,
  a: (props) => <Link {...props} />,
  code: (props) => <Code {...props} />,
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
  p: (props) => <Text {...props} />,
  strong: (props) => <Text as="strong" fontWeight="semibold" {...props} />,
  table: (props) => <NativeTable my="md" {...props} />,
  td: (props) => <Td {...props} />,
  th: (props) => <Th {...props} />,
  ul: (props) => <DiscList my="md" {...props} />,
}

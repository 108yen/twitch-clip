import { components } from "@/components/mdx"
import { DocumentLayout } from "@/layouts"
import { Center, HStack, Text } from "@yamada-ui/react"
import { readFile } from "fs/promises"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import remarkGfm from "remark-gfm"

export async function About() {
  const source = await readFile("src/content/about.mdx", "utf-8")

  return (
    <DocumentLayout>
      <MDXRemote
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        source={source}
      />

      <Center mt="lg">
        <HStack
          as="p"
          color={["blackAlpha.700", "whiteAlpha.600"]}
          fontSize="xs"
          gap="sm"
        >
          <Text as="span">developer:</Text>

          <Text
            _hover={{ textDecorationLine: "underline" }}
            as={Link}
            href="https://108yen.github.io/profile/"
            target="_blank"
          >
            108yen
          </Text>
        </HStack>
      </Center>
    </DocumentLayout>
  )
}

"use client"

import { Center, HStack, Text } from "@yamada-ui/react"
import Link from "next/link"

export function AboutFooter() {
  return (
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
  )
}

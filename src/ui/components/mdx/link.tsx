"use client"

import { Text } from "@yamada-ui/react"
import NextLink from "next/link"
import { HTMLAttributes } from "react"

interface LinkProps extends HTMLAttributes<HTMLParagraphElement> {}

export function Link(props: LinkProps) {
  return (
    <Text
      _hover={{ textDecorationLine: "underline" }}
      as={NextLink}
      target="_blank"
      {...props}
    />
  )
}

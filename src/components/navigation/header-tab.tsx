"use client"
import { dataAttr, HStack, Text } from "@yamada-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CONSTANT } from "@/constant"

export function HeaderTab() {
  const pathname = usePathname()

  const currentPath = pathname.split("/")[1]

  return (
    <HStack as="nav" gap="lg">
      {CONSTANT.PATHS.map(({ href, title }) => (
        <Text
          key={title}
          as={Link}
          prefetch={false}
          href={href}
          aria-label={title}
          data-selected={dataAttr(currentPath === title)}
          textStyle="navigation"
        >
          {title}
        </Text>
      ))}
    </HStack>
  )
}

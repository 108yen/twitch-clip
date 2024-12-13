"use client"

import { HexagonOutlined } from "@/components/media-and-icons"
import { HeaderMenu } from "@/components/navigation"
import { CONSTANT } from "@/constant"
import { useScrollY } from "@/hooks"
import {
  Center,
  CenterProps,
  dataAttr,
  Heading,
  HStack,
  mergeRefs,
  Separator,
  Spacer,
  Text,
  TextProps,
  Tooltip,
} from "@yamada-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef } from "react"

export type HeaderProps = CenterProps

export function Header({ ref, ...rest }: HeaderProps) {
  const headerRef = useRef<HTMLHeadingElement>(null)
  const y = useScrollY()
  const pathname = usePathname()

  const { height = 0 } = headerRef.current?.getBoundingClientRect() ?? {}
  const isScroll = y > height

  return (
    <Center
      as="header"
      backdropBlur="20px"
      backdropFilter="auto"
      backdropSaturate="180%"
      bg={isScroll ? ["whiteAlpha.700", "blackAlpha.400"] : undefined}
      left="0"
      position="sticky"
      ref={mergeRefs(ref, headerRef)}
      right="0"
      shadow={isScroll ? ["base", "dark-sm"] : undefined}
      top="0"
      transitionDuration="slower"
      transitionProperty="common"
      w="full"
      zIndex="guldo"
      {...rest}
    >
      <HStack
        gap={0}
        px={{ base: "lg", lg: "md" }}
        py={{ base: "3", sm: "2" }}
        w="full"
      >
        <HStack
          aria-label="Twitch clip ranking"
          as={Link}
          gap="sm"
          href="/"
          textDecoration="none"
        >
          <HexagonOutlined
            color="primary"
            display={{ base: "flex", md: "none" }}
          />
          <Heading as="h1" fontSize="2xl" fontWeight="medium" isTruncated>
            Twitch clip ranking
          </Heading>
        </HStack>

        <Separator
          borderColor={["blackAlpha.300", "whiteAlpha.300"]}
          display={{ base: "flex", md: "none" }}
          h="7xs"
          marginX="lg"
          orientation="vertical"
        />

        <HStack as="nav" display={{ base: "flex", md: "none" }} gap="lg">
          {CONSTANT.PATHS.map(({ href, title, tooltip }) => {
            //NOTE: declare as `any` type because `error TS2590: Expression produces a union type that is too complex to represent.` occurred.
            const tooltipProps: any = {
              label: tooltip,
            }

            const textProps: TextProps = {
              "aria-label": `Link to ${title} page`,
              as: Link,
              "data-selected": dataAttr(pathname === href),
              href: href,
              isTruncated: true,
              textStyle: "navigation",
            }

            return (
              <Tooltip key={title} {...tooltipProps}>
                <Text {...textProps}>{title}</Text>
              </Tooltip>
            )
          })}
        </HStack>

        <Spacer
          onClick={() =>
            window?.scrollTo({
              behavior: "smooth",
              top: 0,
            })
          }
        />

        <HeaderMenu />
      </HStack>
    </Center>
  )
}

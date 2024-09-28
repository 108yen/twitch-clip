"use client"

import {
  Center,
  CenterProps,
  Divider,
  forwardRef,
  Heading,
  HStack,
  mergeRefs,
} from "@yamada-ui/react"
import Link from "next/link"
import { memo, useRef } from "react"
import { HexagonOutlined } from "@/components/media-and-icons"
import { useScrollY } from "@/hooks"

export type HeaderProps = CenterProps

export const Header = memo(
  forwardRef<HeaderProps, "div">(({ ...rest }, ref) => {
    const headerRef = useRef<HTMLHeadingElement>()
    const y = useScrollY()
    const { height = 0 } = headerRef.current?.getBoundingClientRect() ?? {}

    const isScroll = y > height

    return (
      <Center
        ref={mergeRefs(ref, headerRef)}
        as="header"
        w="full"
        bg={isScroll ? ["whiteAlpha.500", "blackAlpha.200"] : undefined}
        backdropFilter="auto"
        backdropSaturate="180%"
        backdropBlur="10px"
        shadow={isScroll ? ["base", "dark-sm"] : undefined}
        transitionProperty="common"
        transitionDuration="slower"
        position="sticky"
        top="0"
        left="0"
        right="0"
        zIndex="guldo"
        {...rest}
      >
        <HStack w="full" maxW="9xl" py="3" px={{ base: "lg", md: "md" }}>
          <HStack
            as={Link}
            href="/"
            aria-label="Twitch clip ranking"
            textDecoration="none"
            gap="sm"
          >
            <HexagonOutlined />
            <Heading as="h1" fontSize="2xl" fontWeight="normal">
              Twitch clip ranking
            </Heading>
          </HStack>
          <Divider orientation="vertical" />
        </HStack>
      </Center>
    )
  }),
)

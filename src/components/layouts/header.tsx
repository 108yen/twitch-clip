"use client"

import { HexagonOutlined } from "@/components/media-and-icons"
import { HeaderMenu } from "@/components/navigation"
import { CONSTANT } from "@/constant"
import { useScrollY } from "@/hooks"
import {
  Center,
  CenterProps,
  dataAttr,
  Divider,
  forwardRef,
  Heading,
  HStack,
  mergeRefs,
  Spacer,
  Text,
  Tooltip,
} from "@yamada-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo, useRef } from "react"

export type HeaderProps = CenterProps

export const Header = memo(
  forwardRef<HeaderProps, "div">(({ ...rest }, ref) => {
    const headerRef = useRef<HTMLHeadingElement>()
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
          gap="lg"
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
              color="secondary"
              display={{ base: "flex", md: "none" }}
            />
            <Heading as="h1" fontSize="2xl" fontWeight="medium" isTruncated>
              Twitch clip ranking
            </Heading>
          </HStack>

          <Divider
            borderColor={["blackAlpha.300", "whiteAlpha.300"]}
            display={{ base: "flex", md: "none" }}
            h="7xs"
            orientation="vertical"
          />

          <HStack as="nav" display={{ base: "flex", md: "none" }} gap="lg">
            {CONSTANT.PATHS.map(({ href, title, tooltip }) => (
              <Tooltip key={title} label={tooltip}>
                <Text
                  aria-label={title}
                  as={Link}
                  data-selected={dataAttr(pathname === href)}
                  href={href}
                  isTruncated
                  prefetch={false}
                  textStyle="navigation"
                >
                  {title}
                </Text>
              </Tooltip>
            ))}
          </HStack>

          <Spacer
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: 0,
              })
            }
          />

          <HeaderMenu />
        </HStack>
      </Center>
    )
  }),
)

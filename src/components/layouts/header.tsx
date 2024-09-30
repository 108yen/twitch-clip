"use client"

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
import { HexagonOutlined } from "@/components/media-and-icons"
import { HeaderMenu } from "@/components/navigation"
import { CONSTANT } from "@/constant"
import { useScrollY } from "@/hooks"

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
        ref={mergeRefs(ref, headerRef)}
        as="header"
        w="full"
        bg={isScroll ? ["whiteAlpha.700", "blackAlpha.400"] : undefined}
        backdropFilter="auto"
        backdropSaturate="180%"
        backdropBlur="20px"
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
        <HStack
          w="full"
          py={{ base: "3", sm: "2" }}
          px={{ base: "lg", lg: "md" }}
          gap="lg"
        >
          <HStack
            as={Link}
            href="/"
            aria-label="Twitch clip ranking"
            textDecoration="none"
            gap="sm"
          >
            <HexagonOutlined
              color="secondary"
              display={{ base: "flex", sm: "none" }}
            />
            <Heading as="h1" fontSize="2xl" fontWeight="normal" isTruncated>
              Twitch clip ranking
            </Heading>
          </HStack>

          <Divider
            h="7xs"
            display={{ base: "flex", sm: "none" }}
            orientation="vertical"
            borderColor={["blackAlpha.300", "whiteAlpha.300"]}
          />

          <HStack as="nav" display={{ base: "flex", sm: "none" }} gap="lg">
            {CONSTANT.PATHS.map(({ href, title, tooltip }) => (
              <Tooltip key={title} label={tooltip}>
                <Text
                  as={Link}
                  prefetch={false}
                  href={href}
                  aria-label={title}
                  data-selected={dataAttr(pathname === href)}
                  textStyle="navigation"
                  isTruncated
                >
                  {title}
                </Text>
              </Tooltip>
            ))}
          </HStack>

          <Spacer
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          />

          <HeaderMenu />
        </HStack>
      </Center>
    )
  }),
)

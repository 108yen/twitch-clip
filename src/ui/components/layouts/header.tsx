"use client"

import {
  Center,
  CenterProps,
  dataAttr,
  Heading,
  HStack,
  Separator,
  Spacer,
  Text,
  Tooltip,
} from "@yamada-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CONSTANT } from "@/constant"
import { useSubscribeEvent } from "@/hooks"
import { HexagonOutlined } from "../media-and-icons"
import { HeaderMenu } from "../navigation"

export interface HeaderProps extends CenterProps {}

export function Header(props: HeaderProps) {
  const pathname = usePathname()
  const isScroll = useSubscribeEvent<boolean>(
    "scroll",
    () => window.scrollY > 0,
    () => false,
  )

  return (
    <Center
      as="header"
      backdropBlur="20px"
      backdropFilter="auto"
      backdropSaturate="180%"
      bg={isScroll ? ["whiteAlpha.700", "blackAlpha.400"] : undefined}
      left="0"
      position="sticky"
      right="0"
      shadow={isScroll ? ["base", "dark-sm"] : undefined}
      top="0"
      transitionDuration="slower"
      transitionProperty="common"
      w="full"
      zIndex="guldo"
      {...props}
    >
      <HStack
        gap={0}
        px={{ base: "lg", lg: "md", sm: "xs" }}
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
          <HexagonOutlined color="primary" />

          <Heading as="h1" fontSize="2xl" fontWeight="medium" isTruncated>
            Twitch clip ranking
          </Heading>
        </HStack>

        <Separator
          borderColor={["blackAlpha.300", "whiteAlpha.300"]}
          display={{ base: "flex", md: "none" }}
          h="7xs"
          marginLeft="lg"
          marginRight="md"
          orientation="vertical"
        />

        <HStack
          as="nav"
          display={{ base: "flex", md: "none" }}
          gap={0}
          layerStyle="navigation"
        >
          {CONSTANT.PATHS.map(({ href, title, tooltip }) => (
            <Tooltip key={title} label={tooltip}>
              <Text
                aria-label={`Link to ${title} page`}
                as={Link}
                data-selected={dataAttr(pathname === href)}
                href={href}
                isTruncated
                layerStyle="navigationItem"
                px="md"
                py="xs"
                textStyle="navigation"
              >
                {title}
              </Text>
            </Tooltip>
          ))}
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

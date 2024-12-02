import { Inquiry } from "@/components/form"
import { X } from "@/components/media-and-icons"
import { DocumentLayout } from "@/layouts"
import {
  Center,
  DecimalList,
  Heading,
  HStack,
  List,
  ListItem,
  NativeTable,
  Separator,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"

export function About() {
  return (
    <DocumentLayout>
      <VStack gap="2xl">
        <Heading as="h1" size="3xl" textAlign="center">
          このサイトについて
        </Heading>

        <VStack>
          <Heading as="h2">1. はじめに</Heading>

          <Separator />

          <Text>
            当サイトは日本語配信者のTwitchのクリップをランキング形式でまとめた非公式サイトです。各ランキング100件までクリップがリストされます。より多くのクリップを視聴したい場合やチャンネルの分析をしたい場合は以下のサイトを利用ください。
          </Text>

          <List pl="md">
            <ListItem>
              <Text
                _hover={{ textDecorationLine: "underline" }}
                aria-label="streams charts link"
                as={Link}
                href="https://streamscharts.com/"
              >
                STREAMS CHARTS
              </Text>
            </ListItem>
            <ListItem>
              <Text
                _hover={{ textDecorationLine: "underline" }}
                aria-label="twitch tracker link"
                as={Link}
                href="https://twitchtracker.com/"
              >
                Twitch Tracker
              </Text>
            </ListItem>
            <ListItem>
              <Text
                _hover={{ textDecorationLine: "underline" }}
                aria-label="twitch stats link"
                as={Link}
                href="https://twitchstats.net/twitch-clip-search"
              >
                Twitch Stats and analysis
              </Text>
            </ListItem>
          </List>
        </VStack>

        <VStack>
          <Heading as="h2">2. ランキングについて</Heading>

          <Separator />

          <Text>
            本サイトに掲載されるランキングは、すべてのストリーマーのランキングではなく、登録されたストリーマーのランキングです。各ランキングにつき、100件表示可能です。
          </Text>
        </VStack>

        <VStack>
          <Heading as="h2">3. コンテンツの更新頻度</Heading>

          <Separator />

          <Text>
            当サイトのコンテンツは、定期的に更新されます。更新頻度については、事前の予告なく変更される場合があります。具体的な更新頻度は以下を参照してください。
            表示の更新は20分程度ずれる可能性があります。
          </Text>

          <TableContainer>
            <NativeTable>
              <Thead>
                <Tr>
                  <Th>ランキング</Th>
                  <Th>更新時間 </Th>
                </Tr>
              </Thead>

              <Tbody>
                <Tr>
                  <Td>dayランキング</Td>
                  <Td align="right">3時間毎</Td>
                </Tr>
                <Tr>
                  <Td>week,month,yearランキング</Td>
                  <Td align="right">毎日0時</Td>
                </Tr>
                <Tr>
                  <Td>allランキング</Td>
                  <Td align="right">毎月1日</Td>
                </Tr>
                <Tr>
                  <Td>日別ランキング</Td>
                  <Td align="right">毎日0時</Td>
                </Tr>
                <Tr>
                  <Td>年別ランキング</Td>
                  <Td align="right">毎月1日</Td>
                </Tr>
              </Tbody>
            </NativeTable>
          </TableContainer>
        </VStack>

        <VStack>
          <Heading as="h2">4. 禁止事項</Heading>

          <Separator />

          <Text>当サイトの利用に際して、以下の行為は禁止とします。</Text>

          <DecimalList>
            <ListItem>
              <Text>違法行為、またはそのおそれのある行為</Text>
            </ListItem>
            <ListItem>
              <Text>公序良俗に反する行為、またはそのおそれのある行為</Text>
            </ListItem>
            <ListItem>
              <Text>
                当サイトの運営を妨げる行為、またはそのおそれのある行為
              </Text>
            </ListItem>
            <ListItem>
              <Text>当サイトに対する攻撃、またはそのおそれのある行為</Text>
            </ListItem>
            <ListItem>
              <Text>
                当サイトのコンテンツをプログラム等を用いて機械的に取得する行為
                (Webスクレイピング行為等)
              </Text>
            </ListItem>
          </DecimalList>
        </VStack>

        <VStack>
          <Heading as="h2">5. Google Analytics</Heading>

          <Separator />

          <Text>
            サイトの利用状況を把握するために、Google
            Analyticsを使用しています。GoogleによるCookieの利用方法やオプトアウトの方法は、下記のリンクから確認できます。
          </Text>

          <List pl="md">
            <ListItem>
              <Text
                _hover={{ textDecorationLine: "underline" }}
                aria-label="google link"
                as={Link}
                href="https://policies.google.com/technologies/cookies?hl=ja"
                target="_blank"
              >
                GoogleによるCookieの利用方法
              </Text>
            </ListItem>
            <ListItem>
              <Text
                _hover={{ textDecorationLine: "underline" }}
                aria-label="google optout link"
                as={Link}
                href="https://support.google.com/analytics/answer/181881?hl=ja"
                target="_blank"
              >
                Google Analyticsのオプトアウト
              </Text>
            </ListItem>
          </List>
        </VStack>

        <VStack>
          <Heading as="h2">6. Google AdSense</Heading>

          <Separator />

          <Text>
            当サイトでは、広告提供の一環としてGoogle
            AdSenseを使用しています。広告はパーソナライズされることがあり、お使いの興味や訪問履歴に基づいて表示されます。
            <Text
              _hover={{ textDecorationLine: "underline" }}
              aria-label="myadcenter link"
              as={Link}
              display="inline"
              href="https://myadcenter.google.com/home?sasb=true&ref=ad-settings"
              target="_blank"
            >
              広告の設定
            </Text>
            からパーソナライズ広告を無効にすることができます。
          </Text>
        </VStack>

        <VStack>
          <Heading as="h2">7. お問い合わせ</Heading>

          <Separator />

          <Inquiry />
        </VStack>

        <Center mt="lg">
          <HStack color={["blackAlpha.700", "whiteAlpha.600"]} fontSize="xs">
            <Text>developer:</Text>

            <HStack
              _hover={{ textDecorationLine: "underline" }}
              alignItems="center"
              aria-label="x link"
              as={Link}
              gap={0}
              href="https://twitter.com/108yen___"
              target="_blank"
            >
              <X fontSize="sm" />
              <Text>108yen</Text>
            </HStack>
          </HStack>
        </Center>
      </VStack>
    </DocumentLayout>
  )
}

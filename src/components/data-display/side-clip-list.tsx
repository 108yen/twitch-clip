"use client"
import { InlineAD } from "@/components/adsense"
import { event } from "@/components/googleAnalytics"
import { useClip } from "@/contexts"
import { Clip } from "@/models/clip"
import { getTabs } from "@/utils/clip"
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  HStack,
  InfiniteScrollArea,
  Loading,
  NativeImage,
  Select,
  SelectItem,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import { useMemo, useState } from "react"

const START_INDEX = 6
const LOAD_INDEX = 2

type ClipCardProps = {
  clip: Clip
  setClickedClipUrl: (clip: Clip) => void
  tab: string
}

function ClipCard({ clip, setClickedClipUrl, tab }: ClipCardProps) {
  const {
    broadcaster_id,
    broadcaster_name,
    profile_image_url = "",
    thumbnail_url = "",
    title,
    url,
    view_count,
  } = clip

  return (
    <Box>
      <Tooltip closeDelay={500} label={title} openDelay={500}>
        <VStack gap="1" w="full">
          <Container
            apply="layoutStyles.borderCard"
            onClick={() => {
              setClickedClipUrl(clip)
              event("click", {
                clip_title: title,
                label: "click_clip_title",
                link_url: url,
                ranking_period: tab,
              })
            }}
            p={0}
          >
            <AspectRatio minW={{ base: "sm", sm: "48" }} ratio={16 / 9}>
              <NativeImage alt={title} loading="lazy" src={thumbnail_url} />
            </AspectRatio>
          </Container>

          <HStack>
            <Avatar
              alt="top"
              as={Link}
              href={`/streamer/${broadcaster_id}`}
              prefetch={false}
              src={profile_image_url}
            />

            <VStack w="full">
              <Button
                onClick={() => {
                  setClickedClipUrl(clip)
                  event("click", {
                    clip_title: title,
                    label: "click_clip_title",
                    link_url: url,
                    ranking_period: tab,
                  })
                }}
              >
                {title}
              </Button>

              <HStack>
                <Text
                  aria-label={broadcaster_name}
                  as={Link}
                  href={`/streamer/${broadcaster_id}`}
                  prefetch={false}
                >
                  {broadcaster_name}
                </Text>

                <Spacer />

                <Text
                  aria-describedby="Clip view count"
                  textAlign="end"
                  textStyle="viewCount"
                >
                  {`${view_count} views`}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </Tooltip>
    </Box>
  )
}

type ClipListProps = {
  clips: Clip[]
  setClickedClipUrl: (clip: Clip) => void
  tab: string
}

function ClipList({ clips, setClickedClipUrl, tab }: ClipListProps) {
  const [count, setCount] = useState<number>(START_INDEX)

  const filteredClips = useMemo(
    () =>
      clips.slice(0, count).map((clip, index) =>
        index == 10 ? (
          <Box key={index}>
            <InlineAD display={{ base: "none", lg: "flex" }} />
            <ClipCard
              clip={clip}
              setClickedClipUrl={setClickedClipUrl}
              tab={tab}
            />
          </Box>
        ) : (
          <ClipCard
            clip={clip}
            key={index}
            setClickedClipUrl={setClickedClipUrl}
            tab={tab}
          />
        ),
      ),
    [clips, count, setClickedClipUrl, tab],
  )

  return (
    <InfiniteScrollArea
      finish={<Text>no more clips</Text>}
      gap={{ base: "md", sm: "sm" }}
      loading={<Loading fontSize="2xl" />}
      marginY="md"
      onLoad={({ finish, index }) => {
        setCount((prev) => prev + LOAD_INDEX)

        if (index * LOAD_INDEX + 6 >= 100) {
          finish()
        }
      }}
    >
      {filteredClips}
    </InfiniteScrollArea>
  )
}

export function SideClipTabs() {
  const { clipDoc, setClipUrl } = useClip()

  const tabs = useMemo(() => getTabs(clipDoc), [clipDoc])

  const [tab, onChange] = useState<string>(tabs[0])

  const items: SelectItem[] = useMemo(
    () => tabs.map((tab) => ({ label: tab, value: tab })),
    [tabs],
  )

  const clips = clipDoc?.[tab] as Clip[]

  return (
    <VStack divider={<Divider />} gap={0}>
      <HStack>
        <Tooltip label="リスト表示にもどる">
          <Button>clips</Button>
        </Tooltip>

        <Spacer />

        <Select items={items} onChange={onChange} value={tab} />
      </HStack>

      <ClipList clips={clips} setClickedClipUrl={setClipUrl} tab={tab} />
    </VStack>
  )
}

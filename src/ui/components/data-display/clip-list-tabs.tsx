"use client"
import { Carousel, CarouselSlide } from "@yamada-ui/carousel"
import {
  SquareArrowOutUpRightIcon,
  StarIcon,
  TwitchIcon,
} from "@yamada-ui/lucide"
import {
  AspectRatio,
  assignRef,
  Box,
  Container,
  dataAttr,
  Drawer,
  DrawerBody,
  EmptyState,
  Heading,
  HStack,
  IconButton,
  Image,
  InfiniteScrollArea,
  isArray,
  List,
  ListIcon,
  ListItem,
  Loading,
  Spacer,
  Tab,
  TabList,
  Tabs,
  TabsProps,
  Text,
  useBreakpoint,
  useDisclosure,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import { RefObject, useMemo, useRef, useState } from "react"
import { CLIP_LIST } from "@/constant/clip-list"
import { useClip } from "@/contexts"
import { useLongPress, useToggleFavorite } from "@/hooks"
import { Clip } from "@/models/clip"
import { getTabs } from "@/utils/clip"
import { sendGAEvent } from "@/utils/google-analytics"
import { formatDate, toISO8601Duration } from "@/utils/string"
import { InlineAD } from "../adsense"
import { HexagonOutlined, SkeletonAvatar, X } from "../media-and-icons"
import { TeamTag } from "./team-tag"

interface ControlClipDrawerProps {
  clip: Clip
  onClose: () => void
  open: boolean
}

function ControlClipDrawer({ clip, onClose, open }: ControlClipDrawerProps) {
  const { broadcaster_id, broadcaster_name, url } = clip

  const { favorite, pending, toggle } = useToggleFavorite(clip)

  return (
    <Drawer closeOnDrag onClose={onClose} open={open} placement="bottom">
      <DrawerBody>
        <List>
          <ListItem
            as={Link}
            href={url ?? ""}
            py="sm"
            style={{
              textDecoration: "none",
            }}
            tabIndex={-1}
            target="_blank"
          >
            <ListIcon as={TwitchIcon} />
            Twitchで見る
          </ListItem>
          <ListItem
            as={Link}
            href={`/streamer/${broadcaster_id}`}
            py="sm"
            style={{
              textDecoration: "none",
            }}
            tabIndex={-1}
            target="_blank"
          >
            <ListIcon as={HexagonOutlined} />
            {broadcaster_name}のクリップを見る
          </ListItem>
          <ListItem
            as="button"
            data-selected={dataAttr(favorite)}
            disabled={pending}
            onClick={toggle}
            py="sm"
          >
            <ListIcon
              _selected={{ fill: "primary.500" }}
              as={StarIcon}
              color="primary.500"
              data-selected={dataAttr(favorite)}
            />
            お気に入りに登録する
          </ListItem>
          <ListItem
            as={Link}
            href={`/streamer/${broadcaster_id}`}
            py="sm"
            style={{
              textDecoration: "none",
            }}
            tabIndex={-1}
            target="_blank"
          >
            <ListIcon as={X} />
            共有する
          </ListItem>
        </List>
      </DrawerBody>
    </Drawer>
  )
}

interface ClipCardProps {
  clip: Clip
  tab: string
}

function ClipCard({ clip, tab }: ClipCardProps) {
  const { setClipUrl } = useClip()
  const { onClose, onOpen, open } = useDisclosure()
  const { onTouchEnd, onTouchStart } = useLongPress(onOpen, {
    onFinish: (ev) => ev.preventDefault(),
  })

  const {
    broadcaster_id,
    broadcaster_name,
    created_at: _created_at = "",
    creator_name,
    duration = 0,
    embed_url,
    id,
    profile_image_url,
    teams,
    thumbnail_url,
    title,
    url,
    view_count: _view_count,
  } = clip

  const created_at = formatDate(_created_at)
  const view_count = `${_view_count?.toLocaleString()} views`

  return (
    <>
      <Container
        cursor="pointer"
        itemID={id}
        itemScope
        itemType="https://schema.org/VideoObject"
        layerStyle="borderCard"
        onClick={() => {
          setClipUrl(clip)
          sendGAEvent("event", "click", {
            clip_title: title,
            label: "click_clip_title",
            ranking_period: tab,
          })
        }}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchEnd}
        onTouchStart={onTouchStart}
        p={0}
      >
        <HStack gap={0} overflow="hidden">
          <AspectRatio minW={{ base: "sm", sm: "48" }} ratio={16 / 9}>
            <Image
              alt={title}
              itemProp="thumbnail"
              loading="lazy"
              src={thumbnail_url}
            />
          </AspectRatio>

          <VStack
            gap={0}
            marginX={{ base: "sm", sm: "xs" }}
            overflow="hidden"
            w="full"
          >
            <HStack aria-label={title} gap={0}>
              <Heading
                fontSize={{ base: "xl", sm: "lg" }}
                itemProp="name"
                lineClamp={1}
                overflowWrap="anywhere"
                variant="h5"
              >
                {title}
              </Heading>

              <Spacer />

              <IconButton
                as={Link}
                display={{ base: "flex", sm: "none" }}
                href={url ?? ""}
                icon={<SquareArrowOutUpRightIcon />}
                itemProp="url"
                style={{
                  textDecoration: "none",
                }}
                target="_blank"
                variant="primary"
              />
            </HStack>

            <HStack>
              <HStack
                aria-label={broadcaster_name}
                as={Link}
                gap="sm"
                href={`/streamer/${broadcaster_id}`}
                itemProp="actor"
                itemScope
                itemType="https://schema.org/Person"
                onClick={(ev) => {
                  ev.stopPropagation()
                }}
                w="fit-content"
              >
                <SkeletonAvatar
                  alt={broadcaster_name}
                  itemProp="image"
                  size={{ base: "base", sm: "sm" }}
                  src={profile_image_url}
                />

                <Text itemProp="name" lineClamp={1} overflowWrap="anywhere">
                  {broadcaster_name}
                </Text>
              </HStack>

              <TeamTag
                display={{ base: "flex", sm: "none" }}
                onClick={(ev) => {
                  ev.stopPropagation()
                }}
                teams={teams}
              />
            </HStack>

            <Text
              aria-label="Clip creator name"
              display={{ base: "flex", sm: "none" }}
              textAlign="start"
            >
              created_by : {creator_name}
            </Text>

            <Text
              aria-label="Clip created date"
              display={{ base: "flex", sm: "none" }}
              textAlign="start"
            >
              <meta content={_created_at} itemProp="uploadDate" />
              created_at : {created_at}
            </Text>

            <Text
              aria-label="Clip view count"
              itemProp="interactionStatistic"
              itemScope
              itemType="https://schema.org/InteractionCounter"
              textAlign="end"
              textStyle="viewCount"
            >
              <meta
                content="https://schema.org/WatchAction"
                itemProp="interactionType"
              />
              <meta
                content={_view_count?.toString()}
                itemProp="userInteractionCount"
              />

              {view_count}
            </Text>
          </VStack>
        </HStack>

        <meta content={title} itemProp="description" />
        <meta content={thumbnail_url} itemProp="thumbnailUrl" />
        <meta content={embed_url} itemProp="embedUrl" />
        <meta content={toISO8601Duration(duration)} itemProp="duration" />
      </Container>

      <ControlClipDrawer clip={clip} onClose={onClose} open={open} />
    </>
  )
}

interface ClipListProps {
  clips: Clip[]
  index: number
  resetRef: RefObject<() => void>
  tab: string
}

function ClipList({
  clips,
  index: tabIndex,
  resetRef: resetRefProp,
  tab,
}: ClipListProps) {
  const [count, setCount] = useState<number>(CLIP_LIST.START_INDEX)
  const breakpoint = useBreakpoint()
  const resetRef = useRef<() => void>(() => {})

  const isFirstTab = tabIndex == 0

  function resetCount() {
    if (window) window.scrollTo({ top: 0 })

    resetRef.current()
    setCount(CLIP_LIST.START_INDEX)
  }

  assignRef(resetRefProp, resetCount)

  const filteredClips = useMemo(
    () =>
      clips.slice(0, count).map((clip, index) => {
        const isDisplayIndex =
          (isFirstTab && index == 3) ||
          (isFirstTab && index == clips.length - 1 && clips.length <= 3) ||
          (!isFirstTab && index == CLIP_LIST.START_INDEX)

        if (isDisplayIndex && breakpoint == "sm") {
          return (
            <Box key={index}>
              <ClipCard clip={clip} tab={tab} />
              <InlineAD />
            </Box>
          )
        } else {
          return <ClipCard clip={clip} key={index} tab={tab} />
        }
      }),
    [breakpoint, clips, count, isFirstTab, tab],
  )

  return (
    <InfiniteScrollArea
      finish={<EmptyState title="No more clips" />}
      gap={{ base: "md", sm: "sm" }}
      loading={<Loading fontSize="2xl" />}
      marginY="md"
      onLoad={({ finish, index }) => {
        setCount((prev) => prev + CLIP_LIST.LOAD_INDEX)

        if (index * CLIP_LIST.LOAD_INDEX + 6 >= clips.length) {
          finish()
          sendGAEvent("event", "scroll", {
            label: "load_all_clips",
          })
        }
      }}
    >
      {filteredClips}
    </InfiniteScrollArea>
  )
}

interface ClipListTabProps extends TabsProps {
  withTab?: boolean
}

export function ClipListTabs({ withTab = true, ...rest }: ClipListTabProps) {
  const { clipDoc } = useClip()
  const [index, onChange] = useState(0)

  const resetRef = useRef<() => void>(() => {})

  const tabs = useMemo(() => getTabs(clipDoc), [clipDoc])

  function handleChange(value: number) {
    onChange(value)
    resetRef.current()
  }

  if (tabs.length == 0)
    return (
      <EmptyState
        description="No clips were available"
        indicator={<TwitchIcon />}
        size="lg"
        title="No clips"
      />
    )

  return (
    <>
      {withTab ? (
        <Tabs
          align="center"
          defaultIndex={0}
          index={index}
          onChange={handleChange}
          {...rest}
        >
          <TabList>
            {tabs.map((tab) => (
              <Tab
                _selected={{
                  borderColor: "currentColor",
                  borderWidth: "2px",
                  color: "primary.500",
                }}
                fontSize="sm"
                key={tab}
                p={3}
                w="4xs"
              >
                {tab.toUpperCase()}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      ) : null}

      <Carousel
        draggable={false}
        h="full"
        index={index}
        loop={false}
        withControls={false}
        withIndicators={false}
      >
        {tabs.map((tab, index) => {
          const clips = clipDoc?.[tab]

          if (!isArray(clips)) return

          return (
            <CarouselSlide key={tab}>
              <ClipList
                clips={clips}
                index={index}
                key={tab}
                resetRef={resetRef}
                tab={tab}
              />
            </CarouselSlide>
          )
        })}
      </Carousel>
    </>
  )
}

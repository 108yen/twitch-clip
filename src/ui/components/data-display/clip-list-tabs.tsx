"use client"
import { Carousel, CarouselProps, CarouselSlide } from "@yamada-ui/carousel"
import {
  PlayIcon,
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
  Loading,
  Separator,
  Spacer,
  StackProps,
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
import { MouseEvent, RefObject, useMemo, useRef, useState } from "react"
import { CLIP_LIST } from "@/constant/clip-list"
import { useClip } from "@/contexts"
import { useLongPress, useToggleFavorite } from "@/hooks"
import { Clip } from "@/models/clip"
import { Team } from "@/models/streamer"
import { getTabs } from "@/utils/clip"
import { sendGAEvent } from "@/utils/google-analytics"
import { createTwitterUrl, formatDate, toISO8601Duration } from "@/utils/string"
import { InlineAD } from "../adsense"
import { DrawerButton, DrawerButtonProps } from "../form"
import { HexagonOutlined, SkeletonAvatar, X } from "../media-and-icons"
import { TeamTag } from "./team-tag"

interface FavoriteItemProps extends Omit<DrawerButtonProps, "clip"> {
  clip: Clip
}

function FavoriteItem({ clip, ...props }: FavoriteItemProps) {
  const { favorite, pending, toggle } = useToggleFavorite(clip)

  return (
    <DrawerButton
      data-selected={dataAttr(favorite)}
      disabled={pending}
      onClick={toggle}
      startIcon={
        <StarIcon
          _selected={{ fill: "primary.500" }}
          color="primary.500"
          data-selected={dataAttr(favorite)}
        />
      }
      {...props}
    >
      {`お気に入り${favorite ? "を解除" : "に登録"}する`}
    </DrawerButton>
  )
}

interface ControlClipDrawerProps {
  clip: Clip
  onClose: () => void
  open: boolean
}

function ControlClipDrawer({ clip, onClose, open }: ControlClipDrawerProps) {
  const { broadcaster_id, broadcaster_name, title, url } = clip

  const { setClipUrl } = useClip()

  return (
    <Drawer
      closeOnDrag
      onClose={onClose}
      open={open}
      placement="bottom"
      withDragBar={false}
    >
      <DrawerBody gap={0} m={0} px={0}>
        <Text
          alignItems="center"
          color={["blackAlpha.700", "whiteAlpha.600"]}
          fontSize="sm"
          h={14}
          lineClamp={1}
          lineHeight="$sizes.14"
          px="md"
        >
          {`${broadcaster_name} - ${title}`}
        </Text>

        <Separator />

        <VStack gap={0} my="sm" px="sm">
          <DrawerButton
            onClick={() => {
              setClipUrl(clip)
              onClose()
            }}
            startIcon={<PlayIcon />}
          >
            クリップを視聴する
          </DrawerButton>

          <DrawerButton
            as={Link}
            href={url ?? ""}
            startIcon={<TwitchIcon />}
            target="_blank"
          >
            Twitchで視聴する
          </DrawerButton>

          <DrawerButton
            as={Link}
            href={`/streamer/${broadcaster_id}`}
            startIcon={<HexagonOutlined fontSize="md" />}
          >
            {broadcaster_name}のクリップを見る
          </DrawerButton>

          <FavoriteItem clip={clip} />

          <DrawerButton
            as={Link}
            href={createTwitterUrl(clip, url)}
            startIcon={<X fontSize="md" />}
            target="_blank"
          >
            共有する
          </DrawerButton>
        </VStack>
      </DrawerBody>
    </Drawer>
  )
}

interface StreamerLinkProps {
  broadcasterId?: string
  broadcasterName?: string
  profileImageUrl?: string
  teams?: Team[]
}

function StreamerLink({
  broadcasterId,
  broadcasterName,
  profileImageUrl,
  teams,
}: StreamerLinkProps) {
  const breakpoint = useBreakpoint()
  const sm = breakpoint == "sm"
  const props: StackProps = useMemo(
    () => ({
      "aria-label": broadcasterName,
      as: sm ? undefined : Link,
      gap: "sm",
      href: sm ? undefined : `/streamer/${broadcasterId}`,
      itemProp: "actor",
      itemScope: true,
      itemType: "https://schema.org/Person",
      onClick: sm ? undefined : (ev: MouseEvent) => ev.stopPropagation(),
      w: "fit-content",
    }),
    [broadcasterId, broadcasterName, sm],
  )

  return (
    <HStack>
      <HStack {...props}>
        <SkeletonAvatar
          alt={broadcasterName}
          itemProp="image"
          size={{ base: "base", sm: "sm" }}
          src={profileImageUrl}
        />

        <Text itemProp="name" lineClamp={1} overflowWrap="anywhere">
          {broadcasterName}
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
        onContextMenu={(ev: MouseEvent) => {
          ev.preventDefault()
          ev.stopPropagation()
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
                onClick={(ev: MouseEvent) => ev.stopPropagation()}
                style={{
                  textDecoration: "none",
                }}
                target="_blank"
                variant="primary"
              />
            </HStack>

            <StreamerLink
              broadcasterId={broadcaster_id}
              broadcasterName={broadcaster_name}
              profileImageUrl={profile_image_url}
              teams={teams}
            />

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
  carouselProps?: CarouselProps
  withTab?: boolean
}

export function ClipListTabs({
  carouselProps,
  withTab = true,
  ...rest
}: ClipListTabProps) {
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
        {...carouselProps}
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

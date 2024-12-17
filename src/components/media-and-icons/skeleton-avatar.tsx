import {
  Avatar,
  AvatarProps,
  SkeletonCircle,
  useBoolean,
} from "@yamada-ui/react"

interface SkeletonAvatarProps extends AvatarProps {}

export function SkeletonAvatar(props: SkeletonAvatarProps) {
  const [avatarLoaded, { on: avatarOn }] = useBoolean()

  return (
    <SkeletonCircle isLoaded={avatarLoaded}>
      <Avatar onLoad={avatarOn} {...props} />
    </SkeletonCircle>
  )
}

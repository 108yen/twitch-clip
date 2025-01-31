import {
  Avatar,
  AvatarProps,
  SkeletonCircle,
  useBoolean,
} from "@yamada-ui/react"

interface SkeletonAvatarProps extends AvatarProps {
  href?: string
}

export function SkeletonAvatar(props: SkeletonAvatarProps) {
  const [avatarLoaded, { on: avatarOn }] = useBoolean()

  return (
    <SkeletonCircle loaded={avatarLoaded}>
      <Avatar onLoad={avatarOn} {...props} />
    </SkeletonCircle>
  )
}

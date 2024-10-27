import { CONSTANT } from "@/constant"
import { usePage } from "@/contexts"
import { EllipsisVertical } from "@yamada-ui/lucide"
import {
  HStack,
  IconButton,
  Label,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Switch,
  Text,
  useColorMode,
} from "@yamada-ui/react"
import Link from "next/link"
import { useId } from "react"

export function HeaderMenu() {
  const id = useId()
  const { colorMode, toggleColorMode } = useColorMode()
  const { version } = usePage()

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<EllipsisVertical fontSize="xl" />}
        variant="primary"
      />

      <Portal>
        <MenuList contentProps={{ zIndex: "burter" }}>
          <MenuItem closeOnSelect={false}>
            <HStack w="full">
              <Label htmlFor={id} userSelect="none">
                ダークモード
              </Label>

              <Spacer />

              <Switch
                id={id}
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />
            </HStack>
          </MenuItem>

          {CONSTANT.MENU.map(({ href, title }) => (
            <MenuItem
              aria-label={title}
              as={Link}
              href={href}
              key={title}
              prefetch={false}
            >
              {title}
            </MenuItem>
          ))}

          <MenuDivider />

          <MenuItem aria-label="リリースノート" as={Link} href="/release-note">
            <HStack w="full">
              <Text textStyle="version">version:</Text>

              <Spacer />

              <Text textStyle="version">{version}</Text>
            </HStack>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

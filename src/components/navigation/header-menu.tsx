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
  Spacer,
  Switch,
  Text,
  useColorMode,
} from "@yamada-ui/react"
import Link from "next/link"
import { useId } from "react"
import { CONSTANT } from "@/constant"
import { usePage } from "@/contexts"

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

      <MenuList>
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
          <MenuItem key={title}>
            <Text as={Link} prefetch={false} href={href} aria-label={title}>
              {title}
            </Text>
          </MenuItem>
        ))}

        <MenuDivider />

        <MenuItem>
          <HStack w="full">
            <Text textStyle="version">version:</Text>

            <Spacer />

            <Text textStyle="version">{version}</Text>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

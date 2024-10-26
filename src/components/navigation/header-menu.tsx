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
  useDisclosure,
} from "@yamada-ui/react"
import Link from "next/link"
import { useId } from "react"

export function HeaderMenu() {
  const id = useId()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const { version } = usePage()

  return (
    <Menu isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
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
            <MenuItem key={title}>
              <Text
                aria-label={title}
                as={Link}
                href={href}
                onClick={() => onClose()}
                prefetch={false}
              >
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
      </Portal>
    </Menu>
  )
}

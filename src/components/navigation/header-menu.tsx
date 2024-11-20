import { CONSTANT } from "@/constant"
import { COLOR_SCHEMES } from "@/constant/color-schemes"
import { usePage } from "@/contexts"
import { EllipsisVerticalIcon } from "@yamada-ui/lucide"
import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemButton,
  MenuList,
  MenuOptionGroup,
  MenuOptionItem,
  Portal,
  Spacer,
  Switch,
  Text,
  useColorMode,
  useTheme,
} from "@yamada-ui/react"
import Link from "next/link"
import { useId } from "react"

export function HeaderMenu() {
  const id = useId()
  const { colorMode, toggleColorMode } = useColorMode()
  const { changeThemeScheme, themeScheme } = useTheme()
  const { version } = usePage()

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<EllipsisVerticalIcon fontSize="xl" />}
        variant="primary"
      />

      <Portal>
        <MenuList contentProps={{ zIndex: "burter" }}>
          <MenuItem closeOnSelect={false}>
            <HStack w="full">
              <Switch
                id={id}
                isChecked={colorMode === "dark"}
                isReverse
                labelProps={{ w: "full" }}
                onChange={toggleColorMode}
                w="full"
              >
                ダークモード
              </Switch>
            </HStack>
          </MenuItem>

          <MenuItem closeOnSelect={false}>
            <Menu>
              <MenuItemButton>カラーモード</MenuItemButton>

              <MenuList>
                <MenuOptionGroup
                  onChange={changeThemeScheme}
                  type="radio"
                  value={themeScheme}
                >
                  {COLOR_SCHEMES.map((value, index) => (
                    <MenuOptionItem key={index} value={value}>
                      <Box
                        bg={`${value}.500`}
                        boxShadow="inner"
                        minH="6"
                        minW="6"
                        rounded="md"
                      />
                      {value}
                    </MenuOptionItem>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </MenuItem>

          {CONSTANT.MENU.map(({ href, title }) => (
            <MenuItem aria-label={title} as={Link} href={href} key={title}>
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

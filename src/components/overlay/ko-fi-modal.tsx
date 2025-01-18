"use client"

import {
  Button,
  Modal,
  ModalBody,
  useColorMode,
  useDisclosure,
  useTheme,
} from "@yamada-ui/react"

export function KoFiModal() {
  const { onClose, onOpen, open } = useDisclosure()
  const { colorMode } = useColorMode()
  const { themeScheme } = useTheme()
  const buttonColor =
    colorMode == "dark" && themeScheme == "mono" ? "black" : undefined

  const modalProps: any = {
    bg: "transparent",
    boxShadow: "none",
    onClose,
    open,
    withCloseButton: false,
  }

  return (
    <>
      <Button
        color={buttonColor}
        colorScheme="primary"
        onClick={onOpen}
        rounded="full"
        size="sm"
        w="full"
      >
        寄付する✨
      </Button>

      <Modal {...modalProps}>
        <ModalBody>
          <iframe
            height="600"
            id="kofi-iframe"
            src="https://ko-fi.com/108yen/?hidefeed=true&widget=true&embed=true&preview=true"
            style={{
              border: "none",
              borderRadius: "0.375rem",
              width: "100%",
            }}
            title="108yen"
          />
        </ModalBody>
      </Modal>
    </>
  )
}

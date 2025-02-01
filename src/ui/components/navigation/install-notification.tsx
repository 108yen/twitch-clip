import {
  Alert,
  AlertDescription,
  AlertTitle,
  CloseButton,
  NoticeProps,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"

export function InstallNotification({
  className,
  onClose,
  status,
}: NoticeProps) {
  return (
    <Alert
      alignItems="start"
      boxShadow="lg"
      className={className}
      colorScheme="primary"
      pe={8}
      status={status}
      variant="island-accent"
    >
      <VStack alignItems="flex-end" gap={0} w="fit-content">
        <AlertTitle lineClamp={1} w="fit-content">
          アプリを端末にインストールする
        </AlertTitle>
        <AlertDescription
          _hover={{ textDecoration: "underline" }}
          as={Link}
          color="link.500"
          href="/install-manual"
          mr={2}
          onClick={(ev) => {
            ev.stopPropagation()

            onClose?.()
          }}
          w="fit-content"
        >
          インストール手順を確認
        </AlertDescription>
      </VStack>

      <CloseButton
        onClick={(ev) => {
          ev.stopPropagation()

          onClose?.()
        }}
        position="absolute"
        right={2}
        size="sm"
        top={2}
      />
    </Alert>
  )
}

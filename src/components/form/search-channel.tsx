import { SearchIcon } from "@yamada-ui/lucide"
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@yamada-ui/react"

interface SearchChannelProps {
  num: number
  onChange: (value: string) => void
}
export function SearchChannel({ num: _num, onChange }: SearchChannelProps) {
  const num = `${_num} channels`

  return (
    <InputGroup>
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>

      <Input
        aria-label="Text form for search streamers"
        focusBorderColor="primary.500"
        onChange={(ev) => onChange(ev.target.value)}
        placeholder="search"
        type="text"
        variant="flushed"
      />

      <InputRightElement w="fit-content">
        <Text
          aria-label="Number of hit streamers"
          color="primary.500"
          fontSize="2xl"
        >
          {num}
        </Text>
      </InputRightElement>
    </InputGroup>
  )
}

import { SearchIcon } from "@yamada-ui/lucide"
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@yamada-ui/react"
import { ChangeEvent } from "react"

import { CountUp } from "../transitions"

interface SearchChannelProps {
  num: number
  onChange: (value: string) => void
}
export function SearchChannels({ num: _num, onChange }: SearchChannelProps) {
  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    onChange(ev.target.value)
  }

  return (
    <InputGroup>
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>

      <Input
        aria-label="Text form for search streamers"
        focusBorderColor="primary.500"
        onChange={handleChange}
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
          <CountUp count={_num} /> channels
        </Text>
      </InputRightElement>
    </InputGroup>
  )
}

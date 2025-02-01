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

interface SearchClipProps {
  num: number
  onChange: (value: string) => void
}
export function SearchClips({ num: _num, onChange }: SearchClipProps) {
  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    onChange(ev.target.value)
  }

  return (
    <InputGroup>
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>

      <Input
        aria-label="Text form for search clips"
        focusBorderColor="primary.500"
        onChange={handleChange}
        placeholder="search"
        type="text"
        variant="flushed"
      />

      <InputRightElement w="fit-content">
        <Text
          aria-label="Number of hit clips"
          color="primary.500"
          fontSize="2xl"
        >
          <CountUp count={_num} /> clips
        </Text>
      </InputRightElement>
    </InputGroup>
  )
}

"use client"

import { LayoutGridIcon, Rows3Icon } from "@yamada-ui/lucide"
import {
  SegmentedControl,
  SegmentedControlButton,
  StackProps,
  useBreakpoint,
} from "@yamada-ui/react"

import { PageHeader } from "./page-header"

interface FavoriteHeaderProps extends StackProps {
  handleChangeLayout(value: string): void
}

export function FavoriteHeader({
  handleChangeLayout,
  ...rest
}: FavoriteHeaderProps) {
  const breakpoint = useBreakpoint()

  return (
    <PageHeader title="Favorite" {...rest}>
      {breakpoint != "sm" ? (
        <SegmentedControl
          defaultValue="grid"
          minW="2xs"
          onChange={handleChangeLayout}
        >
          <SegmentedControlButton aria-label="Grid layout" value="grid">
            <LayoutGridIcon />
          </SegmentedControlButton>
          <SegmentedControlButton aria-label="Table layout" value="table">
            <Rows3Icon />
          </SegmentedControlButton>
        </SegmentedControl>
      ) : null}
    </PageHeader>
  )
}

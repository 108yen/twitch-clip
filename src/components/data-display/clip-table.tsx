"use client"

import { Clip } from "@/models/clip"
import { formatDate } from "@/utils/string"
import { SquareArrowOutUpRightIcon } from "@yamada-ui/lucide"
import { Text } from "@yamada-ui/react"
import { Column, PagingTable } from "@yamada-ui/table"
import Link from "next/link"
import { useMemo } from "react"

interface ClipTableProps {
  clips: Clip[]
}

export function ClipTable({ clips }: ClipTableProps) {
  const columns = useMemo<Column<Clip>[]>(
    () => [
      {
        accessorKey: "title",
        cell: ({ getValue, referenceRef, row, tabIndex }) => (
          <Text
            _hover={{ textDecorationLine: "underline" }}
            alignItems="center"
            as={Link}
            display="flex"
            gap="xs"
            href={row.original.url ?? ""}
            ref={referenceRef}
            tabIndex={tabIndex}
            target="_blank"
            w="fit-content"
          >
            {getValue()}
            <SquareArrowOutUpRightIcon />
          </Text>
        ),
        header: "Title",
      },
      {
        accessorKey: "broadcaster_name",
        cell: ({ getValue, referenceRef, row, tabIndex }) => (
          <Text
            _hover={{ textDecorationLine: "underline" }}
            alignItems="center"
            as={Link}
            display="flex"
            gap="xs"
            href={`https://www.twitch.tv/${row.original.broadcaster_login}`}
            ref={referenceRef}
            tabIndex={tabIndex}
            target="_blank"
            w="fit-content"
          >
            {getValue()}
            <SquareArrowOutUpRightIcon />
          </Text>
        ),
        header: "Channel",
      },
      {
        accessorKey: "created_at",
        cell: ({ getValue }) => formatDate(getValue()),
        header: "Created at",
      },
    ],
    [],
  )

  return (
    <PagingTable
      columns={columns}
      data={clips}
      defaultPageSize={10}
      enableRowSelection={false}
      headerProps={{ textTransform: "none" }}
      highlightOnHover
      pageSizeList={[10, 20, 50, 100]}
      paginationProps={{ variant: "outline" }}
    />
  )
}

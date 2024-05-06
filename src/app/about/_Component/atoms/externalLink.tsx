"use client"

import Link from "next/link"
import { ReactNode } from "react"

import { event } from "@/components/googleAnalytics/gtag"

export default function ExternalLink(props: {
  children: ReactNode
  href: string
  ariaLabel: string
  eventLabel: string
}) {
  const { children, href, ariaLabel, eventLabel } = props

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      style={{
        textDecoration: `none`
      }}
      onClick={() => {
        event(`click`, {
          label: eventLabel,
          link_url: href
        })
      }}
    >
      {children}
    </Link>
  )
}

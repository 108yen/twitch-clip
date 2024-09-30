"use client"

import { event } from "@/components/googleAnalytics/gtag"
import Link from "next/link"
import { ReactNode } from "react"

export default function ExternalLink(props: {
  ariaLabel: string
  children: ReactNode
  eventLabel: string
  href: string
}) {
  const { ariaLabel, children, eventLabel, href } = props

  return (
    <Link
      aria-label={ariaLabel}
      href={href}
      onClick={() => {
        event("click", {
          label: eventLabel,
          link_url: href,
        })
      }}
      style={{
        textDecoration: "none",
      }}
      target="_blank"
    >
      {children}
    </Link>
  )
}

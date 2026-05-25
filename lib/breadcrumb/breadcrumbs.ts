import { labels } from "@/lib/breadcrumb/breadcrumb-labels"

function formatSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function getBreadcrumbs(
  pathname: string,
  overrides: Record<string, string> = {}
) {
  const segments = pathname.split("/").filter(Boolean)
  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label =
      overrides[href] ??
      labels[href.slice(1)] ?? 
      labels[segment] ??         
      formatSegment(segment)
    return {
      href,
      label,
      isLast: index === segments.length - 1,
    }
  })
}


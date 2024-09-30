export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ""

export const existsGaId = GA_MEASUREMENT_ID !== ""

type EventOptions = {
  category?: string
  label?: string
  nonInteraction?: boolean
  userId?: string
  value?: number
} & Record<string, unknown>
export const event = (
  action: string,
  {
    category,
    label,
    nonInteraction,
    userId,
    value,
    ...otherOptions
  }: EventOptions,
) => {
  if (!window.gtag) {
    return
  }
  const eventOptions = Object.assign({}, otherOptions)
  if (category !== undefined) {
    eventOptions.event_category = category
  }
  if (label !== undefined) {
    eventOptions.event_label = label
  }
  if (value !== undefined) {
    eventOptions.value = value
  }
  if (nonInteraction !== undefined) {
    eventOptions.non_interaction = nonInteraction
  }
  if (userId !== undefined) {
    eventOptions.user_id = userId
  }
  window.gtag("event", action, eventOptions)
}

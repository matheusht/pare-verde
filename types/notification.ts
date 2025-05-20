export interface Notification {
  id: string
  type: "report" | "event" | "alert" | "general"
  title: string
  content: string
  timestamp: string
  read: boolean
  actionLink?: string
  actionText?: string
}

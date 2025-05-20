import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // Less than a minute
  if (seconds < 60) {
    return "agora mesmo"
  }

  // Less than an hour
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? "s" : ""} atrás`
  }

  // Less than a day
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hora${hours !== 1 ? "s" : ""} atrás`
  }

  // Less than a week
  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days} dia${days !== 1 ? "s" : ""} atrás`
  }

  // Format as date
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

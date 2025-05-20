"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Bell, AlertTriangle, Calendar, FileText, Check, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatTimeAgo } from "@/lib/utils"
import type { Notification } from "@/types/notification"

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

export function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Get the appropriate icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case "report":
        return <FileText className="h-5 w-5" />
      case "event":
        return <Calendar className="h-5 w-5" />
      case "alert":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  // Get the appropriate color based on notification type
  const getColor = () => {
    switch (notification.type) {
      case "report":
        return "bg-green-100"
      case "event":
        return "bg-purple-100"
      case "alert":
        return "bg-yellow-100"
      default:
        return "bg-blue-100"
    }
  }

  // Get the appropriate label based on notification type
  const getLabel = () => {
    switch (notification.type) {
      case "report":
        return "Relatório"
      case "event":
        return "Evento"
      case "alert":
        return "Alerta"
      default:
        return "Notificação"
    }
  }

  // Handle mark as read
  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
  }

  // Handle delete
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(notification.id)
  }

  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <Card
      className={`border-4 border-black shadow-neobrutalism overflow-hidden transition-all duration-200 ${
        notification.read ? "bg-white" : "bg-blue-50"
      }`}
      onClick={toggleExpanded}
    >
      <div className="p-4 md:p-6">
        <div className="flex items-start gap-3">
          {/* Icon and type */}
          <div className={`p-2 rounded-full ${getColor()} border-4 border-black flex-shrink-0`}>{getIcon()}</div>

          <div className="flex-1 min-w-0">
            {/* Header with title and timestamp */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{notification.title}</h3>
                <Badge className={`${getColor()} border-2 border-black`}>{getLabel()}</Badge>
                {!notification.read && <span className="h-3 w-3 bg-blue-500 rounded-full border-2 border-black"></span>}
              </div>
              <span className="text-sm text-gray-500">{formatTimeAgo(notification.timestamp)}</span>
            </div>

            {/* Content */}
            <p className={`text-gray-700 ${isExpanded ? "" : "line-clamp-2"}`}>{notification.content}</p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {notification.actionLink && (
                <Link href={notification.actionLink}>
                  <Button
                    variant="neobrutalism"
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {notification.actionText || "Ver Detalhes"}
                  </Button>
                </Link>
              )}

              <div className="ml-auto flex items-center gap-2">
                {!notification.read && (
                  <Button
                    variant="neobrutalism"
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism text-white"
                    onClick={handleMarkAsRead}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Marcar como lida
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="neobrutalism"
                      size="icon"
                      className="h-9 w-9 border-4 border-black shadow-neobrutalism"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-4 border-black shadow-neobrutalism">
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2" onClick={handleDelete}>
                      <Trash2 className="h-4 w-4" />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationCard } from "@/components/notifications/notification-card"
import { EmptyState } from "@/components/notifications/empty-state"
import { mockNotifications } from "@/data/mock-notifications"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeFilter, setActiveFilter] = useState("all")
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter notifications based on active filter and unread toggle
  const filteredNotifications = notifications.filter((notification) => {
    if (unreadOnly && notification.read) return false
    if (activeFilter === "all") return true
    return notification.type === activeFilter
  })

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <header className="bg-white border-b-4 border-black shadow-neobrutalism sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Button
              variant="neobrutalism"
              size="icon"
              className="bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-xl font-bold">Pare Verde</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="neobrutalism"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Marcar todas como lidas
            </Button>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-blue-400 border-b-4 border-black py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Bell className="h-8 w-8" />
              Notificações
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white border-2 border-black">
                  {unreadCount} não lida{unreadCount !== 1 ? "s" : ""}
                </Badge>
              )}
            </h1>
            <p className="text-lg mt-1">Atualizações sobre seus relatórios e eventos da comunidade</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 bg-white border-b-4 border-black z-20 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 w-full md:w-auto border-4 border-black shadow-neobrutalism">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Todas
                </TabsTrigger>
                <TabsTrigger value="report" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  Relatórios
                </TabsTrigger>
                <TabsTrigger value="event" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  Eventos
                </TabsTrigger>
                <TabsTrigger value="alert" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                  Alertas
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 bg-gray-100 p-2 border-4 border-black shadow-neobrutalism">
              <span className="text-sm font-medium">Apenas não lidas</span>
              <Switch
                checked={unreadOnly}
                onCheckedChange={setUnreadOnly}
                className="border-2 border-black data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          // Loading state
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-4 border-black shadow-neobrutalism p-6 bg-white animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
          </div>
        ) : (
          <EmptyState activeFilter={activeFilter} unreadOnly={unreadOnly} />
        )}
      </div>
    </div>
  )
}

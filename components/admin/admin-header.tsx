"use client"

import { Bell, Download, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function AdminHeader() {
  return (
    <header className="bg-white border-b-4 border-black shadow-neobrutalism sticky top-0 z-30 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Pare Verde</span>
          <Badge className="bg-green-500 text-white border-2 border-black">Admin</Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="neobrutalism"
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white hidden md:flex"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatórios
          </Button>

          <Button
            variant="neobrutalism"
            size="sm"
            className="bg-purple-500 hover:bg-purple-600 border-4 border-black shadow-neobrutalism text-white hidden md:flex"
          >
            <Users className="h-4 w-4 mr-2" />
            Gerenciar Equipe
          </Button>

          <Button
            variant="neobrutalism"
            size="icon"
            className="relative bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
              3
            </span>
          </Button>

          <Button
            variant="neobrutalism"
            size="icon"
            className="bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <Avatar className="h-10 w-10 border-4 border-black">
            <AvatarImage src="/placeholder.svg" alt="Admin" />
            <AvatarFallback className="bg-green-200">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

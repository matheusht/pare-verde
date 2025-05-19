"use client"

import Link from "next/link"
import { FileText, Bell, Users, Award, BookOpen, User, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function UserNavigation() {
  const isMobile = useMobile()

  // Navigation items
  const navItems = [
    { name: "Mapa", href: "/", icon: Home },
    { name: "Meus Relatórios", href: "/meus-relatorios", icon: FileText },
    { name: "Comunidade", href: "/comunidade", icon: Users },
    { name: "Notificações", href: "/notificacoes", icon: Bell },
    { name: "Conquistas", href: "/conquistas", icon: Award },
    { name: "Recursos", href: "/recursos", icon: BookOpen },
    { name: "Perfil", href: "/perfil", icon: User },
  ]

  return (
    <div className="absolute top-20 left-4 z-10">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="neobrutalism"
              className="bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism w-full justify-start"
            >
              <item.icon className="h-5 w-5 mr-2" />
              {!isMobile && <span>{item.name}</span>}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

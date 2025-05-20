"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Map, BarChart3, Users, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function AdminSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Relatórios", href: "/admin/reports", icon: FileText },
    { name: "Mapa", href: "/admin/map", icon: Map },
    { name: "Análises", href: "/admin/analytics", icon: BarChart3 },
    { name: "Equipe", href: "/admin/team", icon: Users },
    { name: "Configurações", href: "/admin/settings", icon: Settings },
  ]

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // On mobile, show a button to toggle the sidebar
  if (isMobile) {
    return (
      <>
        <Button
          variant="neobrutalism"
          size="icon"
          className="fixed top-4 left-4 z-40 bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5 text-white" />
        </Button>

        {/* Mobile sidebar */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white border-r-4 border-black shadow-neobrutalism transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b-4 border-black flex justify-between items-center">
              <span className="text-xl font-bold">Pare Verde</span>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <Button
                        variant="neobrutalism"
                        className={`w-full justify-start ${
                          pathname === item.href
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-white hover:bg-gray-100"
                        } border-4 border-black shadow-neobrutalism`}
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.name}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-4 left-4 right-4">
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-red-500 hover:bg-red-600 border-4 border-black shadow-neobrutalism text-white"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sair
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className="w-64 border-r-4 border-black shadow-neobrutalism bg-white h-screen sticky top-0 hidden md:block">
      <div className="p-4 border-b-4 border-black">
        <span className="text-xl font-bold">Pare Verde</span>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <Button
                  variant="neobrutalism"
                  className={`w-full justify-start ${
                    pathname === item.href ? "bg-green-500 text-white hover:bg-green-600" : "bg-white hover:bg-gray-100"
                  } border-4 border-black shadow-neobrutalism`}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="neobrutalism"
            className="w-full justify-start bg-red-500 hover:bg-red-600 border-4 border-black shadow-neobrutalism text-white"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sair
          </Button>
        </div>
      </nav>
    </div>
  )
}

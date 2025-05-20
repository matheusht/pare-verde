import { Bell, FileText, Calendar, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  activeFilter: string
  unreadOnly: boolean
}

export function EmptyState({ activeFilter, unreadOnly }: EmptyStateProps) {
  // Get the appropriate icon based on active filter
  const getIcon = () => {
    switch (activeFilter) {
      case "report":
        return <FileText className="h-16 w-16 mb-4 text-green-500" />
      case "event":
        return <Calendar className="h-16 w-16 mb-4 text-purple-500" />
      case "alert":
        return <AlertTriangle className="h-16 w-16 mb-4 text-yellow-500" />
      default:
        return <Bell className="h-16 w-16 mb-4 text-blue-500" />
    }
  }

  // Get the appropriate message based on active filter and unread toggle
  const getMessage = () => {
    if (unreadOnly) {
      return "Você não tem notificações não lidas no momento."
    }

    switch (activeFilter) {
      case "report":
        return "Você não tem notificações de relatórios no momento."
      case "event":
        return "Você não tem notificações de eventos no momento."
      case "alert":
        return "Você não tem alertas no momento."
      default:
        return "Você não tem notificações no momento."
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-4 border-black shadow-neobrutalism bg-white">
      {getIcon()}
      <h3 className="text-xl font-bold mb-2">{getMessage()}</h3>
      <p className="text-gray-600 mb-6 max-w-md">
        Comece enviando um relatório ou participando de eventos da comunidade para receber atualizações.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/">
          <Button
            variant="neobrutalism"
            className="bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism text-white"
          >
            <FileText className="h-5 w-5 mr-2" />
            Enviar Relatório
          </Button>
        </Link>
        <Link href="/comunidade">
          <Button
            variant="neobrutalism"
            className="bg-purple-500 hover:bg-purple-600 border-4 border-black shadow-neobrutalism text-white"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Ver Eventos
          </Button>
        </Link>
      </div>
    </div>
  )
}

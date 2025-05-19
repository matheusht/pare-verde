"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface ReportButtonProps {
  onClick: () => void
}

export function ReportButton({ onClick }: ReportButtonProps) {
  return (
    <Button
      variant="neobrutalism"
      size="icon"
      className="absolute bottom-20 right-4 z-10 h-14 w-14 rounded-full bg-yellow-400 hover:bg-yellow-500 border-4 border-black shadow-neobrutalism"
      onClick={onClick}
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}

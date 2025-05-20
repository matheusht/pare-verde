"use client"

import { CheckCircle, UserPlus, Download, Flag, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BatchActionsToolbarProps {
  selectedCount: number
  onClearSelection: () => void
}

export function BatchActionsToolbar({ selectedCount, onClearSelection }: BatchActionsToolbarProps) {
  return (
    <div className="bg-yellow-50 border-2 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center">
        <span className="font-bold mr-2">{selectedCount} reports selected</span>
        <Button variant="ghost" size="sm" onClick={onClearSelection} className="text-gray-500 hover:text-gray-700">
          <X size={16} />
          <span className="sr-only">Clear selection</span>
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="neobrutalism"
          size="sm"
          className="bg-green-100 border-2 border-green-900 shadow-[2px_2px_0px_0px_rgba(22,101,52)]"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark as Resolved
        </Button>
        <Button
          variant="neobrutalism"
          size="sm"
          className="bg-blue-100 border-2 border-blue-900 shadow-[2px_2px_0px_0px_rgba(30,58,138)]"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Assign to Department
        </Button>
        <Button
          variant="neobrutalism"
          size="sm"
          className="bg-purple-100 border-2 border-purple-900 shadow-[2px_2px_0px_0px_rgba(76,29,149)]"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Selected
        </Button>
        <Button
          variant="neobrutalism"
          size="sm"
          className="bg-orange-100 border-2 border-orange-900 shadow-[2px_2px_0px_0px_rgba(124,45,18)]"
        >
          <Flag className="mr-2 h-4 w-4" />
          Flag for Review
        </Button>
      </div>
    </div>
  )
}

"use client"

import { X, CheckCircle, Users, Download, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BatchActionsToolbarProps {
  selectedCount: number
  onClearSelection: () => void
}

export function BatchActionsToolbar({ selectedCount, onClearSelection }: BatchActionsToolbarProps) {
  return (
    <div className="bg-yellow-100 border-2 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="font-bold mr-2">{selectedCount} reports selected</span>
          <Button variant="ghost" size="sm" onClick={onClearSelection} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Clear selection</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="neobrutalism" size="sm" className="bg-green-500 text-white border-2 border-black">
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Resolved
          </Button>
          <Button variant="neobrutalism" size="sm" className="bg-blue-500 text-white border-2 border-black">
            <Users className="mr-2 h-4 w-4" />
            Assign to Department
          </Button>
          <Button variant="neobrutalism" size="sm" className="bg-gray-100 border-2 border-black">
            <Download className="mr-2 h-4 w-4" />
            Export Selected
          </Button>
          <Button variant="neobrutalism" size="sm" className="bg-orange-500 text-white border-2 border-black">
            <Flag className="mr-2 h-4 w-4" />
            Flag for Review
          </Button>
        </div>
      </div>
    </div>
  )
}

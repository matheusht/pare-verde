"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClipboardList, Users } from "lucide-react"

export function IntegrationLinks() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Link href="/admin/reports?status=assigned" passHref>
        <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full sm:w-auto">
          <ClipboardList className="h-5 w-5" />
          View Assigned Reports
        </Button>
      </Link>
      <Link href="/admin/dashboard#teams" passHref>
        <Button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full sm:w-auto">
          <Users className="h-5 w-5" />
          Manage Teams & Roles
        </Button>
      </Link>
    </div>
  )
}

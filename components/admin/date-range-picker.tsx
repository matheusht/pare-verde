"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  value: { from: Date; to: Date }
  onChange: (value: { from: Date; to: Date }) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [date, setDate] = useState<{ from: Date; to: Date }>(value)

  // Handle date selection
  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return

    const newDate = { ...date }

    if (!newDate.from || (newDate.from && newDate.to)) {
      // If no date selected or both dates selected, start new selection
      newDate.from = selectedDate
      newDate.to = selectedDate
    } else {
      // If only from date is selected
      if (selectedDate < newDate.from) {
        newDate.from = selectedDate
      } else {
        newDate.to = selectedDate
      }
    }

    setDate(newDate)
    onChange(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neobrutalism" className="bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>
            {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-4 border-black shadow-neobrutalism" align="start">
        <Calendar
          mode="range"
          selected={{ from: date.from, to: date.to }}
          onSelect={(range) => {
            if (range?.from && range?.to) {
              setDate({ from: range.from, to: range.to })
              onChange({ from: range.from, to: range.to })
            }
          }}
          locale={ptBR}
          className="border-4 border-black"
        />
        <div className="p-3 border-t-4 border-black">
          <div className="flex gap-2">
            <Button
              variant="neobrutalism"
              size="sm"
              className="flex-1 bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white"
              onClick={() => {
                const today = new Date()
                const sevenDaysAgo = new Date()
                sevenDaysAgo.setDate(today.getDate() - 7)
                const newDate = { from: sevenDaysAgo, to: today }
                setDate(newDate)
                onChange(newDate)
              }}
            >
              Últimos 7 dias
            </Button>
            <Button
              variant="neobrutalism"
              size="sm"
              className="flex-1 bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white"
              onClick={() => {
                const today = new Date()
                const thirtyDaysAgo = new Date()
                thirtyDaysAgo.setDate(today.getDate() - 30)
                const newDate = { from: thirtyDaysAgo, to: today }
                setDate(newDate)
                onChange(newDate)
              }}
            >
              Últimos 30 dias
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

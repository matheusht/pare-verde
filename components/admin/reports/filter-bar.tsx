"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface FilterBarProps {
  onFilterChange: (filters: any) => void
  onSearch: (query: string) => void
  totalReports: number
  activeFilters: number
}

export function FilterBar({ onFilterChange, onSearch, totalReports, activeFilters }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    severity: "all",
    neighborhood: "all",
    showUnread: false,
  })

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  // Handle filter change
  const handleFilterChange = (key: string, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Reset all filters
  const resetFilters = () => {
    const resetValues = {
      status: "all",
      category: "all",
      severity: "all",
      neighborhood: "all",
      showUnread: false,
    }
    setFilters(resetValues)
    onFilterChange(resetValues)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Reports</h2>
          <div className="ml-4 rounded-full bg-gray-100 px-3 py-1 text-sm">{totalReports} total</div>
          {activeFilters > 0 && (
            <div className="ml-2 rounded-full bg-green-100 px-3 py-1 text-sm">{activeFilters} filters active</div>
          )}
        </div>
        <div className="flex gap-2">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-10 rounded-md border-2 border-black bg-white pl-10 pr-4 text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
            />
          </form>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-gray-200" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
          {activeFilters > 0 && (
            <Button variant="outline" size="icon" onClick={resetFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="rounded-md border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select onValueChange={(value) => handleFilterChange("status", value)} defaultValue={filters.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select onValueChange={(value) => handleFilterChange("category", value)} defaultValue={filters.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="accessibility">Accessibility</SelectItem>
                  <SelectItem value="green-areas">Green Areas</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <Select onValueChange={(value) => handleFilterChange("severity", value)} defaultValue={filters.severity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Neighborhood</label>
              <Select
                onValueChange={(value) => handleFilterChange("neighborhood", value)}
                defaultValue={filters.neighborhood}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select neighborhood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Neighborhoods</SelectItem>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="ipanema">Ipanema</SelectItem>
                  <SelectItem value="copacabana">Copacabana</SelectItem>
                  <SelectItem value="tijuca">Tijuca</SelectItem>
                  <SelectItem value="barra">Barra da Tijuca</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <label className="flex cursor-pointer items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.showUnread}
                  onChange={(e) => handleFilterChange("showUnread", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm font-medium">Show only unread</span>
              </label>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
            <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  )
}

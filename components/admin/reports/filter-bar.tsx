"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Report } from "@/types/report"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface FilterBarProps {
  onFilterChange: (filteredReports: Report[]) => void
  allReports: Report[]
}

export function FilterBar({ onFilterChange, allReports }: FilterBarProps) {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>("all")
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  // Active filters count
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Get unique values for filters
  const categories = ["all", ...new Set(allReports.map((report) => report.category))]
  const neighborhoods = ["all", ...new Set(allReports.map((report) => report.region))]

  // Apply filters
  useEffect(() => {
    let filtered = [...allReports]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (report) =>
          report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((report) => report.category === categoryFilter)
    }

    // Severity filter
    if (severityFilter !== "all") {
      filtered = filtered.filter((report) => report.severity === Number.parseInt(severityFilter))
    }

    // Neighborhood filter
    if (neighborhoodFilter !== "all") {
      filtered = filtered.filter((report) => report.region === neighborhoodFilter)
    }

    // Date range filter
    if (dateRange.from) {
      filtered = filtered.filter((report) => {
        const reportDate = new Date(report.date)
        return reportDate >= dateRange.from!
      })
    }

    if (dateRange.to) {
      filtered = filtered.filter((report) => {
        const reportDate = new Date(report.date)
        return reportDate <= dateRange.to!
      })
    }

    // Unread filter (mock implementation - in a real app, you'd have a read/unread status)
    if (showOnlyUnread) {
      filtered = filtered.filter((report) => report.status === "pending")
    }

    // Count active filters
    let count = 0
    if (searchQuery) count++
    if (statusFilter !== "all") count++
    if (categoryFilter !== "all") count++
    if (severityFilter !== "all") count++
    if (neighborhoodFilter !== "all") count++
    if (dateRange.from || dateRange.to) count++
    if (showOnlyUnread) count++
    setActiveFiltersCount(count)

    onFilterChange(filtered)
  }, [
    searchQuery,
    statusFilter,
    categoryFilter,
    severityFilter,
    neighborhoodFilter,
    dateRange,
    showOnlyUnread,
    allReports,
    onFilterChange,
  ])

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setCategoryFilter("all")
    setSeverityFilter("all")
    setNeighborhoodFilter("all")
    setDateRange({ from: undefined, to: undefined })
    setShowOnlyUnread(false)
  }

  return (
    <div className="bg-white border-2 border-black p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search input */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search by ID, address, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-2 border-black"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Status filter */}
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter} placeholder="Status">
            <option value="all">All Statuses</option>
            <option value="pending">Submitted</option>
            <option value="in-progress">In Review</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </Select>
        </div>

        {/* Category filter */}
        <div className="w-full md:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter} placeholder="Category">
            <option value="all">All Categories</option>
            {categories
              .filter((cat) => cat !== "all")
              .map((category) => (
                <option key={category} value={category}>
                  {category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
          </Select>
        </div>

        {/* Filter button with popover for additional filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-2 border-black flex items-center gap-2">
              <Filter size={16} />
              More Filters
              {activeFiltersCount > 0 && <Badge className="ml-1 bg-black text-white">{activeFiltersCount}</Badge>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-2">Filters</h3>

              {/* Severity filter */}
              <div>
                <Label htmlFor="severity">Severity</Label>
                <Select id="severity" value={severityFilter} onValueChange={setSeverityFilter} placeholder="Severity">
                  <option value="all">All Severities</option>
                  <option value="1">1 - Low</option>
                  <option value="2">2</option>
                  <option value="3">3 - Medium</option>
                  <option value="4">4</option>
                  <option value="5">5 - High</option>
                </Select>
              </div>

              {/* Neighborhood filter */}
              <div>
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Select
                  id="neighborhood"
                  value={neighborhoodFilter}
                  onValueChange={setNeighborhoodFilter}
                  placeholder="Neighborhood"
                >
                  <option value="all">All Neighborhoods</option>
                  {neighborhoods
                    .filter((n) => n !== "all")
                    .map((neighborhood) => (
                      <option key={neighborhood} value={neighborhood}>
                        {neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1)}
                      </option>
                    ))}
                </Select>
              </div>

              {/* Date range filter */}
              <div>
                <Label>Date Range</Label>
                <div className="flex flex-col gap-2 mt-2">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange as any}
                    className="border rounded-md p-2"
                  />
                  {(dateRange.from || dateRange.to) && (
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "Start date"}
                        {" - "}
                        {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "End date"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDateRange({ from: undefined, to: undefined })}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Show only unread */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="unread"
                  checked={showOnlyUnread}
                  onCheckedChange={(checked) => setShowOnlyUnread(checked as boolean)}
                />
                <Label htmlFor="unread">Show only unread</Label>
              </div>

              {/* Reset filters */}
              <Button variant="outline" className="w-full border-2 border-black mt-2" onClick={resetFilters}>
                Reset All Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

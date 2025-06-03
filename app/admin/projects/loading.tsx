import { Skeleton } from "@/components/ui/skeleton"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header Skeleton */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <Skeleton className="h-12 w-96 mb-2" />
                <Skeleton className="h-6 w-80" />
              </div>
              <Skeleton className="h-12 w-48" />
            </div>

            {/* Overview Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-4 border-black p-6">
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-10 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>

            {/* Timeline Skeleton */}
            <div className="border-4 border-black p-6 mb-8">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </div>

            {/* Table Skeleton */}
            <div className="border-4 border-black p-6">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

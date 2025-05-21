import { Skeleton } from "@/components/ui/skeleton"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[180px] rounded-lg" />
              ))}
          </div>
        </div>

        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-[450px] rounded-lg" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-8 w-56 mb-4" />
          <Skeleton className="h-[450px] rounded-lg" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-[450px] rounded-lg" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-8 w-52 mb-4" />
          <Skeleton className="h-[450px] rounded-lg" />
        </div>
      </div>
    </div>
  )
}

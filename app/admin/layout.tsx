import { ClerkProvider } from '@clerk/nextjs'
import { AdminHeader } from '@/components/admin-header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <main>
          {children}
        </main>
      </div>
    </ClerkProvider>
  )
}
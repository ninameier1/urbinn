import PageHeader from '@components/PageHeader'
import Footer from '@components/Footer'
import MainNav from '@/components/MainNav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      <PageHeader nav={<MainNav />} />

      <main className="flex-1 pt-24">
        <div className="container max-w-full">
          {children}
        </div>
      </main>

      <Footer />

    </div>
  )
}
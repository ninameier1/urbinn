import PageHeader from '@components/PageHeader'
import Footer from '@components/Footer'

export default function LayoutShell({
  children,
  nav,
  background = 'bg-background',
}: {
  children: React.ReactNode
  nav: React.ReactNode
  background?: string
}) {
  return (
    <div className={`flex flex-col min-h-screen ${background}`}>
      <PageHeader nav={nav} />

      <main className="flex-1 pt-24">
        <div className="container max-w-full">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
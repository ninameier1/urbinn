import LayoutShell from '@/components/LayoutShell'
import MainNav from '@/components/MainNav'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutShell nav={<MainNav />}>
      {children}
    </LayoutShell>
  )
}
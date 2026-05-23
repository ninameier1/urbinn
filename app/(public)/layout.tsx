import LayoutShell from '@/components/LayoutShell'
import MainNav from '@/components/Navigation/MainNav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutShell nav={<MainNav />}>
      {children}
    </LayoutShell>
  )
}
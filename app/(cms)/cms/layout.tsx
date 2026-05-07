import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import PageHeader from '@components/PageHeader';
import CmsNav from '@/components/CmsNav';
import Footer from '@components/Footer';

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login');


  return (
      <div className="flex flex-col min-h-screen bg-background">
        
        <PageHeader nav={<CmsNav username={session.user?.name ?? ""} />} />
  
        <main className="flex-1 pt-26">
          <div className="container max-w-full">
            {children}
          </div>
        </main>
  
        <Footer />
  
      </div>
    )
}

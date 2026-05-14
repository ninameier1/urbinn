export default function ContentLayout({ children, }: { children: React.ReactNode }) { 
    return (
        <div className="py-12 mb-12 relative w-full min-h-[90vh]">
          <div className="container mx-auto px-4">
            { children }
          </div>
        </div>
    )
}
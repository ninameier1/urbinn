import type { Metadata } from "next";
import { montserrat } from "@fonts/fonts";
import PageHeader from '@components/PageHeader';
import "./globals.css";

export const metadata: Metadata = {
  title: "Urban Innovation",
  description: "Integraal werken aan een gezonde stad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-background m-0">
        <div className="flex flex-col min-h-screen">
          <div className="bg-primary w-full h-16 m-0">
          <PageHeader />
          </div>
          <div className="flex-1">
            <div className="container  max-w-full">
              {children}
            </div>
          </div>
          <footer className="h-32 bg-secondary">
            <div className="container max-w-full py-4">
              Footer
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
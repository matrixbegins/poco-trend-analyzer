import { Header } from "./Header";
import { Breadcrumbs } from "./Breadcrumbs";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="container py-8 flex-1">
        <div className="mb-6">
          <Breadcrumbs />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
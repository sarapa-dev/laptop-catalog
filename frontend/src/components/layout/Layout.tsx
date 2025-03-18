import Header from "./Header";
import Footer from "./Footer";
import { NuqsAdapter } from "nuqs/adapters/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="min-h-[500px]">
        <NuqsAdapter>{children}</NuqsAdapter>
      </main>
      <Footer />
    </div>
  );
};
export default Layout;

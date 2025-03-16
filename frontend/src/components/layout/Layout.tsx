import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="min-h-[500px]">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;

import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header.tsx";
import Footer from "@/components/common/Footer.tsx";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

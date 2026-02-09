import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const PublicLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;

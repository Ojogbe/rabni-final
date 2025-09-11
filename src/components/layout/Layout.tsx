import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // Import Outlet

interface LayoutProps {
  children: ReactNode;
}

export default function Layout() { // Removed children from props
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet /> {/* Render Outlet for nested routes */}
      </main>
      <Footer />
    </div>
  );
}
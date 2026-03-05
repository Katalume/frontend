"use client";

import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";

interface MainLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function MainLayout({
  title,
  subtitle,
  children,
  headerSlot,
  selectedCategory: _selectedCategory,
  onCategoryChange: _onCategoryChange,
}: MainLayoutProps) {
  void _selectedCategory;
  void _onCategoryChange;
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-zinc-100">
      <Navbar title={title} subtitle={subtitle} onLogout={handleLogout} />
      <main className="mx-auto w-full max-w-[1580px] px-3 pb-10 pt-20 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {headerSlot}
          {children}
        </div>
      </main>
    </div>
  );
}

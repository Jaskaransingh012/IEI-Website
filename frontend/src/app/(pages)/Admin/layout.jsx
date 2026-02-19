"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/Admin/Dashboard" },
    { name: "Events", href: "/Admin/Events" },
    { name: "History", href: "/Admin/History" },
    { name: "Settings", href: "/Admin/Settings" },
  ];

  return (
    <div className="min-h-screen flex bg-white text-neutral-900">
      
      {/* Sidebar */}
      <aside className="w-[280px] shrink-0 border-r border-neutral-200 bg-white">
        <div className="h-full px-6 py-8 flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight mb-10">
            Mockr
          </h1>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative px-3 py-2 rounded-lg text-sm transition
                    ${active 
                      ? "bg-neutral-900 text-white shadow-sm" 
                      : "hover:bg-neutral-100"}
                  `}
                >
                  <span className="relative z-10">
                    {item.name}
                  </span>

                  {/* subtle hand-drawn underline feel */}
                  {!active && (
                    <span className="absolute left-3 right-3 bottom-1 h-[1.5px] bg-neutral-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 opacity-40" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-neutral-200 text-xs text-neutral-500">
            AI Interview Practice
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-neutral-50/50">
        <div className="min-h-screen p-10">
          <div className="rounded-2xl bg-white border border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-8 min-h-[calc(100vh-5rem)]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

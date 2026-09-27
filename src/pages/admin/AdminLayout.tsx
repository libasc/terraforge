"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const NAV = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect
          x="1"
          y="1"
          width="6"
          height="6"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="9"
          y="1"
          width="6"
          height="6"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="1"
          y="9"
          width="6"
          height="6"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="9"
          y="9"
          width="6"
          height="6"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    to: "/admin/gallery",
    label: "Gallery",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect
          x="1"
          y="1"
          width="14"
          height="14"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle
          cx="5.5"
          cy="5.5"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M1 11l4-4 3 3 3-4 4 5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: "/admin/work",
    label: "Our Work",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM5 4V3a1 1 0 011-1h4a1 1 0 011 1v1"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    to: "/admin/enquiries",
    label: "Enquiries",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect
          x="1"
          y="2"
          width="14"
          height="12"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-tf-charcoal flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-7 h-7 bg-tf-bronze flex items-center justify-center flex-shrink-0">
              <span className="font-display font-black text-white text-xs">
                TF
              </span>
            </div>
            <div>
              <span className="font-display font-700 text-white text-sm tracking-widest uppercase leading-none">
                Terraforge
              </span>
              <p className="text-tf-mid text-[8px] tracking-[0.2em] uppercase">
                Admin Dashboard
              </p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.12em] uppercase font-medium transition-colors duration-150 rounded-none ${
                (
                  item.to === "/admin"
                    ? pathname === "/admin"
                    : pathname?.startsWith(item.to)
                )
                  ? "bg-tf-bronze text-white"
                  : "text-tf-mid hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-6 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.12em] uppercase font-medium text-tf-mid hover:text-white hover:bg-white/5 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 8h12M2 8l5-5M2 8l5 5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            View Website
          </Link>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.12em] uppercase font-medium text-tf-stone hover:text-red-400 hover:bg-white/5 transition-colors duration-150 w-full"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 2h4v12h-4M7 5l-4 3 4 3M2 8h8"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M2 5h16M2 10h16M2 15h16"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <p className="text-xs font-medium text-gray-700">Admin User</p>
              <p className="text-[10px] text-gray-400 tracking-wide">
                admin@terraforge.com
              </p>
            </div>
            <div className="w-8 h-8 bg-tf-bronze flex items-center justify-center">
              <span className="font-display font-black text-white text-xs">
                A
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

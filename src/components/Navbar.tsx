import React, { useState } from "react";
import { LayoutDashboard, Menu, X, ArrowUpRight, MessageSquare } from "lucide-react";

interface NavbarProps {
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
  onOpenChat: () => void;
}

export default function Navbar({ isAdminView, setIsAdminView, onOpenChat }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Layanan Digital", href: "#layanan" },
    { name: "Solusi Bisnis", href: "#solusi" },
    { name: "Konsultasi", href: "#konsultasi" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Brand Telkomsel */}
          <div className="flex items-center space-x-2">
            <a href="#" onClick={() => setIsAdminView(false)} className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#E21E26] flex items-center justify-center text-white font-extrabold text-sm shadow-md animate-pulse">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-gray-900 text-lg leading-none">
                  Telkomsel
                </span>
                <span className="text-[10px] font-semibold text-[#E21E26] uppercase tracking-widest leading-none mt-0.5">
                  Enterprise
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAdminView &&
              navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-[#E21E26] transition-colors"
                >
                  {link.name}
                </a>
              ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Chat Trigger */}
            {!isAdminView && (
              <button
                onClick={onOpenChat}
                className="flex items-center space-x-1 text-sm font-semibold text-gray-700 hover:text-[#E21E26] transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
              >
                <MessageSquare className="w-4 h-4 text-[#E21E26]" />
                <span>Chatbot AI</span>
              </button>
            )}

            {/* Admin Toggle Button */}
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                isAdminView
                  ? "bg-gray-900 text-white border-transparent hover:bg-gray-800"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-900"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{isAdminView ? "Kembali ke Beranda" : "Portal Admin"}</span>
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
              title="Portal Admin"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-3 px-4 space-y-3">
          {!isAdminView ? (
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-gray-600 hover:text-[#E21E26] hover:bg-gray-50 px-3 py-2 rounded-lg"
              >
                {link.name}
              </a>
            ))
          ) : (
            <span className="block text-sm font-semibold text-gray-400 px-3 py-2 uppercase tracking-wider">
              Mode Portal Admin Aktif
            </span>
          )}

          <hr className="border-gray-100" />

          <div className="flex flex-col space-y-2 pt-1">
            {!isAdminView && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenChat();
                }}
                className="flex items-center justify-center space-x-2 w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-2.5 rounded-lg text-sm border border-gray-200"
              >
                <MessageSquare className="w-4 h-4 text-[#E21E26]" />
                <span>Tanya digiBiz Assistant</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsOpen(false);
                setIsAdminView(!isAdminView);
              }}
              className={`flex items-center justify-center space-x-2 w-full text-center font-bold py-2.5 rounded-lg text-sm ${
                isAdminView
                  ? "bg-red-50 text-[#E21E26] hover:bg-red-100"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{isAdminView ? "Kembali ke Landing Page" : "Masuk Portal Admin"}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

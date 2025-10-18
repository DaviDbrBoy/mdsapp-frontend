"use client";

import { LogOut } from "lucide-react";

export default function Header({ userName, handleLogout }) {
  return (
    <header className="top-0 bg-gray-900/90 backdrop-blur-sm z-10 p-4 border-b border-gray-800 flex items-center justify-between relative">
      <h1 className="text-xl font-bold text-blue-400">@{userName}</h1>
      <span className="absolute left-1/2 -translate-x-1/2 text-white font-bold text-lg">
        Mds App
      </span>
      <button onClick={handleLogout} className="text-gray-400 hover:text-red-500">
        <LogOut size={20} />
      </button>
    </header>
  );
}

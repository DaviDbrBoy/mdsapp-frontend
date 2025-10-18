"use client";
import { useState } from "react";

export default function LoginModal({ handleLogin }) {
  const [inputName, setInputName] = useState("");

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Bem-vindo ao Mds App
        </h2>
        <p className="text-gray-400 mb-6 text-center">
          Para começar, digite seu nome (ex: Davi).
        </p>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin(inputName)}
          maxLength={20}
        />
        <button
          onClick={() => handleLogin(inputName)}
          disabled={!inputName.trim()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full transition duration-200 disabled:opacity-50"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

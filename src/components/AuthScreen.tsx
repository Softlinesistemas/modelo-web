"use client";
import React, { useState } from "react";
import { LoginForm } from "./cadastro/LoginForm";
import { CadastroForm } from "./cadastro/CadastroForm";

export const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<"login" | "cadastro">("login");

  return (
    <div className="relative min-h-screen w-full bg-[#B6D2B7] flex justify-center items-start overflow-hidden">
      {/* Vídeo de fundo só aparece no login */}
      {activeTab === "login" && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
          autoPlay
          loop
          muted
        >
          <source src="/images/video/teste.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      )}

      {/* Container do formulário centralizado */}
      <div
        className={`relative z-10 w-full max-w-md rounded-3xl p-6 mt-16
        ${activeTab === "login" ? "bg-[#B6D2B7] " : "bg-[#B6D2B7]"}`}
      >
        {/* Tabs */}
        <div className="flex rounded-full p-1 mb-6 bg-green-800">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 text-sm uppercase font-semibold py-2 rounded-full 
            ${activeTab === "login" ? "bg-green-500 text-black" : "text-white"}`}
          >
            Acessar
          </button>
          <button
            onClick={() => setActiveTab("cadastro")}
            className={`flex-1 text-sm uppercase font-semibold py-2 rounded-full 
            ${activeTab === "cadastro" ? "bg-green-500 text-black" : "text-white"}`}
          >
            Criar conta
          </button>
        </div>

        {/* Formulário */}
        {activeTab === "login" ? <LoginForm /> : <CadastroForm />}
      </div>
    </div>
  );
};
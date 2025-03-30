"use client";

import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Bienvenido al panel de control de Business OS.</p>
      <p className="mt-4">Utiliza el menú lateral para navegar entre las diferentes secciones.</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Accesos Directos</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/dashboard/tasks" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            Gestión de Tareas
          </Link>
        </div>
      </div>
    </div>
  );
}

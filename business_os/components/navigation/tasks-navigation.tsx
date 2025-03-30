"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Componente que se encarga de la navegación al hacer clic en un elemento de la barra lateral
export default function TasksNavigation() {
  const router = useRouter();
  
  // Función que se ejecuta cuando el componente se monta
  React.useEffect(() => {
    // Buscar todos los elementos con data-key="tasks" en el DOM
    const tasksElements = document.querySelectorAll('[data-key="tasks"]');
    
    // Para cada elemento encontrado, agregar un event listener para el clic
    tasksElements.forEach(element => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        // Navegar a la página de tareas
        router.push("/dashboard/tasks");
      });
    });
    
    // Limpiar los event listeners cuando el componente se desmonta
    return () => {
      tasksElements.forEach(element => {
        element.removeEventListener("click", () => {});
      });
    };
  }, [router]);
  
  // Este componente no renderiza nada visible
  return null;
}

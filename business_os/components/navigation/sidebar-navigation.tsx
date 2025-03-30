"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

// Componente que se encarga de la navegación y selección en la barra lateral
export default function SidebarNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Función que se ejecuta cuando el componente se monta
  React.useEffect(() => {
    // Configurar navegación para Home
    const homeElements = document.querySelectorAll('[data-key="home"]');
    homeElements.forEach(element => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        router.push("/dashboard");
      });
    });
    
    // Configurar navegación para Tasks
    const tasksElements = document.querySelectorAll('[data-key="tasks"]');
    tasksElements.forEach(element => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        router.push("/dashboard/tasks");
      });
    });
    
    // Actualizar la selección visual basada en la ruta actual
    updateSelection(pathname);
    
    // Limpiar los event listeners cuando el componente se desmonta
    return () => {
      homeElements.forEach(element => {
        element.removeEventListener("click", () => {});
      });
      tasksElements.forEach(element => {
        element.removeEventListener("click", () => {});
      });
    };
  }, [router, pathname]);
  
  // Función para actualizar la selección visual en la barra lateral
  const updateSelection = (path: string) => {
    // Quitar selección de todos los elementos
    document.querySelectorAll('[data-selected="true"]').forEach(element => {
      element.setAttribute('data-selected', 'false');
      element.classList.remove('bg-default-100');
    });
    
    // Determinar qué elemento debe estar seleccionado basado en la ruta
    let selectedKey = 'home'; // Por defecto, home está seleccionado
    
    if (path.includes('/tasks')) {
      selectedKey = 'tasks';
    }
    
    // Aplicar selección al elemento correspondiente
    const selectedElement = document.querySelector(`[data-key="${selectedKey}"]`);
    if (selectedElement) {
      selectedElement.setAttribute('data-selected', 'true');
      selectedElement.classList.add('bg-default-100');
    }
  };
  
  // Este componente no renderiza nada visible
  return null;
}

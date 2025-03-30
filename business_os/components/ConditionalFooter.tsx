// Enables client-side functionality
"use client";

// Import the usePathname hook from Next.js navigation
import { usePathname } from "next/navigation";

// Component that conditionally renders a footer based on the current path
export default function ConditionalFooter() {
  // Get the current pathname using the usePathname hook
  const pathname = usePathname();

  // If we're on any path that starts with "/dashboard"
  // Return null (don't render anything)
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  // For all other paths, render the footer
  return (
    // Footer container with border and padding
    <footer className="border-muted-foreground py-4">
      {/* Inner container with full width and padding */}
      <div className="w-full px-4">
        {/* Copyright text centered with muted color */}
        <p className="text-center text-sm text-muted-foreground">
          Andres Marulanda © 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

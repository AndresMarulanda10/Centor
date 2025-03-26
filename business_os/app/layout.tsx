// Import global styles and Next.js types
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx"; // Utility for constructing className strings

// Import custom components and configurations
import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

// Define metadata for the application
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`, // Template for page titles
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

// Define viewport settings including theme color based on color scheme
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Base HTML structure with hydration warning suppressed
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable, // Apply custom font
        )}
      >
        {/* Theme provider wrapper with dark theme default */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* Main layout structure */}
          <div className="relative flex flex-col h-screen">
            {/* Main content area */}
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            {/* Footer area */}
            <footer className="border-muted-foreground py-4">
              <div className="container mx-auto max-w-7xl px-6">
                <p className="text-center text-sm text-muted-foreground">
                  Andres Marulanda © 2025. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

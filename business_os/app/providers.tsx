// Enable client-side rendering
"use client";

// Import necessary types and components
import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
// Import HeroUI provider component
import { HeroUIProvider } from "@heroui/system";
// Import Next.js router hook
import { useRouter } from "next/navigation";
// Import theme provider from next-themes
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Define props interface for the Providers component
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

// Extend @react-types/shared module to include router configuration
declare module "@react-types/shared" {
  interface RouterConfig {
    // Define router options type based on the useRouter push parameter
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

/**
 * Provides theme and routing context to the application components.
 *
 * @component
 * @param {object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be wrapped by the providers
 * @param {object} props.themeProps - Props to be passed to the NextThemesProvider
 * @returns {JSX.Element} A component wrapped with HeroUI and theme providers
 *
 * @example
 * ```tsx
 * <Providers themeProps={{ defaultTheme: 'light' }}>
 *   <App />
 * </Providers>
 * ```
 */
export function Providers({ children, themeProps }: ProvidersProps) {
  // Initialize router instance
  const router = useRouter();

  // Return nested providers
  return (
    // HeroUIProvider with navigation function
    <HeroUIProvider navigate={router.push}>
      {/* Theme provider with optional theme props */}
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}

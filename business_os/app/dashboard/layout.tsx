"use client";

import React from "react";
import { Avatar, Button, ScrollShadow, Spacer } from "@heroui/react";
import SidebarNavigation from "../../components/navigation/sidebar-navigation";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";
import { AcmeIcon } from "@acme";
import { sectionItemsWithTeams } from "@sidebar-items";
import SidebarMenu from "@sidebar";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isHidden, setIsHidden] = React.useState(false);

  return (
    // Main container with flex layout
    <div className="flex h-screen w-full">
      {/* Componente de navegación para la barra lateral */}
      <SidebarNavigation />
      {/* Sidebar container with conditional classes for hiding/showing */}
      <div
        className={cn(
          "relative flex h-screen w-72 max-w-[288px] flex-1 flex-col !border-r-small border-divider p-6 transition-[transform,opacity,margin] duration-250 ease-in-out",
          {
            "-ml-72 -translate-x-72": isHidden, // Apply transform when sidebar is hidden
          },
        )}
      >
        {/* Logo Acme section */}
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
            <AcmeIcon className="text-background" />
          </div>
          <span className="text-small font-bold uppercase">Acme</span>
        </div>
        <Spacer y={8} />

        {/* User profile section */}
        <div className="flex items-center gap-3 px-3">
          <Avatar
            isBordered
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          />
          <div className="flex flex-col">
            <p className="text-small font-medium text-default-600">John Doe</p>
            <p className="text-tiny text-default-400">Product Designer</p>
          </div>
        </div>

        {/* Navigation menu with scroll shadow */}
        <ScrollShadow className="-mr-6 h-full flex-1 py-6 pr-6">
          <SidebarMenu
            defaultSelectedKey="home"
            items={sectionItemsWithTeams}
          />
        </ScrollShadow>
        <Spacer y={8} />

        {/* Bottom action buttons */}
        <div className="mt-auto flex flex-col">
          {/* Logout button */}
          <Button
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <Icon
                className="rotate-180 text-default-500"
                icon="solar:minus-circle-line-duotone"
                width={24}
              />
            }
            variant="light"
          >
            Log Out
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="w-full h-screen flex-1 flex flex-col p-4">
        {/* Header with sidebar toggle */}
        <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={() => setIsHidden(!isHidden)}
          >
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:sidebar-minimalistic-outline"
              width={24}
            />
          </Button>
          <h2 className="text-medium font-medium text-default-700">Overview</h2>
        </header>

        {/* Main content container */}
        <main className="mt-4 flex-1 w-full overflow-visible">
          <div className="flex h-[90%] w-full flex-col gap-4 rounded-medium border-small border-divider" data-component-name="SidebarLayout">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

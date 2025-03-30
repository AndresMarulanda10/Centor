"use client";

import React from "react";
import Link from "next/link";
import { ListboxItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

// Importamos el tipo SidebarItem del archivo sidebar.tsx
import { SidebarItem } from "./sidebar";

// Definimos la interfaz para las props del componente
interface SidebarLinkProps {
  item: SidebarItem;
  isCompact?: boolean;
  iconClassName?: string;
  hideEndContent?: boolean;
}

// Componente personalizado que combina ListboxItem con Link de Next.js
const SidebarLink = ({ item, isCompact, iconClassName, hideEndContent }: SidebarLinkProps) => {
  // Si el elemento tiene un href, usamos Link
  if (item.href) {
    return (
      <Link href={item.href} passHref legacyBehavior>
        <ListboxItem
          {...item}
          key={item.key}
          as="a"
          endContent={
            isCompact || hideEndContent ? null : (item.endContent ?? null)
          }
          startContent={
            isCompact ? null : item.icon ? (
              <Icon
                className={cn(
                  "text-default-500 group-data-[selected=true]:text-foreground",
                  iconClassName
                )}
                icon={item.icon}
                width={24}
              />
            ) : (
              (item.startContent ?? null)
            )
          }
          textValue={item.title}
          title={isCompact ? null : item.title}
        >
          {isCompact && (
            <div className="flex w-full items-center justify-center">
              {item.icon ? (
                <Icon
                  className={cn(
                    "text-default-500 group-data-[selected=true]:text-foreground",
                    iconClassName
                  )}
                  icon={item.icon}
                  width={24}
                />
              ) : (
                (item.startContent ?? null)
              )}
            </div>
          )}
        </ListboxItem>
      </Link>
    );
  }

  // Si no tiene href, usamos el ListboxItem normal
  return (
    <ListboxItem
      {...item}
      key={item.key}
      endContent={
        isCompact || hideEndContent ? null : (item.endContent ?? null)
      }
      startContent={
        isCompact ? null : item.icon ? (
          <Icon
            className={cn(
              "text-default-500 group-data-[selected=true]:text-foreground",
              iconClassName
            )}
            icon={item.icon}
            width={24}
          />
        ) : (
          (item.startContent ?? null)
        )
      }
      textValue={item.title}
      title={isCompact ? null : item.title}
    >
      {isCompact && (
        <div className="flex w-full items-center justify-center">
          {item.icon ? (
            <Icon
              className={cn(
                "text-default-500 group-data-[selected=true]:text-foreground",
                iconClassName
              )}
              icon={item.icon}
              width={24}
            />
          ) : (
            (item.startContent ?? null)
          )}
        </div>
      )}
    </ListboxItem>
  );
};

export default SidebarLink;

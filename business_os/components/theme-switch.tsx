"use client"; // Marks this as a client-side component

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

// Interface defining the props for the ThemeSwitch component
export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

// ThemeSwitch component for toggling between light and dark themes
export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  // Hook to access and modify the current theme
  const { theme, setTheme } = useTheme();
  // Hook to check if we're in server-side rendering
  const isSSR = useIsSSR();

  // Handler for theme toggle
  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  // Initialize switch functionality using useSwitch hook
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light" || isSSR, // Switch is selected in light mode or during SSR
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    // Main switch component wrapper
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      {/* Hidden input for accessibility */}
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {/* Visual switch wrapper */}
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {/* Render sun icon if not selected or during SSR, moon icon otherwise */}
        {!isSelected || isSSR ? (
          <SunFilledIcon size={22} />
        ) : (
          <MoonFilledIcon size={22} />
        )}
      </div>
    </Component>
  );
};

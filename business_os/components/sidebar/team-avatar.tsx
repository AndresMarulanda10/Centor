// Enable client-side functionality
"use client";

// Import necessary types and components
import type { AvatarProps } from "@heroui/react";

import React from "react";
import { Avatar } from "@heroui/react";
import { cn } from "@heroui/react";

// Create a TeamAvatar component using React.forwardRef to enable ref forwarding
const TeamAvatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  // Destructure props and receive ref
  ({ name, className, classNames = {}, ...props }, ref) => (
    <Avatar
      // Spread remaining props
      {...props}
      // Forward the ref
      ref={ref}
      // Configure Avatar classNames using the cn utility
      classNames={{
        ...classNames,
        // Style the base Avatar component
        base: cn(
          "bg-transparent border border-divider",
          classNames?.base,
          className,
        ),
        // Style the name element
        name: cn(
          "text-default-500 text-[0.6rem] font-semibold",
          classNames?.name,
        ),
      }}
      // Custom function to generate initials from the name
      // Takes first letter of first name and first letter of last name
      getInitials={(name) =>
        (name[0] || "") + (name[name.lastIndexOf(" ") + 1] || "").toUpperCase()
      }
      // Pass the name prop
      name={name}
      // Set medium border radius
      radius="md"
      // Set small size
      size="sm"
    />
  ),
);

// Set display name for debugging purposes
TeamAvatar.displayName = "TeamAvatar";

// Export the component
export default TeamAvatar;

// Import the tailwind-variants utility
import { tv } from "tailwind-variants";

// Define the title component styles
export const title = tv({
  // Base styles applied to all instances
  base: "tracking-tight inline font-semibold",
  variants: {
    // Color variants for gradient text
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    // Size variants with responsive designs
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    // Full width option
    fullWidth: {
      true: "w-full block",
    },
  },
  // Default size variant
  defaultVariants: {
    size: "md",
  },
  // Compound variants for gradient text effects
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

// Define the subtitle component styles
export const subtitle = tv({
  // Base styles with responsive width and text size
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    // Full width option
    fullWidth: {
      true: "!w-full",
    },
  },
  // Default to full width
  defaultVariants: {
    fullWidth: true,
  },
});

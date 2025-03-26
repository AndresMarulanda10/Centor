// Enables client-side interactivity
"use client";

// Import required dependencies
import { useState } from "react";
import { Button } from "@heroui/button";

// Counter component definition
export const Counter = () => {
  // Initialize state for count with initial value of 0
  const [count, setCount] = useState(0);

  return (
    // Render a button with full radius
    // When pressed, increment count by 1
    <Button radius="full" onPress={() => setCount(count + 1)}>
      Count is {count}
    </Button>
  );
};

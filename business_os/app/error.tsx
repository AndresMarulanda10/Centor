// Marking this component as a client-side component
"use client";

// Importing the useEffect hook from React
import { useEffect } from "react";

// Error boundary component that handles runtime errors
export default function Error({
  error, // The error object that was thrown
  reset, // Function to reset the error boundary
}: {
  error: Error;
  reset: () => void;
}) {
  // useEffect hook to log the error when component mounts or error changes
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]); // Dependencies array with error object

  // Render the error UI
  return (
    <div>
      {/* Error message header */}
      <h2>Something went wrong!</h2>
      {/* Reset button to attempt recovery */}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

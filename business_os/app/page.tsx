// Import the 'title' utility function from primitives components
import { title } from "@/components/primitives";

// Define and export the Home page component as the default export
export default function Home() {
  return (
    // Create a section with flex layout, centered content and vertical padding
    <section className="flex flex-col items-center justify-center py-8 md:py-10">
      {/* Container div with max width and centered text */}
      <div className="inline-block max-w-xl text-center">
        {/* Render the title text using the imported title style function */}
        <span className={title()}>Home</span>
      </div>
    </section>
  );
}

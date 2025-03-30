// Layout component for the dashboard docs section
export default function DocsLayout({
  children, // React children components to be rendered inside the layout
}: {
  children: React.ReactNode; // Type definition for children prop
}) {
  return (
    // Main section container with flex layout and centered content
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {/* Inner container with max width and centered text */}
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
}

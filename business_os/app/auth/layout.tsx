// Layout component for the authentication pages
export default function AuthLayout({
  children, // React children components to be rendered inside this layout
}: {
  children: React.ReactNode; // Type definition for children prop
}) {
  return (
    // Container div with fixed positioning and flex layout
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      {/* Empty header component */}
      <header />
      {/* Main content area with centering styles */}
      <div className="flex flex-grow items-center justify-center">
        {/* Wrapper for children with max width and center-aligned text */}
        <div className="inline-block max-w-lg text-center">{children}</div>
      </div>
    </div>
  );
}

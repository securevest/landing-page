// Decorative amber dot grid. Sets no background color, so whatever
// background the page already has shows through.
// Rendered once in the root layout so it sits behind the navbar AND the hero.
export const DotBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(223, 168, 83, 0.3) 1.25px, transparent 1.5px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "10px 10px",
      }}
    />
  );
};

import type { ReactNode } from "react";

export const display = "font-(family-name:--font-space-grotesk)";
export const mono = "font-(family-name:--font-ibm-plex-mono)";

export const Section = ({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="w-full px-5 sm:px-10 py-16 sm:py-24 scroll-mt-4 flex flex-col items-center"
  >
    <div className="maxWidth w-full">{children}</div>
  </section>
);

/**
 * The one heading style for every section and page.
 * Use as="h1" for the main heading of a page, h2 (default) for sections.
 * Leave a gap of mt-12 sm:mt-16 before the content that follows.
 */
export const SectionHeading = ({
  title,
  description,
  as: Tag = "h2",
  align = "left",
}: {
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
}) => {
  const center = align === "center";
  return (
    <div className={center ? "text-center" : undefined}>
      <Tag
        className={`${display} max-w-3xl text-[34px] leading-[1.08] font-medium tracking-tighter text-balance sm:text-5xl lg:text-6xl ${
          center ? "mx-auto" : ""
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-sm leading-relaxed text-[#0F2B22]/70 text-pretty sm:text-base ${
            center ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

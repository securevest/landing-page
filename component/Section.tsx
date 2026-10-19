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

export const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="max-w-2xl">
    <h2
      className={`${display} text-[26px] sm:text-[34px] leading-8 sm:leading-10 font-bold tracking-tight text-balance`}
    >
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#0F2B22]/70 text-pretty">
        {description}
      </p>
    )}
  </div>
);

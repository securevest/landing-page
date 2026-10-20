import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { display, Section, SectionHeading } from "./Section";
import { PlanSlug, planList } from "./Savingsdata";

// With two columns on tablets, the third card spans both.
const cardClassName: Partial<Record<PlanSlug, string>> = {
  target: "md:col-span-2 lg:col-span-1",
};

export const SavingsTypes = () => {
  return (
    <Section id="save">
      <SectionHeading
        title="Three ways to save, one app."
        description="Lock your money, keep it flexible, or save toward something specific."
      />

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {planList.map(({ slug, title, description, Icon, theme, Mock }) => (
          <li key={slug} className={`flex ${cardClassName[slug] ?? ""}`}>
            {/* data-cursor turns the custom cursor into a "View" disc here */}
            <Link
              href={`/savings/${slug}`}
              data-cursor="View"
              className={`group relative flex min-h-[500px] w-full flex-col overflow-hidden rounded-3xl p-6 pb-0 transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(15,43,34,0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 sm:pb-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] ${theme.card}`}
            >
              <span
                className={`flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none ${theme.chip}`}
              >
                <Icon size={26} aria-hidden="true" />
              </span>

              <h3
                className={`${display} mt-8 text-2xl font-bold leading-8 tracking-tight sm:text-[28px]`}
              >
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#0F2B22]/70">
                {description}
              </p>

              <span className="mt-5 inline-flex items-center gap-1 text-[15px] font-medium">
                <span className="underline-offset-4 group-hover:underline">
                  Learn more
                </span>
                <FiChevronRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>

              {/* Mockup: decorative, cropped by the card edge. The extra
                  bottom margin keeps it covering the edge when it rises. */}
              <div
                aria-hidden="true"
                className="@container mt-auto -mb-8 pt-10"
              >
                <div className="transition-transform duration-500 ease-out group-hover:-translate-y-3 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  <Mock />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};

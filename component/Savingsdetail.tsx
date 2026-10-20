import Link from "next/link";
import { FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { display, mono, Section, SectionHeading } from "./Section";
import { SavingsPlan, planList, CTA_HREF, CTA_LABEL } from "./Savingsdata";

export const SavingsDetail = ({ plan }: { plan: SavingsPlan }) => {
  const { slug, title, headline, description, Icon, theme, Mock } = plan;
  const others = planList.filter((p) => p.slug !== slug);

  return (
    <>
      {/* Hero panel: same tint, chip and cropped phone as the home page card */}
      <Section id={slug}>
        <Link
          href="/#save"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#0F2B22]/70 transition-colors duration-200 hover:text-[#0F2B22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] motion-reduce:transition-none"
        >
          <FiChevronLeft aria-hidden="true" />
          All savings plans
        </Link>

        <div
          className={`mt-6 grid overflow-hidden rounded-3xl lg:grid-cols-2 ${theme.card}`}
        >
          <div className="flex flex-col items-start p-6 sm:p-10 lg:p-14">
            <span
              className={`flex size-14 items-center justify-center rounded-2xl ${theme.chip}`}
            >
              <Icon size={26} aria-hidden="true" />
            </span>

            <p className="mt-8 text-[15px] font-medium text-[#0F2B22]/70">
              {title}
            </p>
            <h1
              className={`${display} mt-2 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl`}
            >
              {headline}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#0F2B22]/70">
              {description}
            </p>

            <Link
              href={CTA_HREF}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F2B22] px-6 py-3 text-[15px] font-medium text-[#F7F3E8] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] motion-reduce:transition-none"
            >
              {CTA_LABEL}
              <FiChevronRight aria-hidden="true" />
            </Link>
          </div>

          {/* Decorative mockup, cropped by the panel's bottom edge */}
          <div
            aria-hidden="true"
            className="@container flex items-end px-6 pt-4 sm:px-10 lg:pt-14"
          >
            <div className="w-full">
              <Mock />
            </div>
          </div>
        </div>
      </Section>

      {/* Key facts */}
      <Section id={`${slug}-facts`}>
        <SectionHeading title={`${title} at a glance.`} />

        <dl className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">
          {plan.facts.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-[#0F2B22]/10 bg-white/80 p-6 backdrop-blur-sm"
            >
              <dt className="text-sm text-[#0F2B22]/65">{label}</dt>
              <dd
                className={`${display} mt-2 text-xl font-semibold tracking-tight`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Steps: numbered because it is a real sequence */}
      <Section id={`${slug}-steps`}>
        <SectionHeading title={`How ${title.toLowerCase()} works.`} />

        <ol className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">
          {plan.steps.map(({ title: stepTitle, description: stepText }, i) => (
            <li
              key={stepTitle}
              className="flex flex-col gap-8 rounded-2xl border border-[#0F2B22]/10 bg-white/80 p-6 backdrop-blur-sm sm:p-7"
            >
              <span
                className={`${mono} flex size-10 items-center justify-center rounded-xl text-sm font-medium tabular-nums ${theme.chip}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-medium">{stepTitle}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#0F2B22]/65">
                  {stepText}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Good to know */}
      <Section id={`${slug}-good-to-know`}>
        <SectionHeading title="Good to know." />

        <ul className="mt-12 flex max-w-2xl flex-col gap-4 sm:mt-16">
          {plan.goodToKnow.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-[#0F2B22]/80"
            >
              <FiCheck
                size={18}
                aria-hidden="true"
                className={`mt-0.5 shrink-0 ${theme.accent}`}
              />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* The other two plans, each in its own colors */}
      <Section id={`${slug}-other-plans`}>
        <SectionHeading title="Other ways to save." />

        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug} className="flex">
              <Link
                href={`/savings/${other.slug}`}
                className={`group flex w-full flex-col rounded-3xl p-6 transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(15,43,34,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 ${other.theme.card}`}
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-2xl ${other.theme.chip}`}
                >
                  <other.Icon size={22} aria-hidden="true" />
                </span>
                <h3
                  className={`${display} mt-6 text-2xl font-bold leading-8 tracking-tight`}
                >
                  {other.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#0F2B22]/70">
                  {other.description}
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
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
};

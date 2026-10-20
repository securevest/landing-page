import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { display, Section } from "./Section";
import { formatDate } from "./blogData";
import {
  BUSINESS_ADDRESS,
  CONTACT_EMAIL,
  OPERATOR,
  type LegalDoc,
} from "./legalData";

const TocList = ({ doc }: { doc: LegalDoc }) => (
  <ol className="flex flex-col gap-2.5 text-sm">
    {doc.sections.map((s, i) => (
      <li key={s.id}>
        <a
          href={`#${s.id}`}
          className="flex gap-2 rounded-sm text-[#0F2B22]/70 transition-colors duration-200 hover:text-[#0F2B22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2B22] motion-reduce:transition-none"
        >
          <span className="tabular-nums text-[#0F2B22]/40">{i + 1}.</span>
          {s.title}
        </a>
      </li>
    ))}
  </ol>
);

export const LegalPage = ({ doc }: { doc: LegalDoc }) => {
  return (
    <Section id={doc.title.toLowerCase().replace(/\s+/g, "-")}>
      <header className="max-w-3xl">
        <h1
          className={`${display} text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl`}
        >
          {doc.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#0F2B22]/70">
          {doc.intro}
        </p>
        <p className="mt-4 text-sm text-[#0F2B22]/65">
          Last updated{" "}
          <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
        </p>
      </header>

      <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[240px_1fr] lg:gap-16">
        {/* Contents: collapsible on small screens, sticky list on large */}
        <div>
          <details className="rounded-2xl border border-[#0F2B22]/10 bg-white/80 p-5 backdrop-blur-sm lg:hidden">
            <summary className="cursor-pointer text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]">
              On this page
            </summary>
            <div className="mt-4">
              <TocList doc={doc} />
            </div>
          </details>

          <nav
            aria-label="On this page"
            className="hidden lg:sticky lg:top-24 lg:block"
          >
            <p className="mb-4 text-sm font-medium">On this page</p>
            <TocList doc={doc} />
          </nav>
        </div>

        <article className="max-w-2xl">
          {doc.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-t border-[#0F2B22]/10 pt-8 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-10"
            >
              <h2
                className={`${display} text-xl font-bold tracking-tight sm:text-2xl`}
              >
                {i + 1}. {section.title}
              </h2>

              {section.blocks.map((block, j) =>
                block.type === "p" ? (
                  <p
                    key={j}
                    className="mt-4 text-[16px] leading-relaxed text-[#0F2B22]/80"
                  >
                    {block.text}
                  </p>
                ) : (
                  <ul
                    key={j}
                    className="mt-4 flex list-disc flex-col gap-2.5 pl-5 text-[16px] leading-relaxed text-[#0F2B22]/80 marker:text-[#9A6200]"
                  >
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}

          <section
            id="contact"
            className="mt-10 scroll-mt-24 border-t border-[#0F2B22]/10 pt-8"
          >
            <h2
              className={`${display} text-xl font-bold tracking-tight sm:text-2xl`}
            >
              Contact us
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#0F2B22]/80">
              Questions, or want to use your rights? Email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2B22]"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            {BUSINESS_ADDRESS && (
              <p className="mt-3 text-[16px] leading-relaxed text-[#0F2B22]/80">
                {OPERATOR}, {BUSINESS_ADDRESS}
              </p>
            )}

            <Link
              href={doc.other.href}
              className="group mt-8 inline-flex items-center gap-1 text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]"
            >
              <span className="underline-offset-4 group-hover:underline">
                Read our {doc.other.label}
              </span>
              <FiChevronRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </section>
        </article>
      </div>
    </Section>
  );
};

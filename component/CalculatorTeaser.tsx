import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { display, mono, Section, SectionHeading } from "./Section";

export const CalculatorTeaser = () => {
  return (
    <Section id="calculator-preview">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            title="See what your savings could earn."
            description="Pick an amount and a lock period, and see your payout before you commit."
          />
          <Link
            href="/calculator"
            className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-semibold sm:text-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]"
          >
            <span className="underline-offset-4 group-hover:underline">
              Open the calculator
            </span>
            <FiArrowRight
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>

        {/* The one memorable element: the payout figure */}
        <div className="rounded-2xl border border-[#0F2B22]/10 bg-white/85 p-6 backdrop-blur-sm sm:p-8">
          <p
            className={`${mono} text-xs font-medium uppercase tracking-[0.14em] text-[#9A6200]`}
          >
            Example
          </p>
          <p className={`${display} mt-3 text-lg font-semibold sm:text-xl`}>
            Lock ₦200,000 for 12 months
          </p>

          <dl className="mt-6 border-t border-[#0F2B22]/10 pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-[#0F2B22]/70">Rate</dt>
              <dd className={`${mono} text-sm font-medium tabular-nums`}>
                12% p.a.
              </dd>
            </div>
            <div className="mt-5">
              <dt className="text-sm text-[#0F2B22]/70">Payout at maturity</dt>
              <dd
                className={`${mono} mt-1 text-4xl font-medium tabular-nums tracking-tight sm:text-5xl`}
              >
                ₦224,000
              </dd>
            </div>
          </dl>

          <p
            className={`${mono} mt-4 inline-block rounded-full bg-[#5BC493]/15 px-3 py-1 text-xs font-medium tabular-nums text-[#1B6B47]`}
          >
            +₦24,000 interest
          </p>
          <p className="mt-5 text-xs leading-relaxed text-[#0F2B22]/60">
            Early withdrawal forfeits interest.
          </p>
        </div>
      </div>
    </Section>
  );
};

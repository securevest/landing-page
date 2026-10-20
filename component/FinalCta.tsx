import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Section, SectionHeading } from "./Section";
import { SecureVestButton } from "./button";

export const FinalCta = () => {
  return (
    <Section id="get-the-app">
      <div className="rounded-3xl border border-[#0F2B22]/10 bg-white/80 px-6 py-12 backdrop-blur-sm sm:px-14 sm:py-16">
        <SectionHeading
          align="center"
          title="Ready to start saving?"
          description="Download SecureVest and choose how you want to save."
        />

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SecureVestButton full fill title="Download the app" />
          <Link
            href="/calculator"
            className="group inline-flex items-center gap-2 rounded-sm text-sm font-semibold sm:text-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]"
          >
            <span className="underline-offset-4 group-hover:underline">
              Try the calculator
            </span>
            <FiArrowRight
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </Section>
  );
};

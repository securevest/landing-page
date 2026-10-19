import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { SecureVestButton } from "./button";
import { Section, display } from "./Section";

export const FinalCta = () => {
  return (
    <Section id="get-the-app">
      <div className="rounded-3xl border border-[#0F2B22]/10 bg-white/80 px-6 py-12 text-center backdrop-blur-sm sm:px-14 sm:py-16">
        <h2
          className={`${display} text-[26px] sm:text-[34px] leading-8 sm:leading-10 font-bold tracking-tight text-balance`}
        >
          Ready to start saving?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm sm:text-base leading-relaxed text-[#0F2B22]/70 text-pretty">
          Download SecureVest and choose how you want to save.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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

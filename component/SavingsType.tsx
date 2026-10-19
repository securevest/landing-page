import Link from "next/link";
import type { IconType } from "react-icons";
import { FiArrowRight, FiLock, FiTarget, FiUnlock } from "react-icons/fi";
import { display, Section, SectionHeading } from "./Section";

type SavingsType = {
  title: string;
  description: string;
  href: string;
  Icon: IconType;
};

// Placeholder copy: confirm the wording for Flexible and Target.
const types: SavingsType[] = [
  {
    title: "Fixed savings",
    description:
      "Lock funds for 6 or 12 months and earn up to 12% p.a., paid in full at maturity.",
    href: "/savings/fixed",
    Icon: FiLock,
  },
  {
    title: "Flexible savings",
    description: "Save at your own pace without locking your money away.",
    href: "/savings/flexible",
    Icon: FiUnlock,
  },
  {
    title: "Target savings",
    description:
      "Name your goal, set an amount, and watch your progress build.",
    href: "/savings/target",
    Icon: FiTarget,
  },
];

export const SavingsTypes = () => {
  return (
    <Section id="save">
      <SectionHeading
        title="Three ways to save, one app."
        description="Lock your money, keep it flexible, or save toward something specific."
      />

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {types.map(({ title, description, href, Icon }) => (
          <li key={href} className="flex">
            <Link
              href={href}
              className="group flex w-full flex-col rounded-2xl border border-[#0F2B22]/10 bg-white/80 p-6 backdrop-blur-sm transition-colors hover:border-[#E8A33D] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2B22]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#E8A33D]/15 text-[#9A6200]">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3
                className={`${display} mt-6 text-xl font-semibold tracking-tight`}
              >
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#0F2B22]/70">
                {description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                Learn more
                <FiArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};

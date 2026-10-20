import type { IconType } from "react-icons";
import { FiShield, FiUserCheck } from "react-icons/fi";
import { display, Section, SectionHeading } from "./Section";

const points: { title: string; description: string; Icon: IconType }[] = [
  {
    title: "CBN-licensed partner",
    description:
      "We work with a partner licensed by the Central Bank of Nigeria (CBN).",
    Icon: FiShield,
  },
  {
    title: "Verified accounts",
    description: "Every account is verified with a NIN or BVN.",
    Icon: FiUserCheck,
  },
];

export const Trust = () => {
  return (
    <Section id="trust">
      <SectionHeading title="Built to be trusted with your money." />

      <ul className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2">
        {points.map(({ title, description, Icon }) => (
          <li
            key={title}
            className="flex items-start gap-4 rounded-2xl border border-[#0F2B22]/10 bg-white/80 p-6 backdrop-blur-sm"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5BC493]/15 text-[#1B6B47]">
              <Icon size={22} aria-hidden="true" />
            </span>
            <div>
              <h3 className={`${display} text-lg font-semibold tracking-tight`}>
                {title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#0F2B22]/70">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

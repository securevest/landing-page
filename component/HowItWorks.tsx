import type { IconType } from "react-icons";
import {
  FiCheck,
  FiPlusCircle,
  FiTrendingUp,
  FiUserCheck,
} from "react-icons/fi";
import { Section, SectionHeading, mono } from "./Section";

type Step = {
  title: string;
  description: string;
  details: string[];
  Icon: IconType;
};

// Placeholder copy: confirm each step against the real onboarding flow.
const steps: Step[] = [
  {
    title: "Create and verify your account",
    description:
      "Sign up with your phone number and confirm the code we send, so we know it's really you. Then verify your identity with your NIN or BVN, which the CBN requires to keep every account secure.",
    details: [
      "Your phone number",
      "A code sent to confirm it's you",
      "Your NIN or BVN for identity verification",
    ],
    Icon: FiUserCheck,
  },
  {
    title: "Fund your wallet",
    description:
      "Top up your wallet to get your money into SecureVest. Your wallet is where your balance sits, ready to move into a savings plan whenever you choose, and you can see it as soon as you open the app.",
    details: [
      "Your wallet balance shows on the home screen",
      "Move money into savings when you're ready",
      "Use the same wallet for transfers and bill payments",
    ],
    Icon: FiPlusCircle,
  },
  {
    title: "Start saving",
    description:
      "Choose the plan that fits what you're saving for and decide how much to put in. You'll see your payout and the rules before you confirm, then you can watch your savings grow.",
    details: [
      "Fixed: lock funds for 6 or 12 months",
      "Flexible: save without a lock-in",
      "Target: save toward a goal you name",
    ],
    Icon: FiTrendingUp,
  },
];

export const HowItWorks = () => {
  return (
    <Section id="how-it-works">
      <SectionHeading
        title="From sign-up to saving in three steps."
        description="Getting started is simple: set up and verify your account, add money to your wallet, then pick the savings plan that suits you. No guesswork, and you stay in control of every step."
      />

      {/* Numbered because it is a real sequence */}
      <ol className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">
        {steps.map(({ title, description, details, Icon }, i) => (
          <li
            key={title}
            className="group flex flex-col justify-between gap-10 border border-[#0F2B22]/15 bg-white/70 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-[#0F2B22]/50 hover:bg-white motion-reduce:transition-none sm:p-7"
          >
            <div className="flex items-start justify-between">
              <Icon
                size={30}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-[#9A6200] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
              />
              <span
                className={`${mono} text-sm font-medium tabular-nums text-[#0F2B22]/40 transition-colors duration-200 group-hover:text-[#9A6200]`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#0F2B22]/65">
                {description}
              </p>

              <ul className="mt-5 flex flex-col gap-2.5 border-t border-[#0F2B22]/10 pt-5">
                {details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2.5 text-sm leading-snug text-[#0F2B22]/80"
                  >
                    <FiCheck
                      size={15}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[#9A6200]"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
};

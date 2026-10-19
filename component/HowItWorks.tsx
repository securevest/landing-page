import { Section, SectionHeading, mono, display } from "./Section";

const steps = [
  {
    title: "Create your account",
    description: "Sign up with your phone number and confirm the code we send.",
  },
  {
    title: "Verify your identity",
    description: "Add your NIN or BVN, as required by the CBN.",
  },
  {
    title: "Fund your wallet",
    description: "Top up your wallet so you're ready to save.",
  },
  {
    title: "Start saving",
    description:
      "Choose Fixed, Flexible or Target savings and put your money to work.",
  },
];

export const HowItWorks = () => {
  return (
    <Section id="how-it-works">
      <SectionHeading
        title="How it works"
        description="From sign-up to your first saving, in four steps."
      />

      {/* Numbered because it is a real sequence */}
      <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="border-t border-[#0F2B22]/15 pt-5">
            <span
              className={`${mono} text-sm font-medium tabular-nums text-[#9A6200]`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className={`${display} mt-3 text-lg font-semibold tracking-tight`}
            >
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0F2B22]/70">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
};

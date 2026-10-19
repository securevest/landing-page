import { FiPlus } from "react-icons/fi";
import { Section, SectionHeading } from "./Section";

// Placeholder answers: confirm each one against the real product rules.
const faqs = [
  {
    q: "What types of savings can I choose from?",
    a: "Fixed, Flexible and Target. Fixed locks your money for 6 or 12 months and earns up to 12% p.a. Flexible lets you save without a lock-in. Target helps you save toward a goal you name.",
  },
  {
    q: "How much interest can I earn?",
    a: "Fixed savings earn up to 12% p.a., paid in full at maturity. Use the calculator to see your exact payout before you lock any funds.",
  },
  {
    q: "What happens if I withdraw a Fixed saving early?",
    a: "Early withdrawal forfeits the interest. You'll see your payout and maturity date before you lock your funds.",
  },
  {
    q: "Do I need a NIN or BVN?",
    a: "Yes. We verify every account with your NIN or BVN, as required by the CBN.",
  },
  {
    q: "Is SecureVest licensed?",
    a: "We work with a partner licensed by the Central Bank of Nigeria (CBN).",
  },
];

export const Faqs = () => {
  return (
    <Section id="faqs">
      <SectionHeading
        title="Frequently asked questions"
        description="The quick answers. Still stuck? We'll add a way to reach us soon."
      />

      {/* Native <details>: accessible and keyboard friendly with no JavaScript */}
      <div className="mt-10 max-w-3xl divide-y divide-[#0F2B22]/10 border-y border-[#0F2B22]/10">
        {faqs.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex list-none items-center justify-between gap-4 rounded-sm text-base font-semibold sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] [&::-webkit-details-marker]:hidden">
              {item.q}
              <FiPlus
                aria-hidden="true"
                size={20}
                className="shrink-0 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              />
            </summary>
            <p className="mt-3 pr-8 text-sm leading-relaxed text-[#0F2B22]/70 sm:text-base">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
};

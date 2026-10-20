import type { Metadata } from "next";
import { Section, SectionHeading } from "@/component/Section";
import { Calculator } from "@/component/Calculator";

export const metadata: Metadata = {
  title: "Savings calculator | SecureVest",
  description:
    "Pick an amount and a lock period, and see your payout before you commit.",
};

export default function CalculatorPage() {
  return (
    <Section id="calculator">
      <SectionHeading
        title="See what your savings could earn."
        description="Pick an amount and a lock period, and see your payout before you commit."
      />

      <div className="mt-12 sm:mt-16">
        <Calculator />
      </div>
    </Section>
  );
}

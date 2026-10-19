import { Hero } from "@/component/hero";
import { SavingsTypes } from "@/component/SavingsType";
import { HowItWorks } from "@/component/HowItWorks";
import { CalculatorTeaser } from "@/component/CalculatorTeaser";
import { Trust } from "@/component/Trust";
import { Faqs } from "@/component/Faq";
import { FinalCta } from "@/component/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <SavingsTypes />
      <HowItWorks />
      <CalculatorTeaser />
      <Trust />
      <Faqs />
      <FinalCta />
    </>
  );
}

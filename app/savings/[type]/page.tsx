import { planList, hasPlan, plans } from "@/component/Savingsdata";
import { SavingsDetail } from "@/component/Savingsdetail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ type: string }> };

// The three plans are prebuilt. Any other slug is caught by notFound() below.
export function generateStaticParams() {
  return planList.map((plan) => ({ type: plan.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  if (!hasPlan(type)) return {};

  const plan = plans[type];
  return {
    title: `${plan.title} | SecureVest`,
    description: plan.description,
  };
}

export default async function SavingsPage({ params }: Props) {
  const { type } = await params;
  if (!hasPlan(type)) notFound();

  return <SavingsDetail plan={plans[type]} />;
}

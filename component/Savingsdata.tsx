import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiLock, FiTarget, FiUnlock } from "react-icons/fi";
import { FixedMock, FlexibleMock, TargetMock } from "./Savingsmocks";

export type PlanSlug = "fixed" | "flexible" | "target";

export type SavingsPlan = {
  slug: PlanSlug;
  title: string;
  /** Short line, same as the home page card */
  description: string;
  /** The page's h1 */
  headline: string;
  Icon: IconType;
  /** Full class strings so Tailwind can see them */
  theme: {
    /** Big tinted panel / card background */
    card: string;
    /** Icon chip and number badges */
    chip: string;
    /** Check marks and small highlights */
    accent: string;
  };
  Mock: () => ReactNode;
  facts: { label: string; value: string }[];
  steps: { title: string; description: string }[];
  goodToKnow: string[];
};

// Where "Start saving" should lead (app store page, sign-up, or a home section).
// Placeholder: point this at the real destination.
export const CTA_HREF = "/";
export const CTA_LABEL = "Start saving";

// Placeholder copy: confirm every line against the real product rules,
// especially for Flexible and Target (withdrawals, limits, fees).
export const plans: Record<PlanSlug, SavingsPlan> = {
  fixed: {
    slug: "fixed",
    title: "Fixed savings",
    description:
      "Lock funds for 6 or 12 months and earn up to 12% p.a., paid in full at maturity.",
    headline: "Lock your money away and earn up to 12% p.a.",
    Icon: FiLock,
    theme: {
      card: "bg-[#FCF3E2]",
      chip: "bg-[#0F2B22] text-[#E8A33D]",
      accent: "text-[#9A6200]",
    },
    Mock: FixedMock,
    facts: [
      { label: "Lock period", value: "6 or 12 months" },
      { label: "Returns", value: "Up to 12% p.a." },
      { label: "Payout", value: "In full at maturity" },
    ],
    steps: [
      {
        title: "Choose an amount",
        description:
          "Decide how much to lock away. It comes from your SecureVest wallet.",
      },
      {
        title: "Pick 6 or 12 months",
        description:
          "Choose how long to lock it. You see your payout and the rules before you confirm.",
      },
      {
        title: "Collect at maturity",
        description:
          "When the period ends, your money and your returns are paid out in full.",
      },
    ],
    goodToKnow: [
      "Your money stays locked until the plan matures.",
      "Example: ₦200,000 locked for 12 months pays out ₦224,000. Sample figures, for illustration.",
      "Accounts are identity-verified in the app.",
    ],
  },

  flexible: {
    slug: "flexible",
    title: "Flexible savings",
    description: "Save at your own pace without locking your money away.",
    headline: "Save at your own pace, with no lock-in.",
    Icon: FiUnlock,
    theme: {
      card: "bg-[#F0F4F1]",
      chip: "bg-[#E8A33D] text-[#0F2B22]",
      accent: "text-[#9A6200]",
    },
    Mock: FlexibleMock,
    facts: [
      { label: "Lock period", value: "None" },
      { label: "Pace", value: "Add money when you like" },
      { label: "Wallet", value: "Move money in and out" },
    ],
    steps: [
      {
        title: "Fund your wallet",
        description: "Top up your wallet so your money is ready to move.",
      },
      {
        title: "Move money into savings",
        description: "Put in as much as you want, whenever you're ready.",
      },
      {
        title: "Keep adding",
        description:
          "Add money at your own pace and watch your balance in the app.",
      },
    ],
    goodToKnow: [
      "There is no lock-in period.",
      "Your balance shows in the app as soon as you open it.",
      "Accounts are identity-verified in the app.",
    ],
  },

  target: {
    slug: "target",
    title: "Target savings",
    description:
      "Name your goal, set an amount, and watch your progress build.",
    headline: "Save toward the things you're working for.",
    Icon: FiTarget,
    theme: {
      card: "bg-[#E1F5EA]",
      chip: "bg-[#5BC493] text-[#0F2B22]",
      accent: "text-[#1B6B47]",
    },
    Mock: TargetMock,
    facts: [
      { label: "Goal", value: "You name it" },
      { label: "Amount", value: "You set it" },
      { label: "Progress", value: "Tracked in the app" },
    ],
    steps: [
      {
        title: "Name your goal",
        description: "A new phone, December rent, anything you're saving for.",
      },
      {
        title: "Set the amount",
        description:
          "Decide how much you need so you know what you're aiming for.",
      },
      {
        title: "Add money and track it",
        description:
          "Each goal shows how far along you are, and you can run more than one at a time.",
      },
    ],
    goodToKnow: [
      "You can keep several goals active at once.",
      "Each goal has its own progress bar.",
      "Accounts are identity-verified in the app.",
    ],
  },
};

export const planList = Object.values(plans);

export const hasPlan = (slug: string): slug is PlanSlug =>
  Object.prototype.hasOwnProperty.call(plans, slug);

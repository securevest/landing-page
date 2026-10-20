export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  updated: string;
  intro: string;
  sections: LegalSection[];
  /** Link to the sibling document shown at the bottom */
  other: { label: string; href: string };
};

/* ------------------------------------------------------------------ */
/* Company details. They appear on both pages.                        */
/* ------------------------------------------------------------------ */

// Add the RC number when you have it, e.g. "1234567". Leave "" to hide it.
const RC_NUMBER = "9539627";
// Add the registered business address. Leave "" to hide it.
export const BUSINESS_ADDRESS =
  "SUITE 11, PHASE 1, CORNER SHOP, GWAGWALADA, ABUJA, FCT, NIGERIA";

export const OPERATOR = `SecureVest Limited${RC_NUMBER ? ` (RC ${RC_NUMBER})` : ""}`;
export const CONTACT_EMAIL = "support@securevests.com";

// Update this whenever the text below changes.
const LAST_UPDATED = "2026-10-20";

/* ------------------------------------------------------------------ */
/* DRAFTS: have a Nigerian lawyer review both documents before launch. */
/* Check every statement against what SecureVest really does.         */
/* ------------------------------------------------------------------ */

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  description:
    "What personal data SecureVest collects, why we use it, and the choices you have.",
  updated: LAST_UPDATED,
  intro:
    "This policy explains what personal data SecureVest collects, why we use it, who we share it with, and the choices you have. We handle your data in line with the Nigeria Data Protection Act 2023 (NDPA).",
  other: { label: "Terms of Use", href: "/terms" },
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          type: "p",
          text: `SecureVest is a savings app operated by ${OPERATOR}. We provide our services with a partner bank licensed by the Central Bank of Nigeria (CBN). In this policy, "we" and "us" mean SecureVest, and "you" means anyone who uses our app or website.`,
        },
      ],
    },
    {
      id: "data-we-collect",
      title: "What we collect",
      blocks: [
        { type: "p", text: "We collect the following personal data:" },
        {
          type: "ul",
          items: [
            "Account details: your email address, username and password, and the one-time password (OTP) we send to your email to confirm it's you.",
            "Identity details: when you create or upgrade your account in the app, your BVN, your NIN and face verification. Face verification data is sensitive personal data, so we handle it with extra care and use it only to verify who you are.",
            "Financial activity: your wallet balance, your transactions, and your fixed, flexible and target savings activity.",
            "Device and usage data: your device type, operating system, app version, and how you use the app, so we can keep it working and secure.",
            "Messages: what you send us when you contact support, and our replies.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use your data",
      blocks: [
        {
          type: "ul",
          items: [
            "To create and verify your account, and to upgrade it when you ask.",
            "To provide your wallet and savings plans, process your transactions, and show you your balances and payouts.",
            "To keep your account secure and to detect and prevent fraud.",
            "To send you one-time passwords and push notifications about your account.",
            "To meet our legal and regulatory obligations.",
            "To fix problems and improve the app.",
          ],
        },
      ],
    },
    {
      id: "lawful-basis",
      title: "Why we're allowed to use it",
      blocks: [
        {
          type: "p",
          text: "We use your personal data when it's needed to provide our services to you, when the law requires it, when you've given your consent, or when we have a legitimate interest that doesn't override your rights. Where we rely on your consent, you can withdraw it at any time.",
        },
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      blocks: [
        {
          type: "p",
          text: "We do not sell your personal data. We share it only with:",
        },
        {
          type: "ul",
          items: [
            "Our CBN-licensed partner bank, as needed to provide our services and meet regulatory requirements.",
            "Service providers who help us run SecureVest, including identity verification (KYC), one-time password (OTP), push notification and hosting providers. They may only use your data to help us, and they must protect it.",
            "Regulators, law enforcement or courts, when the law requires us to.",
          ],
        },
      ],
    },
    {
      id: "transfers",
      title: "Transfers outside Nigeria",
      blocks: [
        {
          type: "p",
          text: "Your data may be stored or processed outside Nigeria by our service providers. When that happens, we take steps to make sure your data stays protected, as the NDPA requires.",
        },
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      blocks: [
        {
          type: "p",
          text: "We keep your personal data for as long as you have an account with us and want us to keep it. You can ask us to delete your data at any time.",
        },
        {
          type: "p",
          text: "When you close your account, we return any money you have with us, subject to the rules of any active savings plan. Some records, such as identity and transaction records, we must keep for the period the law requires. We keep those only for as long as the law requires, then delete them or make them anonymous.",
        },
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      blocks: [
        {
          type: "p",
          text: "We use technical and organisational measures to protect your data, such as encrypting data in transit and limiting who can access it. No system is completely secure, so keep your password and OTP private, and tell us straight away if you think someone has used your account.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        { type: "p", text: "Under the NDPA, you have the right to:" },
        {
          type: "ul",
          items: [
            "Ask for a copy of the personal data we hold about you.",
            "Ask us to correct data that is wrong or incomplete.",
            "Ask us to delete your data, where we're not required to keep it.",
            "Ask us to restrict how we use your data, or object to it.",
            "Receive your data in a portable format.",
            "Withdraw your consent at any time.",
          ],
        },
        {
          type: "p",
          text: "To use any of these rights, contact us using the details at the end of this page. You can reach our data protection officer at the same address. If you're not happy with our response, you can complain to the Nigeria Data Protection Commission (NDPC).",
        },
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        {
          type: "p",
          text: "SecureVest is for people aged 18 and over. We don't knowingly collect personal data from children. If you think a child has given us their data, contact us and we'll delete it.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          type: "p",
          text: "Our website doesn't use cookies or analytics tools. If that changes, we'll update this policy.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "We may update this policy from time to time. When we make an important change, we'll tell you in the app or by another suitable means, and we'll update the date at the top of this page.",
        },
      ],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  title: "Terms of Use",
  description:
    "The rules for using the SecureVest app and website, including how our savings plans work.",
  updated: LAST_UPDATED,
  intro:
    "These terms explain how you can use SecureVest and what you can expect from us. Please read them before you create an account.",
  other: { label: "Privacy Policy", href: "/privacy" },
  sections: [
    {
      id: "about",
      title: "About these terms",
      blocks: [
        {
          type: "p",
          text: `These terms apply to your use of the SecureVest app and website. SecureVest is operated by ${OPERATOR}, and our services are provided with a partner bank licensed by the Central Bank of Nigeria (CBN). By creating an account, you agree to these terms. If you don't agree, please don't use SecureVest.`,
        },
      ],
    },
    {
      id: "eligibility",
      title: "Who can use SecureVest",
      blocks: [
        {
          type: "ul",
          items: [
            "You must be at least 18 years old.",
            "You must be able to enter into a binding agreement.",
            "You must give us accurate and current information.",
          ],
        },
      ],
    },
    {
      id: "your-account",
      title: "Your account",
      blocks: [
        {
          type: "p",
          text: "To sign up, you give us your email address, choose a username and password, and confirm the one-time password (OTP) we send to your email.",
        },
        {
          type: "p",
          text: "In the app, you then verify your identity with face verification, your BVN and your NIN. This lets us open a Tier 1 account, and you verify again when you upgrade your account. Different account tiers may come with different limits. We can't open, upgrade or keep an account we're unable to verify.",
        },
        {
          type: "p",
          text: "Keep your password and OTP private, and never share them with anyone, including people who say they work for SecureVest. You're responsible for activity on your account, so tell us straight away if you think someone else has used it.",
        },
      ],
    },
    {
      id: "wallet",
      title: "Your wallet",
      blocks: [
        {
          type: "p",
          text: "Your wallet holds your balance. You can add money to it, move money into a savings plan, and use it for transfers, bill payments and cards.",
        },
      ],
    },
    {
      id: "your-money",
      title: "Where your money is held",
      blocks: [
        {
          type: "p",
          text: "Your money is held with our CBN-licensed partner bank, which provides protection for your deposits.",
        },
      ],
    },
    {
      id: "savings-plans",
      title: "Savings plans",
      blocks: [
        { type: "p", text: "SecureVest offers three types of savings plan:" },
        {
          type: "ul",
          items: [
            "Fixed savings: you lock money for 6 or 12 months and earn up to 12% p.a., paid in full at maturity. Your money stays locked until the plan matures, and early withdrawal forfeits interest.",
            "Flexible savings: you save at your own pace, and you can withdraw your money at any time with no limit.",
            "Target savings: you name a goal, set an amount, and track your progress.",
          ],
        },
        {
          type: "p",
          text: "Before you confirm a plan, we show you the rules that apply to it, including your payout, any interest, and what happens if you withdraw early.",
        },
      ],
    },
    {
      id: "estimates",
      title: "Calculators and examples",
      blocks: [
        {
          type: "p",
          text: "The calculator and the examples on our website and in the app are estimates, for illustration only. The payout shown to you before you confirm a plan is the one that applies.",
        },
      ],
    },
    {
      id: "fees",
      title: "Fees",
      blocks: [
        {
          type: "p",
          text: "Some services may carry fees. We'll show you any fee before you confirm.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "What you must not do",
      blocks: [
        {
          type: "ul",
          items: [
            "Use SecureVest for anything unlawful, including fraud or money laundering.",
            "Give us false information or use someone else's identity or account.",
            "Interfere with the security or normal running of the app or website.",
          ],
        },
      ],
    },
    {
      id: "closing",
      title: "Closing or suspending an account",
      blocks: [
        {
          type: "p",
          text: "You can ask to close your account from within the app. When you do, we return the money in your account to you, subject to the rules of any active savings plan.",
        },
        {
          type: "p",
          text: "We may suspend or close an account when we need to comply with the law, protect you or us from fraud, or because these terms have been broken. Where we're allowed to, we'll tell you why.",
        },
      ],
    },
    {
      id: "complaints",
      title: "Complaints",
      blocks: [
        {
          type: "p",
          text: "If something goes wrong, contact us using the details at the end of this page. We'll look into it and reply to you.",
        },
      ],
    },
    {
      id: "liability",
      title: "Our responsibility",
      blocks: [
        {
          type: "p",
          text: "We provide SecureVest with reasonable care and skill. SecureVest offers savings tools and isn't financial advice. We aren't responsible for losses we couldn't reasonably have predicted, or for delays or failures caused by events outside our control, such as network outages. Nothing in these terms limits any responsibility that the law doesn't allow us to limit.",
        },
      ],
    },
    {
      id: "privacy",
      title: "Your data",
      blocks: [
        {
          type: "p",
          text: "How we collect and use your personal data is explained in our Privacy Policy.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [
        {
          type: "p",
          text: "We may update these terms from time to time. When we make an important change, we'll tell you in the app or by another suitable means. If you keep using SecureVest after a change takes effect, you accept the updated terms.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      blocks: [
        {
          type: "p",
          text: "These terms are governed by the laws of the Federal Republic of Nigeria, and Nigerian courts have jurisdiction, unless the law gives you the right to go elsewhere.",
        },
      ],
    },
  ],
};

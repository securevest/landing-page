import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FiAlertCircle, FiMail, FiShield } from "react-icons/fi";
import { display, Section, SectionHeading } from "@/component/Section";
import { SUPPORT_EMAIL, ContactForm } from "@/component/Contactform";

export const metadata: Metadata = {
  title: "Contact us | SecureVest",
  description:
    "Questions about your account, savings plans or payments? Get in touch with the SecureVest team.",
};

const ways: {
  title: string;
  description: string;
  Icon: IconType;
  action: { label: string; href: string };
}[] = [
  {
    title: "Email support",
    description: "For questions about your account, plans, wallet or payments.",
    Icon: FiMail,
    action: { label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
  },
  {
    title: "Make a complaint",
    description:
      "Unhappy with something? Write to us with the subject “Complaint” and we will look into it.",
    Icon: FiAlertCircle,
    action: {
      label: "Email a complaint",
      href: `mailto:${SUPPORT_EMAIL}?subject=Complaint`,
    },
  },
  {
    title: "Privacy and your data",
    description:
      "Our data protection officer handles requests about your personal data.",
    Icon: FiShield,
    action: { label: "Read the privacy policy", href: "/privacy" },
  },
];

export default function ContactPage() {
  return (
    <Section id="contact">
      <SectionHeading
        title="Talk to the SecureVest team."
        description="Send us a message or email us directly. Tell us what you need and we will point you the right way."
      />

      <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />

        <ul className="flex flex-col gap-4">
          {ways.map(({ title, description, Icon, action }) => (
            <li
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-[#0F2B22]/10 bg-white/80 p-6 backdrop-blur-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5BC493]/15 text-[#1B6B47]">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3
                  className={`${display} text-lg font-semibold tracking-tight`}
                >
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#0F2B22]/70">
                  {description}
                </p>
                {action.href.startsWith("/") ? (
                  <Link
                    href={action.href}
                    className="mt-3 inline-block break-words text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]"
                  >
                    {action.label}
                  </Link>
                ) : (
                  <a
                    href={action.href}
                    className="mt-3 inline-block break-words text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]"
                  >
                    {action.label}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

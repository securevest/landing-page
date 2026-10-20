import { privacyPolicy } from "@/component/legalData";
import { LegalPage } from "@/component/Legalpage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${privacyPolicy.title} | SecureVest`,
  description: privacyPolicy.description,
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}

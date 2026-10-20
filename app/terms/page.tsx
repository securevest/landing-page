import { termsOfUse } from "@/component/legalData";
import { LegalPage } from "@/component/Legalpage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${termsOfUse.title} | SecureVest`,
  description: termsOfUse.description,
};

export default function TermsPage() {
  return <LegalPage doc={termsOfUse} />;
}

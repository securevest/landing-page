import { cacheLife } from "next/cache";
import Link from "next/link";

const columns = [
  {
    title: "Save",
    links: [
      { label: "Fixed savings", href: "/savings/fixed" },
      { label: "Flexible savings", href: "/savings/flexible" },
      { label: "Target savings", href: "/savings/target" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Calculator", href: "/calculator" },
      { label: "FAQs", href: "/#faqs" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
    ],
  },
];

const footerLink =
  "rounded-sm text-sm text-[#0F2B22]/70 transition-colors hover:text-[#0F2B22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]";

// Reading the current date during render blocks prerendering in Next 16, so
// the year is computed inside a cached component. It refreshes about daily.
const CurrentYear = async () => {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
};

export const Footer = () => {
  return (
    <footer className="w-full border-t border-[#0F2B22]/10 px-5 sm:px-10 pt-14 pb-8 flex flex-col items-center">
      <div className="maxWidth w-full">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-(family-name:--font-space-grotesk) text-[24px] font-semibold tracking-tight"
            >
              SecureVest
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[#0F2B22]/70">
              Save with discipline. Spend with ease.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-3"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-sm font-semibold">{col.title}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={footerLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-[#0F2B22]/10 pt-6">
          <p className="text-xs text-[#0F2B22]/60">
            © <CurrentYear /> SecureVest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

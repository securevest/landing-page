"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  FiChevronDown,
  FiLock,
  FiMenu,
  FiTarget,
  FiUnlock,
  FiX,
} from "react-icons/fi";
import { SecureVestButton } from "./button";

type SavingsItem = {
  label: string;
  href: string;
  description: string;
  Icon: IconType;
};

// Placeholder descriptions: confirm the wording for each product.
const savings: SavingsItem[] = [
  {
    label: "Fixed savings",
    href: "/savings/fixed",
    description: "Lock funds for 6 or 12 months and earn up to 12% p.a.",
    Icon: FiLock,
  },
  {
    label: "Flexible savings",
    href: "/savings/flexible",
    description: "Save without a lock-in period.",
    Icon: FiUnlock,
  },
  {
    label: "Target savings",
    href: "/savings/target",
    description: "Name a goal and save toward it.",
    Icon: FiTarget,
  },
];

const links = [
  { label: "FAQs", href: "/#faqs" },
  { label: "Calculator", href: "/calculator" },
];

const logoClass =
  "font-(family-name:--font-space-grotesk) text-[21px] sm:text-[28px] font-semibold tracking-tight";

const linkClass =
  "rounded-sm text-[15px] font-medium text-[#0F2B22]/70 transition-colors hover:text-[#0F2B22] aria-expanded:text-[#0F2B22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]";

const mobileLinkClass =
  "rounded-sm font-(family-name:--font-space-grotesk) text-3xl font-semibold tracking-tight text-[#0F2B22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]";

const SavingsLink = ({
  item,
  onNavigate,
}: {
  item: SavingsItem;
  onNavigate: () => void;
}) => (
  <Link
    href={item.href}
    onClick={onNavigate}
    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#0F2B22]/5 focus-visible:bg-[#0F2B22]/5 focus-visible:outline-2 focus-visible:outline-[#0F2B22]"
  >
    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E8A33D]/15 text-[#9A6200]">
      <item.Icon size={18} aria-hidden="true" />
    </span>
    <span>
      <span className="block text-[15px] font-semibold">{item.label}</span>
      <span className="block text-sm leading-snug text-[#0F2B22]/65">
        {item.description}
      </span>
    </span>
  </Link>
);

export const Navbar = () => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false); // full-page mobile menu
  const [saveOpen, setSaveOpen] = useState(false); // desktop Save dropdown
  const [mobileSaveOpen, setMobileSaveOpen] = useState(true); // Save group inside mobile menu
  const [lastPath, setLastPath] = useState(pathname);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const saveWrapRef = useRef<HTMLLIElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const openedByHover = useRef(false);

  // Close everything when the route changes (including back/forward)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSaveOpen(false);
  }

  const closeAll = () => {
    setMenuOpen(false);
    setSaveOpen(false);
  };

  // Full-page menu: lock page scroll and move focus into it
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // If the window grows to desktop width while the menu is open, close it
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape closes whichever menu is open; clicking outside closes the dropdown
  useEffect(() => {
    if (!menuOpen && !saveOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      } else {
        setSaveOpen(false);
        saveButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (saveOpen && !saveWrapRef.current?.contains(e.target as Node)) {
        setSaveOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen, saveOpen]);

  // Keep Tab inside the full-page menu while it is open
  const onOverlayKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const items = overlayRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Desktop dropdown: opens on mouse hover or click/keyboard. A click on a
  // hover-opened menu keeps it open instead of instantly closing it.
  const onSaveEnter = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse" || saveOpen) return;
    openedByHover.current = true;
    setSaveOpen(true);
  };
  const onSaveLeave = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    openedByHover.current = false;
    setSaveOpen(false);
  };
  const onSaveClick = () => {
    if (openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    setSaveOpen((o) => !o);
  };
  const onSaveBlur = (e: ReactFocusEvent<HTMLLIElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && !saveWrapRef.current?.contains(next)) setSaveOpen(false);
  };

  return (
    <header className="w-full px-5 sm:px-10 py-5 flex flex-col items-center">
      <div className="maxWidth w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-14">
            <Link href="/" className={logoClass}>
              SecureVest
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                <li
                  ref={saveWrapRef}
                  className="relative"
                  onPointerEnter={onSaveEnter}
                  onPointerLeave={onSaveLeave}
                  onBlur={onSaveBlur}
                >
                  <button
                    ref={saveButtonRef}
                    type="button"
                    aria-expanded={saveOpen}
                    aria-controls="save-menu"
                    onClick={onSaveClick}
                    className={`${linkClass} inline-flex items-center gap-1`}
                  >
                    Save
                    <FiChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${saveOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* pt-3 is part of the panel, so the pointer never leaves it
                      while moving from the button to the list */}
                  <div
                    id="save-menu"
                    className={`absolute left-0 top-full z-40 pt-3 transition-[opacity,translate,visibility] duration-150 motion-reduce:transition-none ${
                      saveOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-1 opacity-0"
                    }`}
                  >
                    <ul className="w-80 rounded-2xl border border-[#0F2B22]/10 bg-white p-2 shadow-[0_12px_40px_-12px_rgba(15,43,34,0.25)]">
                      {savings.map((item) => (
                        <li key={item.href}>
                          <SavingsLink item={item} onNavigate={closeAll} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeAll}
                      className={linkClass}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex">
              <SecureVestButton title="Download the app" fill />
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open navigation menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="lg:hidden rounded-sm p-1 text-[#0F2B22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2B22]"
            >
              <FiMenu size={25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-page mobile menu */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onKeyDown={onOverlayKeyDown}
        className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white lg:hidden transition-[opacity,translate,visibility] duration-200 motion-reduce:transition-none ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-10 py-5">
          <Link href="/" onClick={closeAll} className={logoClass}>
            SecureVest
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation menu"
            onClick={() => {
              setMenuOpen(false);
              menuButtonRef.current?.focus();
            }}
            className="rounded-sm p-1 text-[#0F2B22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2B22]"
          >
            <FiX size={25} aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col px-5 sm:px-10 pb-8"
        >
          <ul className="flex flex-col">
            <li className="border-b border-[#0F2B22]/10">
              <button
                type="button"
                aria-expanded={mobileSaveOpen}
                aria-controls="mobile-save-menu"
                onClick={() => setMobileSaveOpen((o) => !o)}
                className={`${mobileLinkClass} flex w-full items-center justify-between py-5`}
              >
                Save
                <FiChevronDown
                  size={24}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${mobileSaveOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileSaveOpen && (
                <ul id="mobile-save-menu" className="flex flex-col gap-1 pb-4">
                  {savings.map((item) => (
                    <li key={item.href}>
                      <SavingsLink item={item} onNavigate={closeAll} />
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {links.map((link) => (
              <li key={link.href} className="border-b border-[#0F2B22]/10">
                <Link
                  href={link.href}
                  onClick={closeAll}
                  className={`${mobileLinkClass} block py-5`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <SecureVestButton full fill title="Download the app" />
          </div>
        </nav>
      </div>
    </header>
  );
};

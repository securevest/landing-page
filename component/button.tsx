import Link from "next/link";
import type { MouseEventHandler } from "react";

type BaseProps = {
  title: string;
  /** Solid background. Without it the button is outlined. */
  fill?: boolean;
  /** Full width on mobile, fits its content from sm up */
  full?: boolean;
  className?: string;
};

type AsLink = BaseProps & {
  /** "/blog", "/#how-it-works", "#how-it-works" or a full https:// URL */
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  type?: never;
  disabled?: never;
};

type AsButton = BaseProps & {
  href?: undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type Props = AsLink | AsButton;

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export const SecureVestButton = (props: Props) => {
  const { title, fill, full, className } = props;

  const classes = [
    "inline-flex items-center justify-center rounded-xl px-7 py-3 font-medium text-accent cursor-pointer",
    "transition-opacity duration-200 hover:opacity-90 motion-reduce:transition-none",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    "disabled:cursor-not-allowed disabled:opacity-50",
    full && "w-full sm:w-max",
    fill ? "bg-secondary" : "border border-accent",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (props.href !== undefined) {
    const { href, onClick } = props;

    // Store pages and other sites: open in a new tab
    if (isExternal(href)) {
      return (
        <a
          href={href}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {title}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }

    // Pages and sections on this site
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {title}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {title}
    </button>
  );
};

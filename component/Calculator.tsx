"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { display, mono } from "./Section";
import { CTA_HREF, CTA_LABEL } from "./Savingsdata";

// Placeholder rates: the 12-month 12% p.a. figure matches the teaser
// (₦200,000 pays ₦224,000). Confirm the 6-month rate before launch.
const PERIODS = [
  { months: 6, rate: 12 },
  { months: 12, rate: 12 },
] as const;

const QUICK_AMOUNTS = [50_000, 100_000, 200_000, 500_000, 1_000_000];
const MAX_DIGITS = 12;

const naira = (n: number) =>
  `₦${n.toLocaleString("en-NG", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

export const Calculator = () => {
  const [raw, setRaw] = useState("200000");
  const [periodIndex, setPeriodIndex] = useState(1);

  const { months, rate } = PERIODS[periodIndex];
  const amount = Number(raw || 0);
  const hasAmount = amount > 0;

  // Simple interest, as in the example on the home page.
  const interest =
    Math.round(amount * (rate / 100) * (months / 12) * 100) / 100;
  const payout = amount + interest;

  return (
    <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-8">
      {/* Inputs */}
      <div className="rounded-2xl border border-[#0F2B22]/10 bg-white/85 p-6 backdrop-blur-sm sm:p-8">
        <label
          htmlFor="calc-amount"
          className={`${display} text-lg font-semibold sm:text-xl`}
        >
          How much do you want to lock?
        </label>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#0F2B22]/15 bg-white px-4 focus-within:border-[#0F2B22] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#0F2B22]">
          <span
            aria-hidden="true"
            className={`${mono} text-2xl font-medium text-[#0F2B22]/60`}
          >
            ₦
          </span>
          <input
            id="calc-amount"
            inputMode="numeric"
            autoComplete="off"
            placeholder="0"
            value={hasAmount ? amount.toLocaleString("en-NG") : ""}
            onChange={(e) =>
              setRaw(e.target.value.replace(/\D/g, "").slice(0, MAX_DIGITS))
            }
            className={`${mono} w-full bg-transparent py-3.5 text-2xl font-medium tabular-nums outline-none placeholder:text-[#0F2B22]/30 sm:text-3xl`}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_AMOUNTS.map((value) => {
            const selected = amount === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => setRaw(String(value))}
                className={`${mono} rounded-full border px-3.5 py-1.5 text-xs font-medium tabular-nums transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2B22] motion-reduce:transition-none ${
                  selected
                    ? "border-[#0F2B22] bg-[#0F2B22] text-[#F7F3E8]"
                    : "border-[#0F2B22]/15 bg-white/80 hover:border-[#0F2B22]/50"
                }`}
              >
                {naira(value)}
              </button>
            );
          })}
        </div>

        <fieldset className="mt-8">
          <legend className={`${display} text-lg font-semibold sm:text-xl`}>
            For how long?
          </legend>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {PERIODS.map((period, i) => (
              <label key={period.months} className="relative block">
                <input
                  type="radio"
                  name="lock-period"
                  value={period.months}
                  checked={periodIndex === i}
                  onChange={() => setPeriodIndex(i)}
                  className="peer sr-only"
                />
                <span className="flex cursor-pointer flex-col rounded-xl border border-[#0F2B22]/15 bg-white/80 px-4 py-3.5 transition-colors duration-200 hover:border-[#0F2B22]/50 peer-checked:border-[#0F2B22] peer-checked:bg-[#0F2B22] peer-checked:text-[#F7F3E8] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0F2B22] motion-reduce:transition-none">
                  <span className="text-base font-medium">
                    {period.months} months
                  </span>
                  <span
                    className={`${mono} mt-0.5 text-xs tabular-nums opacity-70`}
                  >
                    {period.rate}% p.a.
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Result: the payout figure is the one memorable element */}
      <div className="rounded-2xl border border-[#0F2B22]/10 bg-white/85 p-6 backdrop-blur-sm sm:p-8 lg:sticky lg:top-24">
        <p className={`${display} text-lg font-semibold sm:text-xl`}>
          {hasAmount
            ? `Lock ${naira(amount)} for ${months} months`
            : "Enter an amount to see your payout"}
        </p>

        <dl className="mt-6 border-t border-[#0F2B22]/10 pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-[#0F2B22]/70">Rate</dt>
            <dd className={`${mono} text-sm font-medium tabular-nums`}>
              {rate}% p.a.
            </dd>
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <dt className="text-sm text-[#0F2B22]/70">Duration</dt>
            <dd className={`${mono} text-sm font-medium tabular-nums`}>
              {months} months
            </dd>
          </div>
          <div className="mt-5">
            <dt className="text-sm text-[#0F2B22]/70">Payout at maturity</dt>
            <dd
              aria-live="polite"
              className={`${mono} mt-1 break-words text-4xl font-medium tabular-nums tracking-tight sm:text-5xl`}
            >
              {hasAmount ? naira(payout) : "₦0"}
            </dd>
          </div>
        </dl>

        <p
          className={`${mono} mt-4 inline-block rounded-full bg-[#5BC493]/15 px-3 py-1 text-xs font-medium tabular-nums text-[#1B6B47]`}
        >
          +{naira(hasAmount ? interest : 0)} interest
        </p>

        <p className="mt-5 text-xs leading-relaxed text-[#0F2B22]/60">
          Early withdrawal forfeits interest. This is an estimate. You&rsquo;ll
          see your final payout and the rules in the app before you confirm.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#0F2B22]/10 pt-6">
          <Link
            href={CTA_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-[#0F2B22] px-6 py-3 text-[15px] font-medium text-[#F7F3E8] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] motion-reduce:transition-none"
          >
            {CTA_LABEL}
            <FiArrowRight aria-hidden="true" />
          </Link>
          <Link
            href="/savings/fixed"
            className="group inline-flex items-center gap-2 rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] sm:text-base"
          >
            <span className="underline-offset-4 group-hover:underline">
              About fixed savings
            </span>
            <FiArrowRight
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

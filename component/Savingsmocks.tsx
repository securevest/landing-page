import type { ReactNode } from "react";
import { FiChevronLeft, FiEye, FiInfo } from "react-icons/fi";
import { display, mono } from "./Section";

/* ---------- Small pieces used inside the mockups (decorative only) ---------- */

const Phone = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="mx-auto w-[88%] max-w-[300px] rounded-t-[2rem] border-[6px] border-b-0 border-[#0F2B22] bg-white px-3 pt-3.5 pb-12">
    <div className="flex items-center justify-between">
      <span className="grid size-6 place-items-center rounded-full bg-[#0F2B22]/8">
        <FiChevronLeft size={13} aria-hidden="true" />
      </span>
      <span className={`${display} text-xs font-bold`}>{title}</span>
      <FiInfo size={15} aria-hidden="true" className="text-[#0F2B22]/40" />
    </div>
    <div className="mt-3.5">{children}</div>
  </div>
);

const tones = {
  ink: {
    card: "bg-[#0F2B22] text-[#F7F3E8]",
    pill: "bg-[#E8A33D]/20 text-[#E8A33D]",
  },
  gold: {
    card: "bg-[#E8A33D] text-[#0F2B22]",
    pill: "bg-[#0F2B22]/10",
  },
  mint: {
    card: "bg-[#5BC493] text-[#0F2B22]",
    pill: "bg-[#0F2B22]/10",
  },
};

const BalanceCard = ({
  tone,
  pill,
  label,
  amount,
  children,
}: {
  tone: keyof typeof tones;
  pill: string;
  label: string;
  amount: string;
  children?: ReactNode;
}) => (
  <div className={`rounded-2xl p-3.5 ${tones[tone].card}`}>
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-medium ${tones[tone].pill}`}
    >
      {pill}
    </span>
    <p className="mt-4 text-[10px] opacity-70">{label}</p>
    <p
      className={`${mono} mt-0.5 flex items-center gap-1.5 text-[clamp(15px,8cqw,22px)] font-medium tabular-nums`}
    >
      {amount}
      <FiEye size={13} aria-hidden="true" className="shrink-0 opacity-60" />
    </p>
    {children}
  </div>
);

/* ---------- The three mockups. Sample figures, for illustration only. ---------- */

export const FixedMock = () => (
  <Phone title="Fixed savings">
    <BalanceCard
      tone="ink"
      pill="Up to 12% p.a."
      label="Fixed savings balance"
      amount="₦200,000.00"
    >
      <div className="mt-3.5 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white/10 px-2 py-1.5 text-[10px] leading-tight">
          <p className="opacity-70">Payout at maturity</p>
          <p className={`${mono} mt-0.5 text-[11px] font-medium tabular-nums`}>
            ₦224,000
          </p>
        </div>
        <div className="rounded-lg bg-white/10 px-2 py-1.5 text-[10px] leading-tight">
          <p className="opacity-70">Duration</p>
          <p className={`${mono} mt-0.5 text-[11px] font-medium`}>12 months</p>
        </div>
      </div>
    </BalanceCard>
  </Phone>
);

export const FlexibleMock = () => (
  <Phone title="Flexible savings">
    <BalanceCard
      tone="gold"
      pill="Flexible"
      label="Flexible balance"
      amount="₦150,000.00"
    >
      <span className="mt-3.5 block rounded-full bg-[#0F2B22] py-1.5 text-center text-[11px] font-medium text-[#F7F3E8]">
        Add money
      </span>
    </BalanceCard>
  </Phone>
);

const goals = [
  {
    name: "New phone",
    pct: 48,
    saved: "₦120,000",
    target: "₦250,000",
    bar: "bg-[#5BC493]",
  },
  {
    name: "Rent, December",
    pct: 72,
    saved: "₦360,000",
    target: "₦500,000",
    bar: "bg-[#E8A33D]",
  },
];

export const TargetMock = () => (
  <Phone title="Target savings">
    <BalanceCard
      tone="mint"
      pill="2 active goals"
      label="Total savings"
      amount="₦480,000.00"
    />

    <ul className="mt-3.5 flex flex-col gap-3">
      {goals.map((g) => (
        <li key={g.name}>
          <div className="flex items-baseline justify-between text-[11px] font-medium">
            <span>{g.name}</span>
            <span className={`${mono} tabular-nums`}>{g.pct}%</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-[#0F2B22]/10">
            <div
              className={`h-full rounded-full ${g.bar}`}
              style={{ width: `${g.pct}%` }}
            />
          </div>
          <p
            className={`${mono} mt-1 text-[10px] tabular-nums text-[#0F2B22]/60`}
          >
            {g.saved} of {g.target}
          </p>
        </li>
      ))}
    </ul>
  </Phone>
);

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Tone = "cream" | "grey" | "mint";

export type Post = {
  slug: string;
  title: string;
  /** One or two sentences, shown on cards and in search results */
  excerpt: string;
  category: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  tone: Tone;
  /** YouTube id (the part after youtu.be/). Adds a player to the post. */
  videoId?: string;
  body: Block[];
};

// Same tints and chips as the savings cards on the home page.
export const tones: Record<Tone, { card: string; chip: string }> = {
  cream: { card: "bg-[#FCF3E2]", chip: "bg-[#0F2B22] text-[#E8A33D]" },
  grey: { card: "bg-[#F0F4F1]", chip: "bg-[#E8A33D] text-[#0F2B22]" },
  mint: { card: "bg-[#E1F5EA]", chip: "bg-[#5BC493] text-[#0F2B22]" },
};

// Placeholder posts: replace with real articles. To add one, add an object
// here. Its page appears at /blog/<slug> and it joins the list automatically.
const allPosts: Post[] = [
  {
    slug: "how-fixed-savings-works",
    title: "How fixed savings works",
    excerpt:
      "Lock your money for 6 or 12 months and earn up to 12% p.a., paid in full at maturity.",
    category: "Fixed savings",
    date: "2026-10-14",
    tone: "cream",
    videoId: "MZK7Oi3V2J4",
    body: [
      {
        type: "p",
        text: "Fixed savings is for money you don't need to touch for a while. You lock it for 6 or 12 months, and it earns up to 12% p.a., paid in full when the plan matures.",
      },
      { type: "h2", text: "A simple example" },
      {
        type: "p",
        text: "Lock ₦200,000 for 12 months at 12% p.a. and you receive ₦224,000 at maturity: your ₦200,000 plus ₦24,000 in interest. These are sample figures, for illustration.",
      },
      { type: "h2", text: "Before you lock" },
      {
        type: "ul",
        items: [
          "Pick the amount and the 6 or 12 month period. You see your payout and the rules before you confirm.",
          "Your money stays locked until maturity. Early withdrawal forfeits interest.",
          "Not sure what you'd earn? Try the calculator first.",
        ],
      },
    ],
  },
  {
    slug: "fixed-or-flexible",
    title: "Fixed or flexible: which one fits you?",
    excerpt:
      "Both plans live in one app. The difference is how much freedom you want with your money.",
    category: "Flexible savings",
    date: "2026-10-07",
    tone: "grey",
    body: [
      {
        type: "p",
        text: "Fixed and flexible savings both keep your money in one app. What changes is how much freedom you want.",
      },
      { type: "h2", text: "Choose fixed if" },
      {
        type: "ul",
        items: [
          "You won't need the money for 6 or 12 months.",
          "You want to know your payout before you commit.",
        ],
      },
      { type: "h2", text: "Choose flexible if" },
      {
        type: "ul",
        items: [
          "You want to save at your own pace.",
          "You don't want your money locked away.",
        ],
      },
      {
        type: "p",
        text: "You can use both, keeping some money flexible and locking the rest.",
      },
    ],
  },
  {
    slug: "save-toward-a-goal",
    title: "Save toward a goal with target savings",
    excerpt: "Name your goal, set an amount, and watch your progress build.",
    category: "Target savings",
    date: "2026-09-30",
    tone: "mint",
    body: [
      {
        type: "p",
        text: "Target savings is built around something specific you're saving for, like a new phone or December rent.",
      },
      { type: "h2", text: "Set one up" },
      {
        type: "ul",
        items: [
          "Name the goal.",
          "Set the amount you need.",
          "Add money and watch the progress bar fill.",
        ],
      },
      {
        type: "p",
        text: "You can run more than one goal at a time, and each one shows its own progress.",
      },
    ],
  },
  {
    slug: "getting-started",
    title: "Getting started: your first three steps",
    excerpt:
      "From sign-up to saving: verify your account, fund your wallet, and pick a plan.",
    category: "Getting started",
    date: "2026-09-23",
    tone: "cream",
    body: [
      { type: "p", text: "Getting started takes three steps." },
      { type: "h2", text: "1. Create and verify your account" },
      {
        type: "p",
        text: "Sign up with your email, a username and a password, then confirm the one-time password (OTP) we send to your email. In the app, you then verify your identity with face verification, your BVN and your NIN to open a Tier 1 account.",
      },
      { type: "h2", text: "2. Fund your wallet" },
      {
        type: "p",
        text: "Top up your wallet. It's where your balance sits, ready to move into a savings plan whenever you choose.",
      },
      { type: "h2", text: "3. Start saving" },
      {
        type: "p",
        text: "Pick fixed, flexible or target savings and decide how much to put in. You'll see your payout and the rules before you confirm.",
      },
    ],
  },
];

/** Newest first */
export const posts: Post[] = [...allPosts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const readingMinutes = (post: Post) => {
  const text = post.body
    .map((b) => (b.type === "ul" ? b.items.join(" ") : b.text))
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
};

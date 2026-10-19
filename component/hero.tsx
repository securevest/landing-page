import { SecureVestButton } from "./button";

export const Hero = () => {
  return (
    // Fixed at h-100 (400px) on every screen size, content centered inside.
    // No background here: the site-wide background shows through (page stays white).
    <section className="h-100 w-full px-5 sm:px-10 sm:border-b sm:border-[#0F2B22]/10 flex flex-col justify-center items-center">
      <div className="maxWidth w-full">
        <div className="sm:max-w-125 lg:max-w-150">
          <p className="mb-3 sm:mb-5 font-(family-name:--font-ibm-plex-mono) text-xs font-medium uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#9A6200]">
            Fixed, Flexible and Target savings
          </p>

          <h1 className="font-(family-name:--font-space-grotesk) text-[27px] sm:text-[34px] lg:text-[40px] leading-8 sm:leading-10 lg:leading-12 font-bold tracking-tight text-balance">
            Save with discipline. Spend with ease.
          </h1>

          <p className="max-w-md lg:max-w-lg py-5 text-sm sm:text-base leading-relaxed opacity-85 text-pretty">
            Lock savings for up to 12% p.a., set goals that stick, and still
            have instant transfers, cards, and bill payments in the same app.
          </p>

          <div className="flex items-center gap-3 sm:gap-4 flex-col sm:flex-row">
            <SecureVestButton full fill title="Download the app" />
            <SecureVestButton full title="See how it works" />
          </div>
        </div>
      </div>
    </section>
  );
};

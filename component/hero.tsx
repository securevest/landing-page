import { SecureVestButton } from "./button";

export const Hero = () => {
  return (
    // Fixed at h-100 (400px) on every screen size, content centered inside.
    // No background here: the site-wide background shows through (page stays white).
    <section className="h-100 w-full px-5 sm:px-10 flex flex-col justify-center items-center">
      <div className="maxWidth w-full">
        <div className="sm:max-w-xl lg:max-w-2xl">
          <p className="mb-3 sm:mb-5 font-(family-name:--font-ibm-plex-mono) text-xs font-medium uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#9A6200]">
            Fixed, Flexible and Target savings
          </p>

          {/* Same look as SectionHeading (medium weight, tight tracking),
              with smaller sizes so everything fits inside h-100 */}
          <h1 className="font-(family-name:--font-space-grotesk) text-[30px] sm:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-tighter text-balance">
            Save with discipline. Spend with ease.
          </h1>

          <p className="mt-4 max-w-md lg:max-w-lg pb-6 text-sm sm:text-base leading-relaxed text-[#0F2B22]/70 text-pretty">
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

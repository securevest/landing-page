import { SecureVestButton } from "./button";
import { DownloadAppButton } from "./Downloadappbutton";
import { HeroCoins } from "./Herocoins";
import { HeroPiggy } from "./Heropiggy";

// Pick the 3D shape for the hero: "piggy" or "coins"
const SHAPE: "piggy" | "coins" = "piggy";

export const Hero = () => {
  return (
    // Fixed at h-140 (560px) on every screen size, content centered inside.
    // No background here: the site-wide background shows through (page stays white).
    <section className="h-140 w-full px-5 sm:px-10 flex flex-col justify-center items-center">
      <div className="maxWidth relative w-full">
        {/* Decorative 3D shape, shown from large screens up where there is room.
            Sizes keep it well inside the 560px hero height:
            piggy 380x304 (lg), 600x480 (xl); coins 300x300 (lg), 460x460 (xl). */}
        {SHAPE === "piggy" ? (
          <HeroPiggy className="absolute right-0 top-1/2 hidden h-[304px] w-[380px] -translate-y-1/2 lg:block xl:h-[480px] xl:w-[600px]" />
        ) : (
          <HeroCoins className="absolute right-0 top-1/2 hidden h-[300px] w-[300px] -translate-y-1/2 lg:block xl:h-[460px] xl:w-[460px]" />
        )}

        <div className="sm:max-w-xl lg:max-w-2xl">
          <p className="mb-3 sm:mb-5 font-(family-name:--font-ibm-plex-mono) text-xs font-medium uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#9A6200]">
            Fixed, Flexible and Target savings
          </p>

          {/* Same look as SectionHeading (medium weight, tight tracking),
              with smaller sizes so everything fits inside h-140 */}
          <h1 className="font-(family-name:--font-space-grotesk) text-[30px] sm:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-tighter text-balance">
            Save with discipline. Spend with ease.
          </h1>

          <p className="mt-4 max-w-md lg:max-w-lg pb-6 text-sm sm:text-base leading-relaxed text-[#0F2B22]/70 text-pretty">
            Lock savings for up to 12% p.a., set goals that stick, and still
            have instant transfers, cards, and bill payments in the same app.
          </p>

          <div className="flex items-center gap-3 sm:gap-4 flex-col sm:flex-row">
            <DownloadAppButton full fill />
            <SecureVestButton
              full
              title="See how it works"
              href="#how-it-works"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

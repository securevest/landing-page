import { SecureVestButton } from "./button";

export const Hero = () => {
  return (
    <div className="sm:px-10 sm:border-b px-5 w-full h-90 sm:h-100 flex flex-col justify-center items-center">
      <div className="maxWidth w-full">
        <div className="sm:max-w-125">
          <p className="text-[27px] sm:text-[34px] leading-8 sm:leading-10 font-bold">
            Save with discipline. Spend with ease.
          </p>
          <p className="py-7 sm:py-5 text-sm sm:text-md opacity-85">
            Lock savings for up to 12% p.a., set goals that stick, and still
            have instant transfers, cards, and bill payments in the same app.
          </p>
          <div className="flex items-center gap-4 flex-col sm:flex-row">
            <SecureVestButton full fill title="Download the app" />
            <SecureVestButton full title="See how it works" />
          </div>
        </div>
      </div>
    </div>
  );
};

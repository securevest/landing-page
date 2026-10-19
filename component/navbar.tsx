import { SecureVestButton } from "./button";
import { FiMenu } from "react-icons/fi";

export const Navbar = () => {
  return (
    <div className="sm:px-10 px-5 w-full py-5 flex items-center flex-col justify-center">
      <div className="maxWidth w-full flex items-center justify-between">
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-3">
            <p className="text-[21px] sm:text-[28px] font-semibold tracking-tight">
              SecureVest
            </p>
          </div>
          <ul className="lg:flex items-center gap-7 hidden">
            <li className="text-[15px] font-medium cursor-pointer text-gray-700">
              Save
            </li>
            <li className="text-[15px] font-medium cursor-pointer text-gray-700">
              FAQs
            </li>
            <li className="text-[15px] font-medium cursor-pointer text-gray-700">
              Calculator
            </li>
          </ul>
        </div>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="sm:hidden text-gray-900 text-2xl"
        >
          <FiMenu size={25} />
        </button>
        <div className="hidden sm:flex">
          <SecureVestButton title="Download the app" fill />
        </div>
      </div>
    </div>
  );
};

interface Types {
  title: string;
  fill?: boolean;
  full?: boolean;
}

export const SecureVestButton = ({ title, fill, full }: Types) => {
  return (
    <button
      className={`py-3 text-accent ${full && "w-full sm:w-max"} font-medium cursor-pointer rounded-xl px-7 ${fill && "bg-secondary"} ${!fill && "border border-accent"} `}
    >
      {title}
    </button>
  );
};

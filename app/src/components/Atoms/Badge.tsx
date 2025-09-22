import { sc } from "../../lib/sc";
export const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={sc(
        "text-gray-50 bg-gray-800 px-[6px] py-[3px] h-fit text-[12px] border-b-[2px] border-gray-500",
        className,
      )}
    >
      {children}
    </span>
  );
};

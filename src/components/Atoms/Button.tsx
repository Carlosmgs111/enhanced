import { sc } from "../../lib/sc";

export const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  ghost = false,
  className = "",
  onClick = (e: any) => {
    console.log("click");
  },
  children = "",
}: {
  variant?: string;
  size?: string;
  disabled?: boolean;
  ghost?: boolean;
  className?: string;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}) => {
  const variants: Record<string, string> = {
    primary:
      "hover:bg-gray-900 hover:text-white text-gray-900 border-gray-900 bg-gray-50",
    secondary: sc(
      "hover:bg-gray-100 hover:text-gray-900 hover:border-gray-900",
      "text-gray-700 border-gray-400 font-[400] bg-gray-50"
    ),
  };
  const sizes: Record<string, string> = {
    sm: "py-[8px] px-[16px] text-[12px]",
    md: "py-[12px] px-[24px] text-[14px]",
    lg: "py-[16px] px-[32px] text-[16px]",
  };
  const buttonStyle = sc(
    "w-fit h-fit border border-[1px] font-[500]",
    "transition-all duration-200 ease-in-out",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    ghost && "bg-transparent text-gray-900 border-transparent",
    className
  );

  return (
    <button
      className={buttonStyle}
      onClick={(e: any) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  );
};

import { cloneElement, Children, useState } from "react";
import type { ReactNode } from "react";

export default function Corners({
  size = 6,
  children,
  className = "",
  bordersFull = false,
}: {
  size?: number;
  children: ReactNode;
  className?: string;
  bordersFull?: boolean;
}) {
  const [onHover, setOnHover] = useState(false);
  let cornerStyle = {
    width: onHover ? "calc(50%)" : `${size}px`,
    height: onHover ? "calc(50%)" : `${size}px`,
    borderColor: onHover ? "gray" : "",
  };
  if (bordersFull) {
    cornerStyle = {
      ...cornerStyle,
      width: "calc(50% + 1px)",
      height: "calc(50% + 1px)",
    };
  }

  const corners = [
    <span
      key="corner-tl"
      className="absolute -top-[1px] -left-[1px] border-t-[1px] border-l-[1px] border-gray-400 pointer-events-none transition-all duration-200 ease-in-out"
      style={cornerStyle}
    />,
    <span
      key="corner-tr"
      className="absolute -top-[1px] -right-[1px] border-t-[1px] border-r-[1px] border-gray-400 pointer-events-none transition-all duration-200 ease-in-out"
      style={cornerStyle}
    />,
    <span
      key="corner-br"
      className="absolute -bottom-[1px] -right-[1px] border-b-[1px] border-r-[1px] border-gray-400 pointer-events-none transition-all duration-200 ease-in-out"
      style={cornerStyle}
    />,
    <span
      key="corner-bl"
      className="absolute -bottom-[1px] -left-[1px] border-b-[1px] border-l-[1px] border-gray-400 pointer-events-none transition-all duration-200 ease-in-out"
      style={cornerStyle}
    />,
  ];

  return Children.toArray(children as ReactNode).map((child) =>
    cloneElement(
      child as any,
      {
        className: `${
          (child as any).props.className ?? ""
        } relative ${className}`.trim(),
        onMouseEnter: () => {
          (child as any).props.onMouseEnter &&
            (child as any).props.onMouseEnter();
          setOnHover(true);
        },
        onMouseLeave: () => {
          (child as any).props.onMouseLeave &&
            (child as any).props.onMouseLeave();
          setOnHover(false);
        },
        children: [...corners],
      } as any
    )
  );
}

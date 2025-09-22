import { sc } from "../../lib/sc";

export const ProgressBar = ({
  percent = 10,
  basisPercent = 5,
  fillBlock = "■",
  emptyBlock = "□",
  className = "",
}: {
  percent: number;
  basisPercent?: number;
  fillBlock?: string;
  emptyBlock?: string;
  className?: string;
}) => {
  const progress = [];
  for (let i = 0; i < Math.floor(percent / basisPercent); i++) {
    progress.push(fillBlock);
  }
  for (let i = 0; i < Math.floor((100 - percent) / basisPercent); i++) {
    progress.push(emptyBlock);
  }
  return (
    <span className={sc("text-gray-950", className)}>
      [{progress.join("")}]{percent}%
    </span>
  );
};

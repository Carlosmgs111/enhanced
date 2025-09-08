export const ProgressBar = ({
  percent = 10,
  basisPercent = 5,
  fillBlock = "■",
  emptyBlock = "□",
}: {
  percent: number;
  basisPercent?: number;
  fillBlock?: string;
  emptyBlock?: string;
}) => {
  const progress = [];
  for (let i = 0; i < Math.floor(percent / basisPercent); i++) {
    progress.push(fillBlock);
  }
  for (let i = 0; i < Math.floor((100 - percent) / basisPercent); i++) {
    progress.push(emptyBlock);
  }
  return (
    <span className="text-gray-950">
      [ {progress.join("")} ] {percent}%
    </span>
  );
};

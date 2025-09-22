import { sc } from "../../lib/sc";
export const CheckBox = ({ checked = false, children }: { checked?: boolean, children: string }) => {
  const checkboxStyle = sc(
    "w-4 h-4 bg-white border-[1px] border-gray-300 flex items-center justify-center transition-all duration-200",
    "peer-checked:bg-gray-900 peer-checked:after:text-[10px] peer-checked:after:text-white",
    "peer-checked:after:content-['✓'] peer-checked:border-gray-900"
  );

  return (
    <label className="flex items-center space-x-3 cursor-pointer w-fit">
      <div className="relative flex items-center justify-center">
        <input type="checkbox" className="sr-only peer" checked={checked} />
        <div className={checkboxStyle}></div>
      </div>
      <span className="text-gray-700 text-[14px]">
        {children}</span>
    </label>
  );
};

import { useSaveMatrixTools } from "./useSaveMatrixTools";

export const SaveMatrixTools   = ({
  panelActionLabel,
  setPanelActionLabel,
  matrix,
}: {
  panelActionLabel: {
    content: string;
    color: string;
  } | null;
  setPanelActionLabel: (
    panelActionLabel: {
      content: string;
      color: string;
    } | null
  ) => void;
  matrix: number[][];
}) => {
  let panelLabel = "";
  let panelButton = "";
  if (panelActionLabel) {
    [panelLabel, panelButton] = panelActionLabel.content.split(":");
  }
  const { character, setCharacter, downloadMatrix, saveMatrix } =
    useSaveMatrixTools({ matrix, setPanelActionLabel });
  return (
    <div className=" flex flex-col gap-2 items-center border-r border-gray-400 h-fit px-2 relative">
      <div
        onMouseEnter={() =>
          setPanelActionLabel({
            content: "Introduzca el caracter que representa",
            color: "text-yellow-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 text-gray-600 hover:bg-gray-200 outline-none active:bg-gray-200`}
      >
        <input
          onChange={(e) => {
            setCharacter(e.target.value.slice(-1));
          }}
          value={character}
          type="text"
          className={[
            "w-full h-full outline-none border-[1px] border-dashed border-gray-400 text-center font-bold hover:border-gray-600",
            panelButton == "shake"
              ? "border-red-500 animate-headShake duration-500"
              : "",
          ].join(" ")}
        />
      </div>
      <button
        onClick={downloadMatrix}
        onMouseEnter={() =>
          setPanelActionLabel({
            content: "Descargar como archivo",
            color: "text-blue-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 text-gray-600 hover:bg-gray-200 outline-none active:bg-gray-200`}
      >
        ▼
      </button>
      <button
        onClick={saveMatrix}
        onMouseEnter={() =>
          setPanelActionLabel({
            content: "Almacenar",
            color: "text-blue-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 text-gray-600 hover:bg-gray-200 outline-none`}
      >
        ☁
      </button>
      <span
        className={[
          "absolute text-green-500 text-xs top-1/2 -right-[4px] w-0 h-0 items-center whitespace-nowrap text-md transition-all duration-200 ease-in-out",
        ].join(" ")}
      ></span>
    </div>
  );
};

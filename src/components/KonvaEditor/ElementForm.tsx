import type { EditorElement } from "./types";

interface Props {
  selected: EditorElement | null;
  onChange: (el: EditorElement) => void;
}

export const ElementForm = ({ selected, onChange }: Props) => {
  if (!selected) return null;

  const update = (field: string, value: any) => {
    onChange({ ...selected, [field]: value });
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-wrap">
      <h4>Editar elemento</h4>
      <p>ID: {selected.id}</p>
      <label>
        X:
        <input
          type="number"
          value={selected.x}
          onChange={(e) => update("x", Number(e.target.value))}
        />
      </label>
      <label>
        Y:
        <input
          type="number"
          value={selected.y}
          onChange={(e) => update("y", Number(e.target.value))}
        />
      </label>

      {"width" in selected && (
        <label>
          Ancho:
          <input
            type="number"
            value={(selected as any).width}
            onChange={(e) => update("width", Number(e.target.value))}
          />
        </label>
      )}
      {"height" in selected && (
        <label>
          Alto:
          <input
            type="number"
            value={(selected as any).height}
            onChange={(e) => update("height", Number(e.target.value))}
          />
        </label>
      )}
      {"text" in selected && (
        <label>
          Texto:
          <input
            type="text"
            value={(selected as any).text}
            onChange={(e) => update("text", e.target.value)}
          />
        </label>
      )}
    </div>
  );
};

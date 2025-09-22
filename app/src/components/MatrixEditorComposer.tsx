import { MatrixEditor } from "./MatrixEditor";
import { BasicEditionTools } from "./BasicEditionTools";
import { SaveMatrixTools } from "./SaveMatrixTools";
import { AxisControl } from "./AxisControl";

export const MatrixEditorComposer = () => {
  return (
    <MatrixEditor
      editorTools={[BasicEditionTools, SaveMatrixTools, AxisControl]}
    ></MatrixEditor>
  );
};

import { MatrixEditor } from "./MatrixEditor";
import { AxisControl } from "./AxisControl";
import { BasicEditionTools } from "./BasicEditionTools";
import { SaveMatrixTools } from "./SaveMatrixTools";

export const MatrixEditorComposer = () => {
  return (
    <MatrixEditor
      matrixTools={[AxisControl]}
      editorTools={[BasicEditionTools, SaveMatrixTools]}
    ></MatrixEditor>
  );
};

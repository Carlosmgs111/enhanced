import { MatrixEditor } from "./MatrixEditor";
import { AxisControl } from "./AxisControl";
// import { SideDashboard } from "./SideDashboard";

export const MatrixEditorComposer = () => {
  
  return <MatrixEditor plugins={[AxisControl]}></MatrixEditor>;
};

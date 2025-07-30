import { useState, useCallback } from "react";

export const useSideDashboard = ({ matrix, setMatrix }: any) => {
  const [panelActionLabel, setPanelActionLabel] = useState<{
    content: string;
    color: string;
  } | null>(null);

  const toggleModeLabels = {
    toggle: "Intercambia",
    activate: "Activa",
    deactivate: "Desactiva",
  };
  return {
    panelActionLabel,
    setPanelActionLabel,
    toggleModeLabels,
  };
};

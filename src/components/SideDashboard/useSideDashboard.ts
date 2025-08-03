import { useState } from "react";

export const useSideDashboard = () => {
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

import { useState } from "react";
export const useAxisController = () => {
  const [activated, setActivated] = useState(!false);
  return {
    activated,
    setActivated,
  };
};

import { useCallback } from "react";

const UseMessage = () => {
  return useCallback((text) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
};

export default UseMessage;

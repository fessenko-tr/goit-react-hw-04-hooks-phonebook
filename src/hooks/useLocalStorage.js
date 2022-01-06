import { useState, useEffect } from "react";
export default function useLocalStorage() {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem("contacts")) ?? []
  );

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

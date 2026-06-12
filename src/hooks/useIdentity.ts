import { useState } from "react";

const STORAGE_KEY = "chat:displayName";

export function useIdentity() {
  const [name, setName] = useState(() => localStorage.getItem(STORAGE_KEY));

  function saveName(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    localStorage.setItem(STORAGE_KEY, trimmed);
    setName(trimmed);
  }

  return { name, saveName };
}

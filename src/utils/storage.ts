// utils/storage.ts
export function getItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setItem<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

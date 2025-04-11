export const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  }
  return defaultValue;
};

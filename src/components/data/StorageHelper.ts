export const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`❌ Error saving to storage for key "${key}":`, error);
    }
  }
};

export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData !== null) {
        return JSON.parse(savedData) as T;
      }
    } catch (error) {
      console.warn(`⚠️ Failed to parse storage data for key "${key}":`, error);
    }
  }
  return defaultValue;
};

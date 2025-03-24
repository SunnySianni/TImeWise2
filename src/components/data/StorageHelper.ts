export const saveToStorage = (key: string, data: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };
  
  export const loadFromStorage = (key: string, defaultValue: any) => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : defaultValue;
    }
    return defaultValue;
  };
  
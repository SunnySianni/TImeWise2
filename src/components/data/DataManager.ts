import { saveToStorage, loadFromStorage } from "./StorageHelper";

// Only use localStorage on the client side
const isClient = typeof window !== 'undefined';

export const saveSessionHistory = (session: { type: string; duration: number; completed: boolean }) => {
  if (isClient) {
    const history = loadFromStorage("sessionHistory", []);
    history.push(session);
    saveToStorage("sessionHistory", history);
  }
};

export const getSessionHistory = () => {
  if (isClient) {
    return loadFromStorage("sessionHistory", []);
  }
  return []; // Return empty array for server-side rendering
};

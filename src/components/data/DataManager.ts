import { saveToStorage, loadFromStorage } from "./StorageHelper";

export const saveSessionHistory = (session: { type: string; duration: number; completed: boolean }) => {
  const history = loadFromStorage("sessionHistory", []);
  history.push(session);
  saveToStorage("sessionHistory", history);
};

export const getSessionHistory = () => {
  return loadFromStorage("sessionHistory", []);
};

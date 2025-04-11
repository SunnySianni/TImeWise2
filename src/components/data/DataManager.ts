import { saveToStorage, loadFromStorage } from "./StorageHelper";

// Session type definition
interface Session {
  type: string;
  duration: number;
  completed: boolean;
}

// Only use localStorage on the client side
const isClient = typeof window !== "undefined";

// Save session history to localStorage
export const saveSessionHistory = (session: Session) => {
  if (isClient) {
    const history = loadFromStorage<Session[]>("sessionHistory", []);
    history.push(session);
    saveToStorage("sessionHistory", history);
  }
};

// Get session history from localStorage
export const getSessionHistory = (): Session[] => {
  if (isClient) {
    return loadFromStorage<Session[]>("sessionHistory", []);
  }
  return []; // Return empty array for server-side rendering
};

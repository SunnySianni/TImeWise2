import React, { useEffect, useState } from "react";
import { saveSessionHistory, getSessionHistory } from "./DataManager";

const HistoryComponent: React.FC = () => {
  const [history, setHistory] = useState<{ type: string; duration: number; completed: boolean }[]>([]);

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      setHistory(getSessionHistory());
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Session History</h1>
      <ul>
        {history.map((session, index) => (
          <li key={index}>
            {session.type} - {session.duration} seconds -{" "}
            {session.completed ? "Completed" : "Incomplete"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryComponent;

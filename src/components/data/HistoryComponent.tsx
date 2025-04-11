import React, { useEffect, useState } from "react";
import { getSessionHistory } from "../data/DataManager"; // Adjust path as needed

// HistoryComponent
const HistoryComponent: React.FC = () => {
  // State to hold session history
  const [history, setHistory] = useState<{ type: string; duration: number; completed: boolean }[]>([]);

  // Load session history from storage on component mount
  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const sessionHistory = getSessionHistory(); // Fetch history data
      setHistory(sessionHistory); // Set the history state
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Session History</h1>
      <ul>
        {/* Render each session in the history */}
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

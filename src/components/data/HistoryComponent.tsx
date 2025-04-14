'use client';

import React from "react";

// Define the Session type to match the actual data structure, including 'completed' property
export interface Session {
  type: string;
  duration: number; // in minutes now
  completed: boolean;
}

interface HistoryComponentProps {
  sessions: Session[];
}

const HistoryComponent: React.FC<HistoryComponentProps> = ({ sessions }) => {
  return (
    <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Session History</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No sessions recorded yet.</p>
      ) : (
        <ul className="space-y-2">
          {sessions.map((session, index) => (
            <li
              key={index}
              className="p-3 border border-gray-300 dark:border-gray-700 rounded-md flex justify-between items-center"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {session.type} – {session.duration} {session.duration === 1 ? "minute" : "minutes"}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  session.completed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {session.completed ? "Completed" : "Incomplete"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryComponent;

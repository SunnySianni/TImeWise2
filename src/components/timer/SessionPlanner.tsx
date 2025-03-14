import { useState } from 'react';

// Component to plan and manage sessions
const SessionPlanner = () => {
  const [focusDuration, setFocusDuration] = useState<number>(25); // Default: 25 minutes
  const [breakDuration, setBreakDuration] = useState<number>(5); // Default: 5 minutes
  const [goal, setGoal] = useState<string>('');

  // Handle form submission to save session plan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save the session plan (you can extend this to save to a global state or local storage)
    console.log(`Session plan saved: Focus Duration - ${focusDuration} min, Break Duration - ${breakDuration} min, Goal - ${goal}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Session Planner</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="focus-duration" className="text-lg">
            Focus Duration (minutes)
          </label>
          <input
            type="number"
            id="focus-duration"
            value={focusDuration}
            onChange={(e) => setFocusDuration(Number(e.target.value))}
            min="1"
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="break-duration" className="text-lg">
            Break Duration (minutes)
          </label>
          <input
            type="number"
            id="break-duration"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Number(e.target.value))}
            min="1"
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="goal" className="text-lg">
            Session Goal
          </label>
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Save Plan
        </button>
      </form>
    </div>
  );
};

export default SessionPlanner;

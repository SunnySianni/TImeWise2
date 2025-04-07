import React from "react";

interface ProgressProps {
  value: number; // Progress percentage (0-100)
}

const Progress: React.FC<ProgressProps> = ({ value }) => {
  const clampedValue = Math.min(100, Math.max(0, value)); // Ensure value stays between 0 and 100

  return (
    <div
      className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700"
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="bg-blue-600 h-4 rounded-full transition-all duration-300"
        style={{ width: `${clampedValue}%` }}
      ></div>
    </div>
  );
};

export default Progress;

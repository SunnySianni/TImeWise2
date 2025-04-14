'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getFromStorage } from '../data/StorageHelper';

const AnalyticsChart: React.FC = () => {
  const [data, setData] = useState<{ day: string, duration: number }[]>([]);

  useEffect(() => {
    const sessions = getFromStorage<number[]>("sessionData", []);
    const chartData = sessions.map((duration, index) => ({
      day: `Session ${index + 1}`,
      duration
    }));
    setData(chartData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="duration" stroke="#7c3aed" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsChart;

// client/src/components/ChartComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/data');
      setData(res.data);
      setLoading(false);
      createChart(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      alert('Error fetching data');
    }
  };

  const createChart = (data) => {
    const timestamps = data.map((entry) => entry.ts);
    const machineStatus = data.map((entry) => entry.machine_status);

    const ctx = document.getElementById('chart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: 'Machine Status',
            data: machineStatus,
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red for 0
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour', // Adjust according to your data frequency
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div>
      <h2>Chart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <canvas id="chart" width="800" height="400"></canvas>
      )}
    </div>
  );
};

export default ChartComponent;

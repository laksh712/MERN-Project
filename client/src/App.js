// client/src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import ChartComponent from './components/ChartComponent';

const App = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const importData = async () => {
    try {
      setLoading(true);
      await axios.post('/api/data/import', sampleData); // Assuming sampleData is imported from somewhere
      setLoading(false);
      alert('Data imported successfully');
    } catch (error) {
      console.error('Error importing data:', error);
      setLoading(false);
      alert('Error importing data');
    }
  };

  const generateSummary = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/data/summary');
      setSummary(res.data.summary);
      setLoading(false);
    } catch (error) {
      console.error('Error generating summary:', error);
      setLoading(false);
      alert('Error generating summary');
    }
  };

  return (
    <div>
      <h1>MERN Plotter</h1>
      <button onClick={importData} disabled={loading}>
        Import Data
      </button>
      <button onClick={generateSummary} disabled={loading}>
        Generate Summary
      </button>
      <ChartComponent /> {/* Render the ChartComponent */}
      {/* {loading && <p>Loading...</p>}
      {summary && <p>Summary: {summary}</p>} */}
    </div>
  );
};

export default App;

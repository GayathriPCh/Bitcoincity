import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BitcoinVisualization = () => {
  const [blockHeight, setBlockHeight] = useState(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bitcoin'); // Call the backend.
        setBlockHeight(response.data.height); // Save the block height.
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchBitcoinData(); // Fetch the data when the component loads.
  }, []);

  return (
    <div>
      <h1>Bitcoin Block Height</h1>
      {blockHeight ? (
        <p>Current Block Height: {blockHeight}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BitcoinVisualization;

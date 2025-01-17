import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BitcoinVisualization = () => {
  const [blockHeight, setBlockHeight] = useState(null);
  const [latestBlock, setLatestBlock] = useState(null);
  const [mempool, setMempool] = useState(null);
  const [feeEstimates, setFeeEstimates] = useState(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        // Fetch the latest block height using Blockstream API
        const blockHeightResponse = await axios.get(
          'https://blockstream.info/api/blocks/tip/height'
        );
        const height = Number(blockHeightResponse.data); // Ensure it's a number

        // Check if height is a valid number
        if (typeof height === 'number' && !isNaN(height)) {
          setBlockHeight(height);

          // Now fetch the block hash for this block height
          const blockHashResponse = await axios.get(
            `https://blockstream.info/api/block-height/${height}`
          );
          const blockHash = blockHashResponse.data;

          // Fetch block details using the block hash
          const blockDetailsResponse = await axios.get(
            `https://blockstream.info/api/block/${blockHash}`
          );
          setLatestBlock(blockDetailsResponse.data);
        } else {
          console.error('Invalid block height received');
        }

        // Fetch mempool data - Unconfirmed transactions
        const mempoolResponse = await axios.get(
          'https://blockstream.info/api/mempool'
        );
        setMempool(mempoolResponse.data);

        // Fetch fee estimates
        const feeEstimatesResponse = await axios.get(
          'https://blockstream.info/api/fee-estimates'
        );
        setFeeEstimates(feeEstimatesResponse.data);
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchBitcoinData(); // Fetch the data when the component loads.
  }, []);

  return (
    <div>
      <h1>Bitcoin Block Visualization</h1>
      {blockHeight !== null ? (
        <div>
          <p>Current Block Height: {blockHeight}</p>
          {latestBlock && (
            <div>
              <h2>Latest Block Details</h2>
              <p>Block Hash: {latestBlock.id}</p>
              <p>Transactions: {latestBlock.tx_count}</p>
              <p>Block Size: {latestBlock.size} bytes</p>
              <p>Timestamp: {new Date(latestBlock.timestamp * 1000).toLocaleString()}</p>
            </div>
          )}

          {mempool && (
            <div>
                  <h2>Mempool Data</h2>
              <p>Unconfirmed Transactions: {mempool.count}</p>
              <p>Total Mempool Size: {mempool.vsize} bytes</p>
              <p>Total Fees: {mempool.total_fee} satoshis</p>
              <h3>Fee Histogram</h3>
              <ul>
                {mempool.fee_histogram.map((item, index) => (
                  <li key={index}>
                    <strong>{item[0].toFixed(2)} sats/byte:</strong> {item[1]} transactions
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feeEstimates && (
            <div>
              <h2>Transaction Fee Estimates</h2>
              <p>Low Priority: {feeEstimates[0]} sats/byte</p>
              <p>Medium Priority: {feeEstimates[1]} sats/byte</p>
              <p>High Priority: {feeEstimates[2]} sats/byte</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BitcoinVisualization;

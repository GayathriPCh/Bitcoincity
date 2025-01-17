const express = require('express');
const axios = require('axios');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('Bitcoin City Backend');
});

// Real-time data fetching and broadcasting (use Socket.IO)
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
app.get('/api/bitcoin', async (req, res) => {
    try {
      const response = await axios.get('https://blockstream.info/api/blocks/tip/height');
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching Bitcoin data' });
    }
  });
  
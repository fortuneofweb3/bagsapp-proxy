const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Allow requests from your site (update after deployment)
app.use(cors({ origin: '*' })); // Temporary wildcard

// Bearer token from environment variable
const BEARER_TOKEN = process.env.BEARER_TOKEN;

// Token Search (dynamic tokenAddress)
app.get('/proxy/token/find', async (req, res) => {
  try {
    const { tokenAddress } = req.query;
    if (!tokenAddress) return res.status(400).json({ error: 'Missing tokenAddress' });
    const apiUrl = `https://api2.bags.fm/api/v1/bags/token/find?tokenAddress=${encodeURIComponent(tokenAddress)}`;
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Token find error:', error.message);
    res.status(500).json({ error: 'Failed to fetch token data' });
  }
});

// Token Supply (dynamic tokenId)
app.get('/proxy/token/supply', async (req, res) => {
  try {
    const { tokenId } = req.query;
    if (!tokenId) return res.status(400).json({ error: 'Missing tokenId' });
    const apiUrl = `https://api2.bags.fm/api/v1/token/${encodeURIComponent(tokenId)}/supply`;
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Token supply error:', error.message);
    res.status(500).json({ error: 'Failed to fetch supply data' });
  }
});

// Leaderboard
app.get('/proxy/token-launch/leaderboard', async (req, res) => {
  try {
    const apiUrl = `https://api2.bags.fm/api/v1/token-launch/leaderboard`;
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Leaderboard error:', error.message);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

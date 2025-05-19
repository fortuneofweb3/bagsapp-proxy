const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Allow requests from your site (update after deployment)
app.use(cors({ origin: '*' })); // Temporary wildcard

// Bearer token from your request
const BEARER_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZiM2ZhMmJhMDkwOGQwOTlkOGY5ZGNhYzQ0ODYifQ.eyJzdWIiOiI1N2Y3MjFjMi1iYjY4LTQxNDMtODgxZS1lYjE5MjM1Mjg0ZjMiLCJhdWQiOlsiaHR0cHM6Ly9iYWdzLmZtIl0sImlzcyI6Imh0dHBzOi8vYXBpLmJhZ3MuZm0vYXBpL3YxL2F1dGgiLCJpYXQiOjE3NDc2OTAxMjgsInNpZCI6ImMtM2NwbWJfcWFwdEotTVItVWVIUE5GRlVsWU9CTkNSIiwiZXhwIjoxNzUwMTA5MzI4LCJzY29wZSI6InVzZXIifQ.iITWhljCdXqmyMIjkNQgKzvhPL3DLNjTmS6bgt7JpVUPiU1brr7UJlPVXuFcug4ALO8f2x8MKCZvcp61dXIwB9U98ye8LDOS4zM8NtCNlCXbXfqCRZbYLZkOXlxZvRHIVNCi2E9HF_469WNPeh8LUaLhW5Dj9GmVbRXSLtjVqQitIgz0KcOsevFFmnQUaSVN1w56VR3GXyJqbrqaTqMlg1v0YNsrlAMOD8vfNN-hzI2gRFx8RE2aUdK_ADiRYJr7h8OMkOu7NQV52jHiAKJblVQB9 orginal from token 9ahOzbMs7dsfZ8_JP3VmhLziAsnujqiD1uEnj4SaIlDRc33NChmC4tg7l646_g';

// Token Search
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

// Token Supply
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
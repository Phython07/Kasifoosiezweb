import express from 'express';

const app = express();
const PORT = 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Kasi Foodies backend is running!');
});

// ✅ Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working ✅' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

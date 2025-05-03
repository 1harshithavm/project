const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Update your connection to this modern version
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('MongoDB Connection Error:', err.message)); // More detailed error
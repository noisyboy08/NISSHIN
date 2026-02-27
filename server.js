const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  console.log('Contact form submission:', { name, email, message, date: new Date().toISOString() });
  res.json({ success: true, message: 'Thank you! Your message has been received.' });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }
  console.log('Newsletter signup:', { email, date: new Date().toISOString() });
  res.json({ success: true, message: 'You have been subscribed!' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Nisshin server running at http://localhost:${PORT}`);
});

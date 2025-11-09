// api/contact.js
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all required fields' });
  }

  // Here you could:
  // - Save to a database (MongoDB, MySQL, etc.)
  // - Send an email (e.g., using Nodemailer)
  console.log('Contact form received:', { name, email, subject, message });

  return res.status(200).json({ message: 'Form submitted successfully' });
});

module.exports = router;

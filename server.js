// Basic Express server for guestbook
const express = require('express');
const fs = require('fs');
const path = require('path');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const app = express();
const PORT = 3000;
const COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.use(express.json());
app.use(express.static(__dirname));

// Load comments from file
function loadComments() {
    if (!fs.existsSync(COMMENTS_FILE)) return [];
    return JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8'));
}
// Save comments to file
function saveComments(comments) {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

// Example validation and sanitization for a comment submission
function validateAndSanitizeComment(input) {
  // Validate name
  if (!validator.isLength(input.name, { min: 1, max: 50 }) ||
      !/^[\w\s.'-]+$/.test(input.name)) {
    throw new Error('Invalid name');
  }

  // Validate email
  if (!validator.isEmail(input.email)) {
    throw new Error('Invalid email');
  }

  // Validate message
  if (!validator.isLength(input.message, { min: 1, max: 500 })) {
    throw new Error('Invalid message length');
  }

  // Sanitize fields
  const name = validator.escape(input.name.trim());
  const email = validator.normalizeEmail(input.email.trim());
  const message = sanitizeHtml(input.message.trim(), {
    allowedTags: [],
    allowedAttributes: {}
  });

  return { name, email, message };
}

app.get('/comments', (req, res) => {
    res.json(loadComments());
});

app.post('/comments', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).send('All fields required');
    try {
      const { name: validName, email: validEmail, message: validMessage } = validateAndSanitizeComment({ name, email, message });
      const comments = loadComments();
      comments.push({ name: validName, email: validEmail, message: validMessage });
      saveComments(comments);
      res.status(201).json({ ok: true });
    } catch (error) {
      res.status(400).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Guestbook server running at http://localhost:${PORT}`);
});

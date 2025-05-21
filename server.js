// Basic Express server for guestbook
const express = require('express');
const fs = require('fs');
const path = require('path');
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

app.get('/comments', (req, res) => {
    res.json(loadComments());
});

app.post('/comments', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).send('All fields required');
    const comments = loadComments();
    comments.push({ name, email, message });
    saveComments(comments);
    res.status(201).json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Guestbook server running at http://localhost:${PORT}`);
});

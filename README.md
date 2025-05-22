# Guestbook
A basic Guestbook

HTML frontend with JavaScript backend (Node.js/Express) 
secured with validator and sanitize-html

## Description
This is a simple guestbook web application built with JavaScript and Node.js. Visitors can leave their name, email, and a message, which are saved to a JSON file on the server. All submitted comments are displayed for others to read.

## How to Use

### Prerequisites
- Node.js installed on your system

### Setup
1. Install dependencies:
   ```bash
   npm install express validator sanitize-html
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. Open your browser and go to [http://localhost:3000](http://localhost:3000)

### Features
- Submit your name, email, and a message (up to 6 lines)
- All comments are saved to a JSON file and displayed on the page

### File Structure
- `index.html` – Frontend form and comment display
- `server.js` – Backend server logic
- `comments.json` – Stores submitted comments

### Notes
- All fields are required to submit a comment.
- The server must be running for the guestbook to work.

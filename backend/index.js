const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.run('CREATE TABLE users(username text, password text)', (err) => {
    if (err) {
        return console.log(err.message);
    }
});

db.run('CREATE TABLE leaderboard(time text, name text, result text)', (err) => {
    if (err) {
        return console.log(err.message);
    }
});

app.post('/signup', (req, res) => {
    console.log('Signup request received');
    const { username, password } = req.body;
    console.log('Username:', username);
    db.run(`INSERT INTO users(username, password) VALUES(?, ?)`, [username, password], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'User created successfully', userId: this.lastID });
    });
});
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ users: rows });
    });
});
app.post('/login', (req, res) => {
    console.log('Login request received');
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
        return res.status(200).json({ success: true, message: 'Login successful', user: row });
    });
});
app.post('/leaderboard', (req, res) => {
    console.log('Leaderboard update request received');
    const { time, username, result } = req.body;
    db.run(`INSERT INTO leaderboard(time, name, result) VALUES(?, ?, ?)`, [time, username, result], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Result added to leaderboard successfully' });
    });
});
app.get('/leaderboard', (req, res) => {
    db.all(`SELECT name FROM leaderboard ORDER BY time DESC LIMIT 10`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ leaderboard: rows });
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

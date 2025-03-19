const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 5001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // Change if your MySQL has a password
    database: "crop_login",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

app.post('/signup', async (req, res) => {
    console.log('Request body:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Missing field');
        return res.status(400).send('Missing required fields');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        db.query(sql, [email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error" });
            }
            return res.status(200).json({ message: "Signup successful!" });
        });
    } catch (error) {
        console.error("Catch block error:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Express backend - /login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
  
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const user = results[0];
      const dbPassword = user.password.trim(); // Trim just in case
      const inputPassword = password.trim();
  
      bcrypt.compare(inputPassword, dbPassword, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Server error" });
        }
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
        return res.status(200).json({ success: true, message: "Login successful!" });
    });
});
});
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} already in use. Try killing the previous process or use another port.`);
        process.exit(1);
    } else {
        console.log("Something went wrong:", err);
    }
});

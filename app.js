const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 5001;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MySQL Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root", // change this for production
    database: process.env.DB_NAME || "crop_login",
    port: 3306
});

// Test pool connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection pool failed:", err);
    } else {
        console.log("Connected to MySQL database using connection pool");
        connection.release(); // Release immediately after testing
    }
});

// 🔐 Signup Route
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

        // 💡 Use connection from pool
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Connection error:", err);
                return res.status(500).json({ message: "Database connection error" });
            }

            connection.query(sql, [email, hashedPassword], (err, result) => {
                connection.release(); // 🔑 Always release!
                if (err) {
                    console.error("Query error:", err);
                    return res.status(500).json({ message: "Database query error" });
                }
                return res.status(200).json({ message: "Signup successful!" });
            });
        });
    } catch (error) {
        console.error("Catch block error:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// 🔐 Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const query = "SELECT * FROM users WHERE email = ?";

    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Connection error:", err);
            return res.status(500).json({ success: false, message: "Database connection error" });
        }

        connection.query(query, [email], (err, results) => {
            if (err) {
                connection.release();
                console.error("Query error:", err);
                return res.status(500).json({ success: false, message: "Server error" });
            }

            if (results.length === 0) {
                connection.release();
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const user = results[0];
            const dbPassword = user.password.trim();
            const inputPassword = password.trim();

            bcrypt.compare(inputPassword, dbPassword, (err, isMatch) => {
                connection.release();
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
});

// 🚀 Start Server
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

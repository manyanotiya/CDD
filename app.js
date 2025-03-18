const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // Change if your MySQL has a password
    database: "crop_login",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});
// app.post('/signup', async (req, res) => {
//     console.log('Request body:', req.body);
//     const { email, password } = req.body;

//     if (!email || !password) {
//         console.log('Missing field');
//         return res.status(400).send('Missing required fields');
//     }
//     if (!email || !password) return res.status(400).json({ message: "Missing fields" });

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
//         db.query(sql, [email, hashedPassword], (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ message: "Database error" });
//             }
//             return res.status(200).json({ message: "Signup successful!" });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// });

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });






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
app.listen(5000, () => {
        console.log("Server is running on port 5000");
})
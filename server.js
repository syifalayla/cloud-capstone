const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./connect");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const registerHandler = (req, res) => {
  const { name, email, password, gender, birthdate } = req.body;

  // Eksekusi query untuk menyimpan data pengguna ke tabel "user"
  const query = `INSERT INTO user (name, email, password, gender, birthdate) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [name, email, password, gender, birthdate],
    (error, results) => {
      if (error) {
        console.error("Failed to register user:", error);
        res.status(500).json({
          error: true,
          message: "Failed to register user",
        });
      } else {
        const user = {
          userId: results.insertId,
          name,
          email,
          password,
          gender,
          birthdate,
        };
        res.status(201).json({
          message: "Account created",
          data: user,
        });
      }
    }
  );
};

const loginHandler = (req, res) => {
  const { email, password } = req.body;

  // Eksekusi query untuk mencari pengguna berdasarkan email dan password
  const query = `SELECT * FROM user WHERE email = ? AND password = ?`;
  connection.query(query, [email, password], (error, results) => {
    if (error) {
      console.error("Failed to login:", error);
      res.status(500).json({
        error: true,
        message: "Failed to login",
      });
    } else if (results.length === 0) {
      res.status(401).json({
        error: true,
        message: "Invalid credentials",
      });
    } else {
      const { userId, name, mbti, personality, deskripsi } = results[0];
      res.json({
        error: false,
        message: "success",
        loginResult: {
          userId: results.insertId,
          name,
          email,
          mbti,
          personality,
          deskripsi,
        },
      });
    }
  });
};

const testPageHandler = (req, res) => {
  const { name, question } = req.query;
  // Simulate test page logic
  res.json({
    name,
    question,
  });
};

const resultPageHandler = (req, res) => {
  const { mbti, result } = req.body;

  // Eksekusi query untuk menyimpan hasil tes MBTI ke tabel "result"
  const query = `INSERT INTO result (userId, mbti) VALUES (?, ?)`;
  connection.query(query, [req.user.userId, mbti], (error, results) => {
    if (error) {
      console.error("Failed to save test result:", error);
      res.status(500).json({
        error: true,
        message: "Failed to save test result",
      });
    } else {
      res.json({
        message: "Test has finished. Here is your result.",
        data: {
          mbti,
          result,
        },
      });
    }
  });
};

// Routes
app.post("/register", registerHandler);
app.post("/login", loginHandler);
app.get("/test", testPageHandler);
app.post("/result", resultPageHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

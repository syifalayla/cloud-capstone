
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const mbtiRoutes = require('./routes/mbti');

// Use routes
app.use('/auth', authRoutes);
app.use('/mbti', mbtiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

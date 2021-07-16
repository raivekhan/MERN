const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB(); 

app.get("/", (req, res) => {
  res.send("Api running.........");
});

app.use('/auth', require('./routes/api/auth'));
app.use('/posts', require('./routes/api/posts'));
app.use('/profile', require('./routes/api/profile'));
app.use('/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});

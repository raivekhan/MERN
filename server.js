const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

//Init middleware

// This option allows to choose between parsing the URL-encoded data with the querystring library 
// (when false) or the qs library (when true). The “extended” syntax allows for rich objects and arrays
// to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Api running.........");
});

app.use("/auth", require("./routes/api/auth"));
app.use("/posts", require("./routes/api/posts"));
app.use("/profile", require("./routes/api/profile"));
app.use("/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});

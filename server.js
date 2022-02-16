const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes")
const session = require('express-session');

const app = express();
dotenv.config();
app.use(express.json());

app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: false,
  saveUninitialized: true,
  cookie:{secure:true}
}));

//connect to mongodb
const uri = process.env.DB_URL;
mongoose.connect(uri, { useNewURLParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Database connection successfull");
});


app.get("/", (req, res) => {
  res.send("ASDFGHJKL");
});

app.use('/api/user',userRoutes);

// app.get("/api/notes", (req, res) => {
//     res.json(notes);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server started"));

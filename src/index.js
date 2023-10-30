const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const allroute = require("./allroute.json");
const {
  create_book,
  read_book,
  update_book,
  delete_book,
} = require("./books/book_crud");

dotenv.config({ path: "../.env" });
const user = process.env.user;
const password = process.env.password;
const port = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(
    `mongodb+srv://${user}:${password}@cluster0.5nddevh.mongodb.net/BrewApps?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connection established with MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Root route
app.get("/", (req, res) => {
  try {
    res.status(200).send(allroute);
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

// GET all books
app.get("/book", async (req, res) => {
  try {
    const result = await read_book();
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

// GET book by ID
app.get("/book/:id", async (req, res) => {
  try {
    const result = await read_book(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

// Create a book
app.post("/book", async (req, res) => {
  try {
    if (req.body.title && req.body.author && req.body.summary) {
      const result = await create_book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
      });
      res.status(200).send({ msg: result });
    } else {
      res.status(400).send({
        msg: "Missing data. Please provide title, author, and summary in the request body.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

// Update a book by ID
app.put("/book/:id", async (req, res) => {
  try {
    if (req.body.title && req.body.author && req.body.summary) {
      const result = await update_book(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
      });
      res.status(200).send({ msg: result });
    } else {
      res.status(400).send({
        msg: "Missing data. Please provide title, author, and summary in the request body.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

// Delete a book by ID
app.delete("/book/:id", async (req, res) => {
  try {
    const result = await delete_book(req.params.id);
    res.status(200).send({ msg: result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

// Handling 404 for all other routes
app.get("*", (req, res) => {
  res.status(404).send([{ err: "Page not found" }, allroute]);
});
app.put("*", (req, res) => {
  res.status(404).send([{ err: "Page not found" }, allroute]);
});
app.post("*", (req, res) => {
  res.status(404).send([{ err: "Page not found" }, allroute]);
});
app.delete("*", (req, res) => {
  res.status(404).send([{ err: "Page not found" }, allroute]);
});
app.patch("*", (req, res) => {
  res.status(404).send([{ err: "Page not found" }, allroute]);
});

// Start server
app.listen(port, () => {
  console.log("Listening to port", port);
});

const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const path = require("path");

// create post
app.post("/api/posts", (req, res) => {
  res.send("create post");
});

// read post
app.get("/api/posts", (req, res) => {
  //   res.send('{posts: []}');
  res.json({ posts: [] });
});

app.get("/api/posts/:id", (req, res) => {
  console.warn(req.params);
  res.send("read a single post: " + req.params.id);
});

// update post
app.put("/api/posts/:id", (req, res) => {
  res.send("update a single post: " + req.params.id);
});

// delete post
app.delete("/api/posts/:id", (req, res) => {
  res.send("delete a single post: " + req.params.id);
});

// utils
app.get("/api/status", (req, res) => {
  res.json({ status: "Server works!" });
});

app.get("/api/db-backup", (req, res) => {
  res.download("./database/posts.db", "db-backup.db");
});

// serve static angular files
app.use("/", express.static(path.resolve(__dirname, "./Client/dist/Client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./Client/dist/Client/index.html"));
});

app.listen(PORT);

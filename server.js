const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const path = require("path");

const { Datastore } = require("nedb-async-await");

const db = {};
db.products = Datastore({
  filename: path.resolve(path.dirname(""), "./database/products.db"),
  autoload: true,
});

db.users = Datastore({
  filename: path.resolve(path.dirname(""), "./database/users.db"),
  autoload: true,
});

if (process.env.ENV === "dev") {
  const cors = require("cors");
  app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// base64 helpers
const btoa = (string) => Buffer.from(string).toString("base64");
const atob = (encoded) => Buffer.from(encoded, "base64").toString();

authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.replace("Basic ", "");
  let user;
  if (token) {
    user = await db.users.findOne({ token });
  }
  // authorization
  if (!user) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    next();
  }
};

app.post("/api/login", async (req, res) => {
  const { token } = req.body;
  let user;

  if (token) {
    user = await db.users.findOne({ token });
  }

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// create
app.post("/api/products", authMiddleware, async (req, res) => {
  if (req.body.name !== "" && req.body.category !== "") {
    const doc = req.body;

    const product = await db.products.insert(doc);
    res.json(product);
  } else {
    res.status(400).json({ error: "Bad request." });
  }
});

// read
app.get("/api/products", async (req, res) => {
  const products = await db.products.find({});
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await db.products.findOne({ _id: req.params.id });
  res.json(product);
});

// update
app.put("/api/products/:id", authMiddleware, async (req, res) => {
  const doc = req.body;
  const docId = req.params.id;
  const result = await db.products.update({ _id: docId }, doc);
  res.json(result);
});

// delete
app.delete("/api/products/:id", authMiddleware, async (req, res) => {
  const result = await db.products.remove({ _id: req.params.id });
  res.json(result);
});

// utils
app.get("/api/status", (req, res) => {
  res.json({ status: "Server works!" });
});

app.get("/api/db-backup", authMiddleware, (req, res) => {
  res.download("./database/products.db", "db-backup.db");
});

// serve static angular files
app.use("/", express.static(path.resolve(__dirname, "./Client/dist/Client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./Client/dist/Client/index.html"));
});

app.listen(PORT);

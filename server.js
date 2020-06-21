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
db.categories = Datastore({
  filename: path.resolve(path.dirname(""), "./database/categories.db"),
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
  if (
    req.body.name !== "" &&
    req.body.productCategoryId !== "" &&
    req.body.productCategoryId !== null
  ) {
    const doc = req.body;
    const product = await db.products.insert(doc);
    res.json(product);
  } else {
    res.status(400).json({ error: "Missing data" });
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
// dodanie "na sztywno" rekordu do bazy users
/*app.get("/api/add-user", (req, res) => {
  db.users.insert({
    user: "user2",
    token: btoa("user2:asdQWE123"),
  });
  res.send("ok");
});*/

// dodanie "na sztywno" rekordu do bazy categories
/*app.get("/api/add-categories", (req, res) => {
  db.categories.insert({
    productCategory: "nabiał",
  });
  db.categories.insert({
    productCategory: "mięso",
  });
  db.categories.insert({
    productCategory: "wędlina",
  });
  db.categories.insert({
    productCategory: "herbata_kawa",
  });
  db.categories.insert({
    productCategory: "płatki",
  });
  db.categories.insert({
    productCategory: "herbata_kawa",
  });
  db.categories.insert({
    productCategory: "słodycze",
  });
  db.categories.insert({
    productCategory: "oleje_oliwy",
  });
  db.categories.insert({
    productCategory: "warzywa",
  });
  db.categories.insert({
    productCategory: "owoce",
  });

  res.send("ok");
});*/

//*dodanie na sztywno rekordów do bazy basket

//ustawienie na sztywno param. dlaczego nie można zrobić wielu na raz poprzez await db.products.update({}, products);?
/*app.get("/api/db", async (req, res) => {
  // db.categories.insert([{ title: 'Lifestyle' }, { title: 'Development' }]);
  const products = await db.products.find({});

  products.categoryId = "LDHkj8C3VpH5c7IJ";

  // type Post = {
  //   title: string;
  //   shortContent: string;
  //   longContent: string;
  //   categoryId: string;
  //   _id?: string;
  // };

  await db.products.update({}, products);

  res.json(products);
});*/

//wygeneruj tablę z konkretnym id Cat ale tylo z true na tooglu
app.get("/api/category", async (req, res) => {
  const productCategoryId = "jd9RXad31u7wF3Tl";
  const products = await db.products.find({
    $and: [{ productCategoryId: productCategoryId }, { basket: true }],
  });
  res.json(products);
});

//working get categories
app.get("/api/categories", async (req, res) => {
  const categories = await db.categories.find({});
  res.json(categories);
});

// upddate basket on
/*app.get("/api/on", async (req, res) => {
  const products = await db.products.findOne({ _id: "fxgixcc8EFqMpMGX" });

  products.basket = "On";

  await db.products.update({ _id: "fxgixcc8EFqMpMGX" }, products);

  res.json(products);
});*/

/*app.patch("/api/products/:id", authMiddleware, async (req, res) => {
  const doc = req.body;
  const docId = req.params.id;
  const result = await db.products.update(
    { _id: docId },
    { $set: { basket: "On" } }
  );
  res.json(result);
});*/

//working toggler shoplist
app.get("/api/products/:id/toggle-basket", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const product = await db.products.findOne({ _id: id });

    const result = await db.products.update(
      { _id: id },
      { $set: { basket: !product.basket } }
    );

    res.json(result);
  } else {
    res.status(400).json({ message: "Bad request." });
  }
});

//update qty

//json dla shoplisty
app.get("/api/inBasket", async (req, res) => {
  const basket = await db.products.find({ basket: true });

  res.json(basket);
});

//json dla Product List
app.get("/api/noBasket", async (req, res) => {
  const basket = await db.products.find({ basket: false });

  res.json(basket);
});

// working delete
app.delete("/api/products/:id", authMiddleware, async (req, res) => {
  const result = await db.products.remove({ _id: req.params.id });
  res.json(result);
});

// working utils
app.get("/api/status", (req, res) => {
  res.json({ status: "Server works!" });
});

// serve static angular files
app.use("/", express.static(path.resolve(__dirname, "./Client/dist/Client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./Client/dist/Client/index.html"));
});

app.listen(PORT);

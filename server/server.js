const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const cors = require("cors");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
  define: {
    timestamps: false,
  },
});

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());

const User = sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: { error: "Must be a valid address!" },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Route = sequelize.define("route", {
  origin: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  destination: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.hasMany(Route);
Route.hasMany(User);

app.get("/sync", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "tables created" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.get("/routes", async (req, res) => {
  try {
    const routes = await Route.findAll();
    res.status(200).json(routes);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.post("/routes", async (req, res) => {
  try {
    await Route.create(req.body);
    res.status(201).json({ message: "created" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.get("/routes/:rid", async (req, res) => {
  try {
    const route = await Route.findByPk(req.params.rid);
    if (route) {
      res.status(200).json(route);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.delete("/routes/:rid", async (req, res) => {
  try {
    const route = await Route.findByPk(req.params.rid);
    if (route) {
      await route.destroy();
      res.status(201).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const credentials = req.body;
    const user = await User.findOne({
      where: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    if (user) {
      res.status(200).json({ message: "login successful" });
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some server error" });
  }
});

app.post("/users", async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "created" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.get("/users/:uid", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.uid);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.delete("/users/:uid", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.uid);
    if (user) {
      await user.destroy();
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

app.listen(8080);

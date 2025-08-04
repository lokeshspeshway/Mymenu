const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/qr_codes", express.static(path.join(__dirname, "qr_codes")));

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
});

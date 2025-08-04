const fs = require("fs");
const { MenuItem } = require("../models");

exports.createMenuItem = async (req, res) => {
  const { name, description, price } = req.body;
  const file = req.file;
  const imageBuffer = fs.readFileSync(file.path);
  const item = await MenuItem.create({ name, description, price, image: imageBuffer, ownerId: req.user.id });
  fs.unlinkSync(file.path);
  res.json({ message: "Menu item added", id: item.id });
};

exports.getMenu = async (req, res) => {
  const { ownerId } = req.params;
  const items = await MenuItem.findAll({ where: { ownerId } });
  const result = items.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image ? `data:image/png;base64,${item.image.toString("base64")}` : null,
  }));
  res.json(result);
};

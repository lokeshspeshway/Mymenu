const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { MenuItem, Owner } = require("../models");

exports.addItem = async (req, res) => {
  const { name, price, ownerId } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const item = await MenuItem.create({ name, price, ownerId, imageUrl });
  res.json(item);
};

exports.getMenuByOwner = async (req, res) => {
  const { ownerId } = req.params;
  const items = await MenuItem.findAll({ where: { ownerId } });
  res.json(items);
};

exports.generateQR = async (req, res) => {
  const { ownerId } = req.params;
  const link = `http://localhost:3000/owner/${ownerId}`;
  const filePath = path.join(__dirname, `../qr_codes/owner-${ownerId}.png`);
  await QRCode.toFile(filePath, link);
  res.json({ qrUrl: `/qr_codes/owner-${ownerId}.png` });
};

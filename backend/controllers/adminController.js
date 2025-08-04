const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");
const { User } = require("../models");

exports.createOwner = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const owner = await User.create({ username, password: hashed, role: "owner" });

  const qrData = `${process.env.FRONTEND_URL}/menu/${owner.id}`;
  const qrPath = path.join(__dirname, `../uploads/qr-${owner.id}.png`);
  await QRCode.toFile(qrPath, qrData);

  res.json({ message: "Owner created", qrImageUrl: `http://localhost:5000/uploads/qr-${owner.id}.png` });
};

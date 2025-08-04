const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addItem, getMenuByOwner, generateQR } = require("../controllers/menuController");

const upload = multer({ dest: "uploads/" });

router.post("/add", upload.single("image"), addItem);
router.get("/owner/:ownerId", getMenuByOwner);
router.get("/generate-qr/:ownerId", generateQR);

module.exports = router;

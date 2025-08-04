const multer = require("multer");
const upload = multer({ dest: "tempUploads/" });
module.exports = upload;
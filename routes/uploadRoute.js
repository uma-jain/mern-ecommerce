const express =require('express');
const multer = require('multer')
const isAdmin=require("../middlewares/IsAdmin")


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', isAdmin,upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});
module.exports=router;
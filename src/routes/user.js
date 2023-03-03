const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/auth");

const {
  pruebaUser,
  crearUsuario,
  loginUsuario,
  userProfile,
  usersList,
  updateUser,
  uploadImage,
  viewAvatar,
} = require("../controllers/user");

//* Configuracion de subida de archivos con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars/");
  },

  filename: (req, file, cb) => {
    cb(null, `avatar-${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage });

router.get("/prueba-user", auth, pruebaUser);
router.get("/user/profile/:id", auth, userProfile);
router.get("/user/list/:page?", auth, usersList);
router.put("/user", auth, updateUser);
router.post("/user/uploadImage", [auth, uploads.single("file0")], uploadImage);
router.get("/user/avatar/:file", auth, viewAvatar);
router.get("/login", loginUsuario);
router.post("/user", crearUsuario);

module.exports = router;

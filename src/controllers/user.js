const User = require("../models/User");
const pruebaUser = (req, res) => {
  return res.status(200).send({
    msg: "Mensaje desde User Controller",
  });
};

//* REGISTRO DE USUARIOS
const crearUsuario = (req, res) => {
  //* DATOS DEL REQUEST
  const datos = req.body;

  //* COMPROBAR QUE LLEGAN LOS DATOS OBLIGATORIOS
  if (!datos.name || !datos.email || !datos.password || !datos.nick) {
    return res.status(400).json({
      status: "error",
      msg: "Faltan datos por enviar",
    });
  }
  //* CREAR INSTANCIA DE USUARIO
  const user = new User(datos);
  //* COMPROBAR DATOS DUPLICADOS
  User.find({
    $or: [
      { email: user.email.toLowerCase() },
      { nick: user.nick.toLowerCase() },
    ],
  }).exec((error, users) => {
    if (error) {
      return res.status(500).json({
        status: "error",
        msg: "Error en la consulta",
      });
    }
    if (users && users.length >= 1) {
      return res.status(400).json({
        status: "error",
        msg: "Los Datos ingresados ya se encuentran registrados",
      });
    }
    //* CIFRAR CONTRASEÑA

    //* GUARDAR USUARIO EN LA DB

    //* RESULTADO
    return res.status(200).json({
      status: "ok",
      msg: "Registro de usuarios",
      user,
    });
  });
};

module.exports = {
  pruebaUser,
  crearUsuario,
};

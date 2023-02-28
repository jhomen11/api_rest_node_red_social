const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoosePagination = require('mongoose-pagination')
const { generarToken } = require("../services/jwt");

const pruebaUser = (req, res) => {
  return res.status(200).send({
    msg: "Mensaje desde User Controller",
    user: req.user,
  });
};

//* REGISTRO DE USUARIOS
const crearUsuario = async (req, res) => {
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
  }).exec(async (error, users) => {
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
    const pwd = await bcrypt.hash(user.password, 10);
    user.password = pwd;

    //* GUARDAR USUARIO EN LA DB
    user.save((error, savedUser) => {
      if (error || !savedUser) {
        return res.status(500).json({
          status: "error",
          msg: "Ha ocurrido un error al guardar los datos",
        });
      }
      //* RESULTADO
      return res.status(200).json({
        status: "ok",
        msg: "Los datos guardados con éxito",
        savedUser,
      });
    });
  });
};

const loginUsuario = (req, res) => {
  //* DATOS DEL REQUEST
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      msg: "Faltan datos por enviar",
    });
  }

  //* VERIFICAR SI EL USUARIO EXISTE EN LA DB
  User.findOne({ email }).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        status: "error",
        msg: "El usuario ingresado no existe",
      });
    }
    //* COMPROBAR CONTRASEÑA
    const pwd = bcrypt.compareSync(password, user.password);

    if (!pwd) {
      return res.status(400).json({
        status: "error",
        msg: "Usuario o contraseña incorrectos",
      });
    }
    //* CONSEGUIR TOKEN
    const token = generarToken(user);

    //* DEVOLVER DATOS DEL USUARO
    return res.status(200).json({
      status: "ok",
      msg: "Identificación Éxitosa",
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
      },
      token,
    });
  });
};

const userProfile = (req, res) => {
  const id = req.params.id
  User.findById(id).select({password: 0, role:0, __v:0}).exec((error, user) =>{
    if(error || !user){
      return res.status(400).json({
        status: "error",
        msg: "El usuario ingresado no existe",
      });
    }
    return res.status(200).json({
      status: "ok",
      user
    })
  }) 
}

const usersList = (req, res) => {
  //* CONTROLAR LA PAGINA
  let page = 1
  req.params.page ? page = req.params.page : page
  page = parseInt(page)

  //* CONSULTAR CON MONGOOSE PAGINATE
  const itemPerPage = 5
  User.find().sort('_id').paginate(page, itemPerPage,(error, users, total) => {
    if(error || !users) {
      return res.status(404).json({
        status: "error",
        msg: "Error en la consulta",
        error
      });
    }
    //* DEVOLVER EL RESULTADO
    return res.status(200).json({
      status: "ok",
      page,
      itemPerPage,
      total,
      pages: Math.ceil(total/itemPerPage),
      users
    })
  })
}

module.exports = {
  pruebaUser,
  crearUsuario,
  loginUsuario,
  userProfile,
  usersList
};

const mongoosePagination = require("mongoose-pagination");
const Follow = require("../models/follow");
const User = require("../models/User");
const saveFollow = async (req, res) => {
  //* Conseguir datos por body
  const params = req.body;

  //* Sacar id del usuario identificado
  const identity = req.user;

  const follower = await Follow.find({
    user: identity.id,
    followed: params.followed,
  });

  if (follower.length) {
    return res.status(200).json({
      status: "ok",
      msg: "Ya esta siguiendo a este usuario",
    });
  }

  const userToFollow = new Follow({
    user: identity.id,
    followed: params.followed,
  });

  //* Crear objeto con modelo follow
  const followStored = await userToFollow.save();
  return res.status(200).json({
    status: "ok",
    followStored,
    identity,
  });
};

const unFollow = async (req, res) => {
  //* Conseguir datos del id del usuario para dejar de seguir
  const followedId = req.params.id;

  //* Sacar id del usuario identificado
  const identityId = req.user.id;

  //* Find de las coincidencias y hacer remove
  Follow.find({
    user: identityId,
    followed: followedId,
  }).deleteOne((error, followerDelete) => {
    if (error || followerDelete.deletedCount === 0) {
      return res.status(500).json({
        status: "error",
        msg: "No está siguiendo a este usuario",
      });
    }

    return res.status(200).json({
      status: "ok",
      msg: `Ha dejado de seguir al usuario`,
      followerDelete,
    });
  });
};

//* Listado de usuario que estoy siguiendo
const getFollowing = (req, res) => {
  //* Id del usuario identificado
  let userId = req.user.id;
  //* Comprobar si llega el id por parametro en la url
  if (req.params.id) userId = req.params.id;
  //* Comprobar si me llaga la pagina, si no llega es la pagina 1
  let page = 1;
  if (req.params.page) page = req.params.page;
  //* Usuarios por pagina para mostrar
  const itemsPerPage = 5;
  //* Find a follow, popular datos de los usuarios y paginar con mongoose paginate
  Follow.find({ user: userId })
    .populate("user followed", "-password -__v -created_at -role -bio")
    .paginate(page, itemsPerPage, (error, follows, total) => {
        return res.status(200).json({
          status: "ok",
          msg: `usuarios que estoy siguiendo`,
          follows,
          total,
          pages: Math.ceil(total/itemsPerPage)
        });
    });
};

//* Listado de usuario que me siguen
const getFollowers = (req, res) => {
  return res.status(200).json({
    status: "ok",
    msg: `usuario que me siguen`,
  });
};

module.exports = {
  saveFollow,
  unFollow,
  getFollowing,
  getFollowers,
};

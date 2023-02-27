const jwt = require("jwt-simple");
const moment = require("moment");

const { SECRET } = require("../services/jwt");

exports.auth = (req, res, netx) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      status: "error",
      msg: "Falta autenticacion",
    });
  }

  //* LIMPIAR EL TOKEN

  let token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    let payload = jwt.decode(token, SECRET);
    //* DECODIFICAR EL TOKEN
    if (payload.exp <= moment().unix()) {
      return res.status(401).json({
        status: "error",
        msg: "Token Expirado",
      });
    }
    req.user = payload;
  } catch (error) {
    return res.status(404).json({
      status: "error",
      msg: "Token Invalido",
    });
  }

  netx();
};

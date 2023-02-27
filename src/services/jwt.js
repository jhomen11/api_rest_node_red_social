const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET = "CLAVE_SECRETA_RED_SOCIAL_0109";

const generarToken = (user) => {
    const payload ={
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }
    return jwt.encode(payload, SECRET)
};

module.exports = {
    generarToken,
    SECRET
}

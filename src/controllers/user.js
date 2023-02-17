const pruebaUser = (req, res) =>{
    return res.status(200).send({
        msg: "Mensaje desde User Controller"
    })
}

module.exports = {
    pruebaUser
}
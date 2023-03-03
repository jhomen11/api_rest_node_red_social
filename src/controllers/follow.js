const saveFollow = (req, res) =>{

    //* Conseguir datos por body

    //* Sacar id del usuario identificado

    //* Crear objeto con modelo follow

    //* Guardar en BD
    
    return res.status(200).json({
        status: "ok",
        msg: "Los datos guardados con éxito",
        user: req.user
      });
}

module.exports = {
    saveFollow
}
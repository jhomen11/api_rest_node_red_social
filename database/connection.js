const mongoose = require('mongoose')

const connection = async () =>{
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect("mongodb://localhost:27017/mi_redsocial")
        console.log("DB Conectada")
    } catch (error) {
        console.log(error)
        throw new Error('No se ha podido conectar a la DB')
    }
}

module.exports = {connection} 
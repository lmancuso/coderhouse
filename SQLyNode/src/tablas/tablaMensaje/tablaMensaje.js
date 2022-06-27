const connection = require('../../config/index.js')

const knexSqlite = require('knex')(connection.sqliteConfig)

const crearTablaMensajes = async () => {
    try {
        const hayMensaje = await knexSqlite.schema.hasTable('mensajes')

        if(hayMensaje){
            console.log('hay tabla de mensajes')
        } else {
            await knexSqlite.schema.createTable('mensajes', (tabla) =>{
                tabla.string('email');
                tabla.string('text');
                tabla.string('date')
            })
            console.log('tabla de mensajes creada')
        }
        await knexSqlite.destroy()
    } catch (error){
        console.log(error)
    }
}

module.exports = crearTablaMensajes, knexSqlite
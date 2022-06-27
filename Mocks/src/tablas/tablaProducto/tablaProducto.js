const connection = require('../../config/index.js')

const knexMariaDB = require('knex')(connection.mariaDBConfig)

const crearTablaProductos = async () => {
    try {
        const hayProducto = await knexMariaDB.schema.hasTable('productos')
        if (hayProducto) {
            console.log('ya existe una tabla de productos')
        } else {
            await knexMariaDB.schema.createTable('productos', (tabla) =>{
                tabla.increments('id');
                tabla.string('title');
                tabla.integer('price');
                tabla.string('picture');
            })
            console.log('tabla de productos creada')
        }
        await knexMariaDB.destroy()
    } catch (error) {
        console.log(error)
    }
}

module.exports = crearTablaProductos, knexMariaDB
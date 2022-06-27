const crearTablaProductos = require('./tablaProducto/tablaProducto.js')
const crearTablaMensajes = require('./tablaMensaje/tablaMensaje.js')

const crearTabla = async () =>{
    try {
        await crearTablaProductos()
        await crearTablaMensajes()
    } catch (error) {
        console.log(error)
    }
}

crearTabla()
const faker = require('faker')
//import faker from "faker"
faker.locale = 'es'

//let id = 1

//function generarId(){
//    return id++
//}

function generarProducto(id){
    return {
        id,
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        foto: faker.image.imageUrl(),
    }
}

module.exports = {generarProducto};


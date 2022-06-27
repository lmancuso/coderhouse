const { Router } = require('express')
const {generarProducto} = require('../controller/faker.controller')
//import { Router } from "express"
//import { generarProducto } from "../controller/faker.controller.js"

const routerProductos = Router()

routerProductos.get('/', async (req, res) =>{
    const productos = []
     for (let i = 0; i < 5; i++) {
        let id = i + 1
        const nuevoProducto = generarProducto(id)
        productos.push(nuevoProducto)
        console.log(productos)
    }
    res.json(productos)
})

module.exports = routerProductos;
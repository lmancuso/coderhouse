import express from "express";
import Archivo from './archivo.js';

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


let manager = new Archivo('./src/files/productos.txt');

app.get('/items', async (req, res) => {
    let products = await manager.leer();
    res.send({
        items: products,
        cantidad: products.length
    });
});

app.get('/item-random', async (req, res) => {
    let products = await manager.leer();
    let randomProduct = products[Math.floor(Math.random() * products.length + 0)];
    res.send({ item: randomProduct });
});
const express = require('express')
const fs = require('fs');



const app = express()


const data = fs.readFile('productos.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const allProducts = JSON.parse(data)

    // const elementoRandom = data[Math.floor(Math.random() * data.length)]
    // console.log(`elemento random ${elementoRandom}`)

})

app.get('/productos', (req, res) => {
    res.send(`Lista de productos ${allProducts}`)
})

app.get('/productosRandom', (req, res) => {
    res.send(`Todavia nada`)
})

const PORT = process.env.port || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
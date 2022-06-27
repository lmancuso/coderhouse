const express = require('express')

const connection = require('./config/index.js')
const knexMariaDB = require('knex')(connection.mariaDBConfig)
const knexSqlite = require('knex')(connection.sqliteConfig)

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productos = []
const mensajes = []

//configuracion de socket

io.on('connection', async socket =>{
    //parte productos
    knexMariaDB
        .select()
        .table('productos')
        .then((productos) => {
            socket.emit('productos', productos)
        });

    knexSqlite
        .select()
        .table('mensajes')
        .then((mensajes) =>{
            socket.emit('mensajesActualizados', mensajes )
        });

    socket.on('update', async (producto) => {
        await knexMariaDB('productos').insert(producto)
        productos.push(producto)
        io.sockets.emit('productos', productos)
    })

    //parte mensajes

    socket.on('nuevoMensaje', async (mensaje) => {
        await knexSqlite('mensajes').insert(mensaje)
        knexSqlite.select().table('mensajes').then(mensajes =>{
            mensaje.fecha = new Date().toLocaleString()
            mensajes.push(mensaje)
            io.sockets.emit('mensajesActualizados', mensajes)

        })
    })

});

//--------------------------------------------------------


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//iniciacion de servidor

const PORT = 8080
const conexionServidor = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
conexionServidor.on('error', error => console.log(error))
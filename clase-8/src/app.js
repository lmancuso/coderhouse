//----------* REQUIRE'S *----------//
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//----------* ROUTES REQUIRE *----------//
const mainRouter = require('./routes/main')
const productsRouter = require('./routes/products')

//----------* ROUTES USE() *----------//
app.use('/', mainRouter)
app.use('/api/productos', productsRouter)

//----------* SERVER CONFIGURATION *----------//
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', (error) => console.log(`Server error: ${error}`))

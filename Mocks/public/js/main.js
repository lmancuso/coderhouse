const socket = io();

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    
    e.preventDefault()

    //formo el producto con los valores de index.html

    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    }

    //envio el producto

    socket.emit('update', producto);

    //limpio los contenidos de producto

    formAgregarProducto.reset()

})

socket.on('productos', manejarEventoProductos);

async function manejarEventoProductos(productos){
    //busca plantilla
    const recursoRemoto = await fetch('plantillas/tabla-productos.hbs')

    //extraigo el texto de la respuesta
    const textoPlantilla = await recursoRemoto.text()

    //armado de templade hbs
    const functionTemplate = Handlebars.compile(textoPlantilla)

    //rellenando plantilla
    const html = functionTemplate({ productos })

    //reemplazando contenido del navegador por nuevo contenido
    document.getElementById('productos').innerHTML = html 
}

//parte de codigo de mensajes

function mostrarMensajes(mensajes){
    const mensajesParaMostrar = mensajes.map(({fecha, autor, texto}) =>{
        return `<span style="color:blue;"><b>${autor}</b></span> <span style="color:brown;">[${fecha}]:</span> <span style="color:green;"><i>${texto}</i></span><img width="30" src='${avatar}' + '.png\' alt="not found">`
    })
    
    const mensajesHtml = `${mensajesParaMostrar.join('<br>')}`

    const listaMensajes = document.getElementById('listaMensajes')
    listaMensajes.innerHTML = mensajesHtml
}

socket.on('mensajesActualizados', mensajes =>{
    mostrarMensajes(mensajes)
})

const botonEnviar = document.getElementById('botonEnviar')
botonEnviar.addEventListener('click', e => {
    const inputAutor = document.getElementById('inputAutor')
    const inputNombre = document.getElementById('inputNombre')
    const inputApellido = document.getElementById('inputApellido')
    const inputEdad = document.getElementById('inputEdad')
    const inputAlias = document.getElementById('inputAlias')
    const inputMensaje = document.getElementById('inputMensaje')
    const inputAvatar = document.getElementById('inputAvatar')
    if (inputAutor.value && inputMensaje.value && inputAvatar.value) {
        const mensaje = {
            autor: inputAutor.value,
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            edad: inputEdad.value,
            alias: inputAlias.value,
            texto: inputMensaje.value,
            avatar: inputAvatar.value
        }
        socket.emit('nuevoMensaje', mensaje)
    } else {
        alert('Faltan datos necesarios')
    }
})

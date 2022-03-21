class Usuario {

    constructor(nombre, apellido, libro, mascotas) {
        this.libros = []
        this.nombre = nombre
        this.apellido = apellido
        this.addBook(libro)
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(libro) {
        this.libros.push(libro)
    }

    getBookNames() {
        let nombreLibros = []
        this.libros.forEach(function (libro) {
            console.log(libro.nombre_libro)
            nombreLibros.push(libro.nombre_libro)
        })
        return nombreLibros
    }


}

usuario = new Usuario('Luciano', 'Mancuso', { nombre_libro: 'Harry Potter', autor_libro: 'JK Rowling' }, [])

//NOMBRE Y APELLIDO
console.log('Nombre Completo:')
console.log(usuario.getFullName())

//MASCOTAS
usuario.addMascota('Yulia')
usuario.addMascota('Mateo')
console.log('Cantidad Mascotas:')
console.log(usuario.countMascotas())

//LIBROS 
usuario.addBook({ nombre_libro: 'MIAMEE', autor_libro: 'Ricardo Fort' })
console.log('Nombre Libros:')
usuario.getBookNames()
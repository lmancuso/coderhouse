const fs = require("fs")

module.exports =
    class Contenedor {
        constructor(FileName) {
            this.nombreArchivo = FileName
        }

        async save(Prod) { //añadimos el objeto a ingresar
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8")
            const productos = JSON.parse(data)
            let Id
            if (Prod.id) Id = Prod.id //producto tiene id (?)
            else if (productos.length === 0) Id = 1 //asigna 1 si productosDB.json esta vacío o el último objeto no tiene una id
            else Id = productos[productos.length - 1].id + 1 //sino, asignar el id del ultimo producto + 1.
            console.log(`La id del producto que se ingresó: ${Id}`) //mostrar la id de cada objeto por consola

            const PNuevo = { //nuevo producto
                id: Id,
                name: Prod.name,
                value: Prod.value,
                link: Prod.link
            };
            productos.push(PNuevo)

            let aJson = JSON.stringify(productos); //convertimos a JSON
            await fs.promises.writeFile(this.nombreArchivo, aJson, null, "\t") //reemplazar valores en el JSON
            console.log("El contenido se guardó correctamente.")
        }

        async getById(id) {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8") //leemos productosDB.json
            const v = JSON.parse(data) //convertimos a objeto
            const i = v.findIndex((P) => { //verificamos que tenga una propiedad id, si la tiene retorna true
                if (P.id === id) return true
                else return false
            })
            if (i === -1) return null
            console.log(`Producto con id: ${id}`)
            console.log(v[i])
            return v[i]
        }

        async getAll() { //muestra todos los objetos
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8") //leemos productosDB.json
            const v = JSON.parse(data) //convertimos a objeto
            console.log(v); //mostramos los productos
            return v;
        }
        async deleteById(id) {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8") //leemos productosDB.json
            const v = JSON.parse(data) //convertimos a objeto
            const i = v.findIndex((P) => {
                if (P.id === id) return true
                else return false
            })
            if (i === -1) {
                console.log(`El ${id} no existe`)
                return null
            };
            console.log(`Se está procesando la solicitud de borrado para producto con id: ${id}`)
            console.log(v[i]);
            v.splice(i, 1);
            let aJson = JSON.stringify(productos); //pasamos a JSON
            await fs.promises.writeFile(this.nombreArchivo, aJson, null, "\t");
            console.log("Se eliminó con éxito el producto")
        }
        async deleteAll() {
            console.log("Eliminando lote completo..."); //eliminando
            let aJson = JSON.stringify([]); //pasamos a JSON
            await fs.promises.writeFile(this.nombreArchivo, aJson, null, "\t");
            console.log("Se ha eliminado todo con éxito"); // productos eliminados
        }
    }
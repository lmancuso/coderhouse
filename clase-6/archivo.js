import fs from 'fs';

export default class Archivo {
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    async leer() {
        try {
            let contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            contenido = JSON.parse(contenido);
            console.log(contenido);
            return contenido;
        } catch (error) {
            console.log([]);
            return [];
        }
    }

    async guardar(producto) {
        try {
            let contenido = Object.values(await this.leer());
            producto.id = contenido.length + 1;
            contenido.push(producto);
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(contenido, null, '\t'));
            console.log("Se guardaron los cambios con éxito");
        } catch (error) {
            console.log(`No se puede guardar el archivo: ${error}`);
        }
    }

    async borrar() {
        try {
            await fs.promises.unlink(this.rutaArchivo);
        } catch (error) {
            console.log(`No se puede borrar el archivo: ${error}`);
        }
    }
}
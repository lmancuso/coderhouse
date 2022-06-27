const fs = require('fs')

class Contenedor {
    constructor(fileName){
        this.fileName = fileName
    }

    async readFile(){
        try {
            return JSON.parse(await fs.promises.readFile(`src/DB/${this.fileName}.json`, 'utf-8'))
        } catch (error) {
            console.log(error)
        }
    }

    async writeFile(data){
        try {
            fs.promises.writeFile(`src/DB/${this.fileName}.json`, JSON.stringify(data), 'utf-8')
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            const allItems = await this.readFile()
            return allItems
        } catch (error) {
            await this.writeFile([])
            const allItems = await this.readFile()
            return allItems
        }
    }

    async getByID(id){
        try {
            const allItems = await this.readFile()
            const itemByID = allItems.find((item) => item.id === Number(id))
            return itemByID
        } catch (error) {
            console.log(error)
        }
    }

    async addItem(item){
        try {
            const allItems = await this.readFile()
            allItems.push(item)
            await this.writeFile(allItems)
        } catch (error) {
            console.log(error)
        }
    }

    async editByID(object){
        try {
            let allItems = await this.readFile()
            allItems = allItems.map((item) => (item.id !== object.id ? item : object))
            await this.writeFile(allItems)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteByID(id){
        try {
            const allItems = await this.readFile()
            const filter = allItems.filter((item) => item.id !== Number(id))
            if (JSON.stringify(allItems) === JSON.stringify(filter)) {
                return false
            } else {
                await this.writeFile(filter)
                return true
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await this.writeFile([])
        } catch (error) {
            console.log(error)
        }
    }

    async addItemToCart(cartID, object){
        try {
            let allItems = await this.readFile()
            let itemFound = allItems.find((item) => item.id === Number(cartID))
            itemFound.productos.push(object)
            allItems = allItems.map((item) => (item.id !== itemFound.id ? item : itemFound))
            await this.writeFile(allItems)
        } catch (error) {
            console.log(error)
        }
    }

    async removeItemFromCart(cartID, objectID){
        try {
            let allItems = await this.readFile()
            let itemFound = allItems.find((item) => item.id === Number(cartID))
            itemFound.productos = itemFound.productos.filter((item) => item.id !== Number(objectID))
            allItems = allItems.map((item) => (item.id !== itemFound.id ? item : itemFound))
            await this.writeFile(allItems)
        } catch (error) {
            console.log(error)
        }
    }

    async emptyCart(cartID){
        try {
            let allItems = await this.readFile()
            let itemFound = allItems.find((item) => item.id === Number(cartID))
            itemFound.productos = []
            allItems = allItems.map((item) => (item.id !== itemFound.id ? item : itemFound))
            await this.writeFile(allItems)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor;
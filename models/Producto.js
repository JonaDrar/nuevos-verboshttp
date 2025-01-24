const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const pathHaciaLaBaseDeDatosDeProductos = path.join(__dirname, '../data/basedeproductos.json');

class Producto {
  constructor() {
    this.productos = this.obtenerTodosLosProductos();
  }

  obtenerTodosLosProductos () {
    const productosEnString = fs.readFileSync(pathHaciaLaBaseDeDatosDeProductos, 'utf-8');
    const productoParseados = JSON.parse(productosEnString);
    return productoParseados;
  }

  obtenerProductoPorId (id) {
    const producto = this.productos.find(producto => producto.id === id);
    return producto;
  }

  crearProducto (datosProducto) {
    const nuevoProducto = {
      id: uuidv4(),
      ...datosProducto
    }
    this.productos.push(nuevoProducto);
    this.guardar();
  }

  eliminarProducto (id) {
    this.productos = this.productos.filter(
      (prod) => prod.id != id
    );

    this.guardar();
  }

  actualizarProducto (id, datosParaActualizar) {
    this.productos = this.productos.map((prod) => {
      if(prod.id === id) {
        return {
          ...prod,
          ...datosParaActualizar
        }
      }

      return prod;
    })

    this.guardar();
  }

  guardar() {
    fs.writeFileSync(pathHaciaLaBaseDeDatosDeProductos, JSON.stringify(this.productos));
  }
}

module.exports = Producto;
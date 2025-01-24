const fs = require('fs');
const path = require('path');
const pathHaciaArchivo = path.join(__dirname, '../data/carritos.json');
const { v4: uuidv4 } = require('uuid');
const Producto = require('./Producto');

const producto = new Producto();

/**
 * carrito: [
 *    {
        id: 123123-123123-123123,
        idUsuario: 123123-123123-123123,
        productosQueLleva: [
          {
            idProducto: 12312-123123-123123,
            cantidad: 5,
          },
          {
            idProducto: 12312-123123-123123,
            cantidad: 3,
          }
        ]
      }
  * ]
 */

class Carrito {
  constructor() {
    this.carrito = this.obtenerTodosLosCarritos();
  }

  obtenerTodosLosCarritos() {
    return JSON.parse(fs.readFileSync(pathHaciaArchivo, 'utf8'));
  }

  agregarProductoAlCarrito (idUsuario, idProducto, cantidad, idCarrito) {
    if (idCarrito) {
      // Si el carrito ya existe modificar el existente y agregar el producto ////TAREA
    } else {
      // Si el carrito no existe, vamos a crear uno nuevo
      const nuevoCarrito = {
        id: uuidv4(),
        idUsuario: idUsuario,
        productosQueLleva: [
          {
            idProducto: idProducto,
            cantidad: cantidad
          }
        ]
      }
      this.carrito.push(nuevoCarrito);
      this.guardar();
      return nuevoCarrito;
    }
  }

  eliminarProductoDelCarrito (idCarrito, idProducto) {
    const carritoEncontrado = this.carrito.find(carr => carr.id === idCarrito);
    if (!carritoEncontrado) {
      return 'No se encontró el carrito';
    }

    carritoEncontrado.productosQueLleva = carritoEncontrado.productosQueLleva.filter(prod => prod.idProducto !== idProducto);

    const indiceDelCarrito = this.carrito.findIndex(carr => carr.id === idCarrito);

    this.carrito[indiceDelCarrito] = carritoEncontrado;
    this.guardar();
    return carritoEncontrado;
  }

  realizarCompra (idCarrito) {
    const carritoEncontrado = this.carrito.find(carrito => carrito.id === idCarrito);
    if (!carritoEncontrado) {
      return 'No se encontró el carrito';
    }

    const { productosQueLleva } = carritoEncontrado;

    productosQueLleva.forEach( prod => {
      // buscar el producto por id y ver si hay stock
      const productoEncontrado = producto.obtenerProductoPorId(prod.idProducto);
      if (!productoEncontrado) {
        return 'No se encontró el producto';
      }
      // si hay stock restar la cantidad de stock
      if (productoEncontrado.stock >= prod.cantidad) {
        //productoEncontrado.stock = productoEncontrado.stock - prod.cantidad;
        productoEncontrado.stock -= prod.cantidad;
        producto.actualizarProducto(prod.idProducto, productoEncontrado);
      } else {
        return 'No hay stock suficiente';
      }
    } );

    //se elimina el carrito al momento de finalizar la compra
    this.carrito = this.carrito.filter(carr => carr.id !== idCarrito);
    this.guardar();

    return 'Compra realizada con éxito';
  }

  guardar () {
    fs.writeFileSync(pathHaciaArchivo, JSON.stringify(this.carrito));
  }
}

module.exports = Carrito;
const express = require('express');
const { obtenerProductos, obtenerProductoPorID, crearProducto, eliminarProducto, actualizarProducto, agregarProductoAlCarrito, eliminarProductoDelCarrito, realizarCompra } = require('../controllers/productos.controller');
const productosRouter = express.Router();

productosRouter.get('/', obtenerProductos)
productosRouter.post('/', crearProducto)
productosRouter.post('/agregar-al-carrito', agregarProductoAlCarrito)
productosRouter.delete('/eliminar-del-carrito', eliminarProductoDelCarrito)
productosRouter.post('/comprar-carrito', realizarCompra)
productosRouter.get('/:id', obtenerProductoPorID)
productosRouter.delete('/:id', eliminarProducto)
productosRouter.put('/:id', actualizarProducto)

module.exports = productosRouter;
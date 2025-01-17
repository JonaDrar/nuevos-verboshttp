const express = require('express');
const { obtenerProductos, obtenerProductoPorID, crearProducto, eliminarProducto, actualizarProducto, servirHTML } = require('../controllers/productos.controller');
const productosRouter = express.Router();

productosRouter.get('/home', servirHTML)
productosRouter.get('/', obtenerProductos)
productosRouter.get('/:id', obtenerProductoPorID)
productosRouter.post('/', crearProducto)
productosRouter.delete('/:id', eliminarProducto)
productosRouter.put('/:id', actualizarProducto)

module.exports = productosRouter;
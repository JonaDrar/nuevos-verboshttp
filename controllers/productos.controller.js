const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');
const Carrito = require('../models/Carrito');

const producto = new Producto();
const usuario = new Usuario();
const carrito = new Carrito();

const obtenerProductos = (req, res) => {
  const productos = producto.obtenerTodosLosProductos();
  res.send(productos);
};

const obtenerProductoPorID = (req, res) => {
  try {
    const id = req.params.id;
    const productoEncontrado = producto.obtenerProductoPorId(id);
    if(!productoEncontrado) {
      res.status(404).send('Producto no encontrado');
      return;
    }
    res.send(productoEncontrado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
};

const crearProducto = (req, res) => {
  const datosProducto = req.body;
  producto.crearProducto(datosProducto);
  res.send('producto creado');
};

const eliminarProducto = (req, res) => {
  const id = req.params.id;
  producto.eliminarProducto(id);
  res.send('Producto eliminado');
};

const actualizarProducto = (req, res) => {
  const id = req.params.id;
  const datosACambiar = req.body;
  producto.actualizarProducto(id, datosACambiar);
  res.send('Producto actualizado');
};

const agregarProductoAlCarrito = (req, res) => {
  // // Obtener el id del producto
  // const idProducto = req.body.idProducto;
  // // Obtener el id del carrito si es que existe
  // const idCarrito = req.body.idCarrito;
  // // Obtener la cantidad a agregar
  // const cantidad = req.body.cantidad;
  // // Obtener el id del usuario
  // const idUsuario = req.body.idUsuario;

  // destructuración
  const { idUsuario, idProducto, cantidad, idCarrito } = req.body;

  //Verificar si el usuario existe
  const usuarioEncontrado = usuario.obtenerUsuarioPorId(idUsuario);
  if(!usuarioEncontrado) {
    res.status(404).send('Usuario no encontrado');
    return;
  }

  // Verificar si el producto existe
  const productoEncontrado = producto.obtenerProductoPorId(idProducto);
  if(!productoEncontrado) {
    res.status(404).send('Producto no encontrado');
    return;
  }
  // Verificar si la cantidad del stock es suficiente
  if(productoEncontrado.stock < cantidad) {
    res.status(400).send('No hay suficiente stock');
    return;
  }

  const carritoCreado = carrito.agregarProductoAlCarrito(idUsuario, idProducto, cantidad, idCarrito);
  res.send(carritoCreado);
}

const eliminarProductoDelCarrito = (req, res) => {
  const { idCarrito, idProducto } = req.body;
  const carritoModificado = carrito.eliminarProductoDelCarrito(idCarrito, idProducto);
  res.send(carritoModificado);
};

const realizarCompra = (req, res) => {
  const { idCarrito } = req.body;
  const carritoEncontrado = carrito.realizarCompra(idCarrito);
  res.send(carritoEncontrado);
};


module.exports = {
  obtenerProductos,
  obtenerProductoPorID,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
  agregarProductoAlCarrito,
  eliminarProductoDelCarrito,
  realizarCompra
}
const { v4 } = require('uuid');
const fs = require('fs');

const rutaArchivoBase = './models/basedeproductos.json';

const paginHTML = './views/homePage.html';

const obtenerProductos = (req, res) => {
  //JSON.parse = covertir un string a un objeto
  const productos = JSON.parse(
    fs.readFileSync(rutaArchivoBase, 'utf-8')
  );

  res.send({
    mensaje: 'Productos disponibles',
    productos: productos,
  });
};

const obtenerProductoPorID = (req, res) => {
  const id = req.params.id;

  const productos = JSON.parse(
    fs.readFileSync(rutaArchivoBase, 'utf-8')
  );

  const producto = productos.find((prod) => prod.id == id);

  if (producto) {
    res.send({
      mensaje: 'Producto encontrado',
      producto: producto,
    });
  } else {
    res.send({
      mensaje: 'Producto no encontrado',
    });
  }
};

const crearProducto = (req, res) => {
  const datosProducto = req.body;
  const id = v4();

  const productos = JSON.parse(
    fs.readFileSync(rutaArchivoBase, 'utf-8')
  ); // [{}, {}, {}]

  productos.push({ id: id, ...datosProducto }); // [{}, {}, {}, {}]

  //JSON.stringify = convertir un objeto a un string
  fs.writeFileSync(rutaArchivoBase, JSON.stringify(productos));

  res.send({
    mensaje: 'Producto creado',
    producto: {
      id: id,
      ...datosProducto,
    },
  });
};

const eliminarProducto = (req, res) => {
  const id = req.params.id;

  const productos = JSON.parse(
    fs.readFileSync(rutaArchivoBase, 'utf-8')
  );

  const nuevoArregloDeProductosSinElEliminado = productos.filter(
    (prod) => prod.id != id
  );

  fs.writeFileSync(
    rutaArchivoBase,
    JSON.stringify(nuevoArregloDeProductosSinElEliminado)
  );

  res.send({
    mensaje: 'Producto eliminado',
    id: id,
  });
};

const actualizarProducto = (req, res) => {
  const id = req.params.id;
  const datosACambiar = req.body;
  const productos = JSON.parse(
    fs.readFileSync(rutaArchivoBase, 'utf-8')
  );

  const nuevoArregloProductos = productos.map((prod) => {
    if (prod.id == id) {
      return {
        ...prod,
        ...datosACambiar,
      };
    }
    return prod;
  });

  fs.writeFileSync(
    rutaArchivoBase,
    JSON.stringify(nuevoArregloProductos)
  );

  res.send({
    mensaje: 'Producto actualizado',
    producto: {
      id: id,
      ...datosACambiar,
    },
  });
};

const servirHTML = (req, res) => {
  try {
    const homePage = fs.readFileSync(paginHTML, 'utf-8');
    res.send(homePage);
  } catch (error) {
    console.log(error);
    res.send('Error al servir el HTML');
  }
}


module.exports = {
  obtenerProductos,
  obtenerProductoPorID,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
  servirHTML
}
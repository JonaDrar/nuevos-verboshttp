const express = require('express');
const app = express();
const { v4 } = require('uuid');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mundo');
})

const productos = [
  {
    id: 1,
    nombre: 'iPhone 12',
    precio: 1000,
    stock: 10,
    color: ['azul', 'negro', 'blanco'],
    descripcion: 'celular de apple',
    marca: 'apple',
    estado: 'usado'
  }
]

/*
Ruta GET `/productos`: Retorna todos los productos. ✅
Ruta GET `/productos/:id`: Retorna un producto específico según su ID. ✅
Ruta POST `/productos`: Crea un nuevo producto. ✅
Ruta PUT `/productos/:id`: Actualiza un producto existente según su ID.
Ruta DELETE `/productos/:id`: Elimina un producto existente según su ID.
*/

app.get('/productos', (req, res) => {
  res.send({
    mensaje: "Productos disponibles",
    productos: productos
  })
})

app.get('/productos/:id', (req, res) => {
  const id = req.params.id;

  const producto = productos.find((prod) => prod.id == id)

  if (producto) {
    res.send({
      mensaje: 'Producto encontrado',
      producto: producto
    })
  } else {
    res.send({
      mensaje: 'Producto no encontrado'
    })
  }
})

app.post('/productos', (req, res) => {
  const datosProducto = req.body;
  const id = v4();
  productos.push({id: id, ...datosProducto})
  res.send({
    mensaje: 'Producto creado',
    producto: {
      id: id,
      ...datosProducto
    }
  });
});


//JUEVES: 
// Variables de entorno
// Patrón MVC
// Nodemon
// uuid
// base de datos local (persistencia)

app.listen(8080, () => {
  console.log('Somos tan buenos que levantamos el servidor')
})
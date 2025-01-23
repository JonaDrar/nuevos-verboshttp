require('dotenv').config();
const express = require('express');
const app = express();
const productosRouter = require('./routes/productos.route');
const usuariosRouter = require('./routes/usuarios.route');

app.use(express.json());



app.use('/productos', productosRouter); 
app.use('/usuarios', usuariosRouter); 

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `Somos tan buenos que levantamos el servidor y está corriendo en el puerto ${port}`
  );
});

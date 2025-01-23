//contendrá las funciones relacionadas con las operaciones CRUD de los usuarios. Importa el modelo de usuario y define las funciones para obtener todos los usuarios, obtener un usuario por ID, crear un nuevo usuario, actualizar los datos de un usuario existente y eliminar un usuario.

const Usuario = require('../models/Usuario');

const usuario = new Usuario();

const obtenerTodosLosUsuarios = (req, res) => {
  const usuarios = usuario.obtenerTodosLosUsuarios();
  res.send(usuarios);
};

const obtenerUsuarioPorId = (req, res) => {
  res.send('Obteniendo usuario por ID'); //TAREA
}

const crearUsuario = (req, res) => {
  const usuarioNuevo = req.body;
  usuario.crearUsuario(usuarioNuevo);
  res.send('Usuario creado');
}

const actualizarUsuario = (req, res) => {
  const id = req.params.id;
  const nuevosDatos = req.body;
  usuario.editarUsuarioPorId(id, nuevosDatos);
  res.send('Usuario actualizado');
}

const eliminarUsuario = (req, res) => {
  const id = req.params.id;
  usuario.eliminarUsuarioPorId(id);
  res.send('Usuario eliminado');
}

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
}
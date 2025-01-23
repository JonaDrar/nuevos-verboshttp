//contendrá las rutas relacionadas con los usuarios. Importa el controlador de usuarios y define las rutas para obtener todos los usuarios, obtener un usuario por ID, crear un nuevo usuario, actualizar los datos de un usuario existente y eliminar un usuario.
const express = require('express');
const { obtenerTodosLosUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario.controller')
const usuariosRouter = express.Router();

/* Aquí van a estar nuestras rutas de usuarios */
usuariosRouter.get('/', obtenerTodosLosUsuarios);
usuariosRouter.get('/:id', obtenerUsuarioPorId);
usuariosRouter.post('/', crearUsuario);
usuariosRouter.put('/:id', actualizarUsuario);
usuariosRouter.delete('/:id', eliminarUsuario);

module.exports = usuariosRouter;
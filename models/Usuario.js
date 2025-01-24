// defina el esquema sin mongoose y las operaciones relacionadas con los usuarios. El modelo debe incluir campos como nombre, apellido, correo electrónico, etc.debe ser un CRUD completo, es decir, debe poder crear, leer, actualizar y eliminar usuarios.
const fs = require('fs');
const path = require('path');
const pathHaciaArchivo = path.join(__dirname, '../data/usuarios.json');
const { v4: uuidv4 } = require('uuid');

class Usuario {
  constructor() {
    this.usuarios = this.obtenerTodosLosUsuarios();
  }

  obtenerTodosLosUsuarios() {
    return JSON.parse(fs.readFileSync(pathHaciaArchivo, 'utf8'));
  }

  crearUsuario(usuario) {
    const nuevoUsuario = {
      id: uuidv4(),
      ...usuario
    }
    this.usuarios.push(nuevoUsuario);
    this.guardar();
  }

  guardar () {
    fs.writeFileSync(pathHaciaArchivo, JSON.stringify(this.usuarios));
  }

  eliminarUsuarioPorId(id) {
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    this.guardar();
  }

  editarUsuarioPorId(id, nuevosDatos) {
    this.usuarios = this.usuarios.map( usuario => {
      if(usuario.id === id) {
        return {
          id,
          ...usuario,
          ...nuevosDatos
        }
      }
      return usuario;
    })
    this.guardar();
  }

  obtenerUsuarioPorId(id) { 
    try {
      const usuarioObtenido = this.usuarios.find(usuario => usuario.id === id);
      return usuarioObtenido;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}


module.exports = Usuario;
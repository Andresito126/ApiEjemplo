require('dotenv').config();

//Cargar las variables de entorno
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});

// Middleware de autenticación
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Prohibido (token inválido)
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No autorizado (sin token)
  }
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  console.log(newUser)
  // Hashear la contraseña antes de guardarla (bcrypt)
  bcrypt.hash(newUser.contrasena, 10, (err, hash) => { // 10 es el número de rondas de hashing
    if (err) {
      res.status(500).send('Error al hashear la contraseña');
      throw err;
    }
    newUser.contrasena = hash;

    console.log(newUser.contrasena)

    db.query('INSERT INTO Usuarios (id,nombre,apellido,correo_electronico,contrasena) VALUES (?,?,?,?,?)',[newUser.id,newUser.nombre,newUser.apellido,newUser.correo_electronico,newUser.contrasena], (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar el usuario');
        throw err;
      }
      res.status(201).send('Usuario agregado correctamente');
  });
});
};
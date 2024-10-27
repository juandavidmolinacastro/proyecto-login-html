const express = require('express')
const app = express()
const port = 3000
const mysql = require("mysql2/promise");
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'express',
});
// variables para uardar usuarios y contraseña, y ruta /login para el inicio de sesion
app.get('/login',async (req, res) => {
  const user = req.query.user
  const pass = req.query.pass
const  [rows] = await pool.query("SELECT * FROM usuarios WHERE usuario = ? AND clave = ?", [user, pass])
if (rows.length > 0) {
  res.send('Usuario y contraseña correctos')
  res.end()
  return
}
res.send('Usuario o contraseña incorrectos')
res.end()
return
})
// crear ruta para el registro de usuarios con usuario y clave
app.get('/register', async (req, res) => {
  const user = req.query.user
  const pass = req.query.pass
  const [result ] = await pool.query("INSERT INTO usuarios (usuario, clave) VALUES (?, ?)", [user, pass])
  console.log(result)
  if (result.affectedRows > 0) {  
    res.send('Usuario registrado correctamente')
    res.end()
    return
  }
  res.send('Error al registrar el usuario')
  res.end()
  return
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

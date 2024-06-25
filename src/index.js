const express = require('express');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./routes/usuario');

const app = express();
const port = 3000;


app.use(bodyParser.json());

app.use( '/usuarios', usuariosRoutes);

//iniciar el servidor
app.listen(port, () =>{
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
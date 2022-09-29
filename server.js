//-------------MODULOS
import express from 'express';
import path from 'path';

import carritosRouter from './src/routes/carrito.routes.js';
import productosRouter from './src/routes/porducto.routes.js';

//-------------INSTANCIA DE SERVIDOR
const app = express();

//-------------MIDDLEWARES

app.use(express.static('public'));
app.use(express.json());

app.use('./api/carritos', carritosRouter);
app.use('./api/productos', productosRouter);

//------------SERVIDOR
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
}); 

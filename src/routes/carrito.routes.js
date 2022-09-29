import { Router } from "express";
import { ContenedorArchivo } from ' ../container/ContenedorArchivo.js';

const carritosRouter = Router();
const carritosApi = new ContenedorArchivo('dbCarritos.json');
const productosApi = new ContenedorArchivo('dbProductos.json');

carritosRouter.get('/', async (req,res) => {
    res.json((await carritosApi.listaAll()))
})

carritosRouter.post('/', async (req,res) => {
    res.json({ id: await carritosApi.guardar({ productos: [] }) })
})

carritosRouter.delete('/:id', async (req, res) => {
    res.json(await carritosApi.borrar(req.params.id))
})

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.id)
    res.json(carrito.productos)
})

carritosRouter.post('/id:/productos', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.id)
    const producto = await productosApi.listar(req.body.id)
    carrito.productos.push(producto)
    await carritosApi.actualizar(carrito, req.params.id)
    res.end()
})

carritosRouter.delete('/:id/productos/:idProd', async ( req, res) => {
    const carrito = await carritosApi.listar(req.params.id)
    const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
})
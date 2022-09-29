import { Router } from 'express';
import { ContenedorArchivo } from '../container/ContenedorArchivos.js';
import { config } from '../utils/config.js';

const productosRouter = Router();
const productosApi = new ContenedorArchivo('dbProductos.json');

const esAdmin = config.isAdmin;
function soloAdmins(req, res, next) {
    if(!esAdmin) {
        res.status(403).json({code: 403, msg:`Forbbiden Access ${req.methid} ${req.baseUrl} ${req.url}` });
    } else {
        next();
    }
}

productosRouter.get('/', async (req, res) => {
    const productos = await productosApi.listarAll()
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await productosApi.listar(req.params.id))
})

productosRouter.post('/', soloAdmins, async (req, res) => {
    res.json({ id: await productosApi.guardar(req.body) })
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    res.json({ id: await productosApi.actualizar(req.body, req.params.id)})
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    res.json(await productosApi.borrar(req.params.id))
})

export default productosRouter;
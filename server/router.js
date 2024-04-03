// router.js
import express from 'express';
import UsersManager from './data/fs/UserManager.fs.js';

const router = express.Router();
const users = new UsersManager();

async function handleRequest(req, res) {
    const url = req.url;
    console.log(url);
    const options = { "Content-Type" : "text/plain" };
    switch (url) {
        case "/":
            res.writeHead(200, options).end("API CONECTADA");
            break;
        case "/api/users":
            const all = await users.read();
            res.writeHead(200, options).end(JSON.stringify(all));
            break;
        default:
            res.writeHead(404, options).end("RUTA NO ENCONTRADA");
            break;
    }
}

router.use(handleRequest);

export default router;


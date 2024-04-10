
# Gestión de Productos y Usuarios

Este proyecto es  para la gestión de productos y usuarios. Permite crear, leer, actualizar y eliminar productos y usuarios, desde archivos file y desde la memoria.

## Instalación
Clona este repositorio en tu máquina local:

git clone https://github.com/tu-usuario/tu-repositorio.git

## Instala las dependencias del proyecto:

- npm install

### Para iniciar el servidor, ejecuta el siguiente comando:

- npm run dev

### Una vez iniciado, puedes acceder a la API a través de las siguientes rutas:

- Para acceder a la API de productos: "/api/product"
- Para acceder a la API de usuarios: "/api/user"
### Rutas
- Productos
 - GET "/api/product": Retorna todos los productos almacenados en el sistema.
 - GET "/api/product/":pid": Retorna un producto específico según su ID.
 - POST "/api/product": Crea un nuevo producto con los datos proporcionados en el cuerpo de la solicitud.
 - PUT "/api/product/:pid": Actualiza un producto existente con los nuevos datos proporcionados en el cuerpo de la solicitud.
 - DELETE "/api/product/:pid": Elimina un producto específico según su ID.
- Usuarios
 - GET "/api/user/:uid": Retorna un usuario específico según su ID.
 - GET "/api/user": Retorna todos los usuarios almacenados en el sistema.
 - POST "/api/user": Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud.
 - PUT "/api/user/:uid": Actualiza un usuario existente con los nuevos datos proporcionados en el cuerpo de la solicitud.
 - DELETE "/api/user/:uid": Elimina un usuario específico según su ID.
### Tecnologías Utilizadas
- [Node.js](https://nodejs.org/e)
- [Express](https://expressjs.com/es/)
- [nodemon](https://nodemon.io)
- [fs](https://www.fs.com) (para almacenamiento en archivos en file y en memory)
- [Handlebars](https://handlebarsjs.com)

### Implementacio de enrutamiento externo

separe cada ruta por usuarios y producto
 - aca dejo el archivo server.js:

import express from "express";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);
 - hice las rutas mas cortas y facil de leer y escalas gracias a el enrutamiento extremo
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/arom", express.static("arom"));
server.use(express.static(__dirname + "/public"));


server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

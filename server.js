import express from "express";
import indexRouter from "./src/router/index.router.js";
//import errorHandler from "./src/middlewares/errorHandler.mid.js";
//import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/igna", express.static("igna"));
server.use(express.static(__dirname + "/public"));

// Importar y utilizar los enrutadores
server.use("/", indexRouter);

// Manejadores de errores
//server.use(errorHandler);
//server.use(pathHandler);

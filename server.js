import "dotenv/config.js"
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import socketCb from "./src/router/index.socket.js"

import fileStore from "session-file-store";
import __dirname from "./utils.js";
import dbConnect from "./src/utils/dbConnect.util.js";

const server = express();
const port = 8080;
const ready = async () => {
    console.log("server ready on port " + port);
    await dbConnect()
}
const nodeServer = createServer(server);
nodeServer.listen(port, ready);

const FileSession = fileStore(session)


//
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };

//midelwares
server.use(cookieParser(process.env.SECRET));
server.use(session({
    //store: new FileSession({
    //    path: "./src/data/fs/files/sessions",
    //    ttl: 60 * 60 * 1000,
    //}),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000},
}));

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/public", express.static("public"));
server.use(express.static(__dirname + "/public"));

// Rutas y middleware de manejo de errores
server.use("/", indexRouter);
server.use(errorHandler);
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
server.use(pathHandler);

import express from "express";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import { engine } from "express-handlebars";
import path from "path";
import __dirname from "./utils.js";

const server = express();
const port = 8080;

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname+"/src/views");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/public", express.static("public"));
server.use(express.static(path.join(__dirname, "/public")));

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

server.listen(port, () => {
    console.log("Server is running on port " + port);
});


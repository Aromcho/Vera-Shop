import express from "express";
import UsersManager from "./data/fs/UserManager.fs.js"
import router from "./router.js";


const server = express();
const port = 8080;

const usersManager = new UsersManager();

const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

// Middlewares 
server.use(express.urlencoded({ extended: true }));
server.use(express.json())
server.use(router);

// Rutas
server.get("/", async (req, res) => {
    try {
        return res.json({
            statusCode: 200,
            response: "CODER API",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            response: "CODER API ERROR",
            success: false
        });
    }
});



server.post("/api/users", async (req, res) => {
    try {
        const userData = req.body;
        await usersManager.create(userData);
        return res.status(201).json({
            response: "Usuario creado exitosamente",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "ERROR",
            success: false
        });
    }
});







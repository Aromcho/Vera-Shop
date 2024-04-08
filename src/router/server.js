import express from "express";
import productManager from "./data/fs/ProductManager.fs.js"




const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

// Middlewares 
server.use(express.urlencoded({ extended: true }));
server.use(express.json())
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


server.get("/api/product", async (req, res) => {
    try {
        const { category } = req.query
        const all = await productManager.read(category)
        if (all.length !== 0) {
            return res.status(200).json({
                response: all,
                category,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})
server.get("/api/product/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const one = await productManager.readOne(pid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

server.get("/api/notes", async (req, res) => {
  try {
    const { category } = req.query;
    const all = await notesManager.read(category);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "CODER API ERROR",
    });
  }
});server.post("/api/users/:uid", async (req, res) => {
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
server.post("/api/product/:pid", async (req, res) => {
    try {
        const productData = req.body;
        await productManager.create(productData);
        return res.status(201).json({
            response: "created product",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "ERROR",
            success: false
        })
    }
})


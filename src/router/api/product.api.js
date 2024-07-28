import CustomRouter from "../CustomRouter.js";
import productManager from '../../data/mongo/managers/ProductManager.mongo.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import __dirname from '../../../utils.js';  // Aseguramos la ruta correcta a utils.js

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${basename}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

class ProductsRouter extends CustomRouter {
  init() {
    // Ruta para leer todos los productos o filtrar por categoría
    this.read("/", async (req, res, next) => {
      try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const products = await productManager.read(filter);
        if (products.length > 0) {
          return res.response200(products);
        } else {
          return res.error404();
        }
      } catch (error) {
        next(error);
      }
    });

    // Ruta para paginar productos con opción de filtrar por categoría
    this.read("/paginate", async (req, res, next) => {
      try {
        const filter = {};
        const opts = {};

        if (req.query.limit) {
          opts.limit = parseInt(req.query.limit, 10);
        }
        if (req.query.page) {
          opts.page = parseInt(req.query.page, 10);
        }
        if (req.query.category) {
          filter.category = req.query.category;
        }

        const all = await productManager.paginate({ filter, opts });
        const info = {
          totalDocs: all.totalDocs,
          page: all.page,
          totalPages: all.totalPages,
          limit: all.limit,
          prevPage: all.prevPage,
          nextPage: all.nextPage
        };

        return res.paginate(all.docs, info);
      } catch (error) {
        return next(error);
      }
    });

    // Ruta para leer un producto por ID
    this.read("/:pid", async (req, res, next) => {
      try {
        const { pid } = req.params;
        const product = await productManager.readOne(pid);
        if (product) {
          return res.status(200).json(product);
        } else {
          return res.error404();
        }
      } catch (error) {
        next(error);
      }
    });

    // Ruta para subir imágenes
    this.create("/upload", upload.fields([
      { name: 'photo', maxCount: 1 },
      { name: 'photo2', maxCount: 1 },
      { name: 'photo3', maxCount: 1 },
      { name: 'photo4', maxCount: 1 }
    ]), async (req, res, next) => {
      try {
        const baseUrl = req.protocol + '://' + req.get('host');
        const photos = {
          photo: req.files.photo ? `${baseUrl}/uploads/${req.files.photo[0].filename}` : "",
          photo2: req.files.photo2 ? `${baseUrl}/uploads/${req.files.photo2[0].filename}` : "",
          photo3: req.files.photo3 ? `${baseUrl}/uploads/${req.files.photo3[0].filename}` : "",
          photo4: req.files.photo4 ? `${baseUrl}/uploads/${req.files.photo4[0].filename}` : ""
        };
        res.status(200).json(photos);
      } catch (error) {
        res.status(500).json({ error: 'Error al subir la imagen' });
      }
    });

    // Ruta para crear un nuevo producto
    this.create("/", async (req, res, next) => {
      try {
        const data = req.body;
        const createdProduct = await productManager.create(data);
        return res.status(201).json({
          message: 'Product created successfully',
          product: createdProduct,
        });
      } catch (error) {
        next(error);
      }
    });

    // Ruta para actualizar un producto por ID
    this.update("/:pid", async (req, res, next) => {
      try {
        const { pid } = req.params;
        const newData = req.body;
        const updatedProduct = await productManager.update(pid, newData);
        return res.status(200).json(updatedProduct);
      } catch (error) {
        next(error);
      }
    });

    // Ruta para eliminar un producto por ID
    this.destroy("/:pid", async (req, res, next) => {
      try {
        const { pid } = req.params;
        const deletedProduct = await productManager.destroy(pid);
        return res.status(200).json(deletedProduct);
      } catch (error) {
        next(error);
      }
    });
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();

import { Router } from "express";
import usersManager from "../../data/mongo/managers/UserManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";
import createHashPassword from "../../middlewares/createHashPassword.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", passport.authenticate("register", { session: false }) , async (req, res, next) => {
  try {
    return res.json({ statusCode:  201 ,message: "Registered!" });
  } catch (error) {
    return next(error);
  }
})

sessionsRouter.post("/login", passport.authenticate("login", { session: false }), async (req, res, next) => {
  try {
    // Asumiendo que el rol del usuario está disponible en req.user.role después de la autenticación exitosa
    const userRole = req.user.role;

    // Redirige basado en el rol del usuario
    if (userRole === 'admin') {
      // Suponiendo que quieres enviar una respuesta JSON con la URL a la que el cliente debe redirigir
      return res.json({ statusCode: 200, message: "Logged in!", redirectUrl: "/admin" });
    } else if (userRole === 'user') {
      return res.json({ statusCode: 200, message: "Logged in!", redirectUrl: "/" });
    } else {
      // Manejar otros roles o casos inesperados
      return res.json({ statusCode: 200, message: "Logged in!", redirectUrl: "/" });
    }
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.status(200).json({
        message: "Is online!",
        user_id: req.session.user_id,
        role: req.session.role,
        online: true,
      });
    }
    return res.status(401).json({
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/signout", (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;

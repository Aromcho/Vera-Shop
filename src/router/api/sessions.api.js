import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import { signedCookie } from "cookie-parser";

const sessionsRouter = Router();

sessionsRouter.post("/register", passport.authenticate("register", { session: false }), async (req, res, next) => {
  try {
    return res.json({ statusCode: 201, message: "Registered!" });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/login", passport.authenticate("login", { session: false }), async (req, res, next) => {
  try {
    const userRole = req.user.role;
    const token = req.user.token;

    if (userRole === 'admin') {
      return res
        .cookie('jwt', token, { httpOnly: true, signed: true })
        .json({ statusCode: 200, message: "Logged in!", redirectUrl: "/admin" });
    } else {
      return res
        .cookie('jwt', token, { httpOnly: true, signed: true })
        .json({ statusCode: 200, message: "Logged in!", redirectUrl: "/" });
    }
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/online", isAuth, async (req, res, next) => {
  try {
    if (req.user) {
      return res.json({
        statusCode: 200,
        message: "Is online!",
        user_id: req.user.user_id,
        role: req.user.role,
      });
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/signout", (req, res, next) => {
  try {
    res.clearCookie('jwt');
    return res.status(200).json({ message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

sessionsRouter.get("/google/callback", passport.authenticate("google", { session: false }), (req, res, next) => {
  try {
    const token = req.user.token;
    return res
      .cookie('jwt', token, { httpOnly: true, signed: true })
      .json({ statusCode: 200, message: "Logged in!", redirectUrl: "/" });
  } catch (error) {
    next(error);
  }
});

export default sessionsRouter;

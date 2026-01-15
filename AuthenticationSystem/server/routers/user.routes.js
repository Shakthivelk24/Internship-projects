import express from "express";
import isAuth from "../middleware/isAuth";
import { getCurrentUser } from "../controllers/user.controllers.js";

const userRoutes = express.Router();

userRoutes.get("/current", isAuth, getCurrentUser);

export default userRoutes;

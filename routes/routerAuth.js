import express from "express";

import help from "../controllers/help/help.js";
import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";
import register from "../controllers/auth/register.js";
import updateUser from "../controllers/auth/updateUser.js";
import currentUser from "../controllers/auth/currentUser.js";
import changeTheme from "../controllers/auth/changeTheme.js";
import googleAuth from "../controllers/auth/googleAuth.js";
import googleRedirect from "../controllers/auth/googleRedirect.js";

import upload from "../middlewares/upload.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const routerAuth = express.Router();

routerAuth.get("/google", googleAuth);

routerAuth.get("/google-redirect", googleRedirect);

routerAuth.get("/current", isAuthorized, currentUser);

routerAuth.post("/register", register);

routerAuth.post("/login", login);

routerAuth.post("/logout", isAuthorized, logout);

routerAuth.post("/help", isAuthorized, help);

routerAuth.patch("/theme", isAuthorized, changeTheme);

routerAuth.put("/update", isAuthorized, upload.single("avatar"), updateUser);

export default routerAuth;

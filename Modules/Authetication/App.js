import Router from "@koa/router";
const router = new Router();

//import pages
import login from "./Login/index.js";

//routes Declarations
router.post("/v1/authe/login", login);

export default router;

import Router from "@koa/router";
const router = new Router();

//import pages
import Uploads from "./Uploads.js";
import Delete from "./Delete/index.js";

//routes Declarations
router.post("/v1/uploads/new", Uploads);
router.post("/v1/uploads/delete", Delete);

export default router;

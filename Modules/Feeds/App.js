import Router from "@koa/router";
const router = new Router();

//import pages
import Compose from "./Compose/index.js";
import PersonalizedFeeds from "./PersonalizedFeeds/index.js";

//routes Declarations
router.post("/v1/feeds/compose", Compose);
router.get("/v1/feeds/personalized", PersonalizedFeeds);

export default router;

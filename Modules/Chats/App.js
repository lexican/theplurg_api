import Router from "@koa/router";
const router = new Router();

//import pages
import { ChatLists, ChatSenderDetails } from "./pages/ChatLists.js";

//routes Declarations
router.get("/v1/chat/lists", ChatLists);
router.get("/v1/chat/chat_sender_details", ChatSenderDetails);

export default router;

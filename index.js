//import default modules

// require('dotenv').config();

import Koa from "koa";
import koaBody from "koa-body";
import compress from "koa-compress";
import Router from "@koa/router";
import cors from "@koa/cors";
import logger from "koa-logger";
import serve from "koa-static";

//import api calls
import Authetication from "./Modules/Authetication/App.js"
import Feeds from "./Modules/Feeds/App.js";
import Uploads from "./Modules/Uploads/App.js";
import Abstract_API from "./Modules/Abstract_API/App.js";
import Chats from "./Modules/Chats/App.js";
import Marketplace from "./Modules/Marketplace/App.js";

import Payment from './Modules/Payment/index.js';

//import middleware paths
import SystemKey from './Firewalls/SystemKey.js'
import UserToken from './Firewalls/UserToken.js'

import { Server } from "./server.js";

//init default modules
const app = new Koa();
const router = new Router();

//Middleware calls
app.use(logger());
app.use(cors());
app.use(compress({ threshold: 2048 }));
app.use(serve("public"));
app.use(SystemKey);
app.use(UserToken);

app.use(
    koaBody({
        formLimit: "7mb",
        multipart: true, // Allow multiple files to be uploaded
        formidable: {
            maxFileSize: 700 * 1024 * 1024, //Upload file size
            keepExtensions: true //  Extensions to save images
        }
    })
);

// app.use((request, response, next) => {
//     if (this.request.headers['x-forwarded-proto'] !== 'https') {
//         return response.redirect(`https://${request.headers.host}${request.url}`);
//     }
//     return next();
// });

//init routes in middleware
app.use(Authetication.routes()).use(router.allowedMethods());
app.use(Feeds.routes()).use(router.allowedMethods());
app.use(Chats.routes()).use(router.allowedMethods());
app.use(Uploads.routes()).use(router.allowedMethods());
app.use(Abstract_API.routes()).use(router.allowedMethods());
app.use(Marketplace.routes()).use(router.allowedMethods());

app.use(Payment.routes()).use(router.allowedMethods());

//Listening to server port
var port = process.env.PORT || 5000;
app.listen(port);

Server(app);

console.log(`listen in ${port}`);

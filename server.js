import WebSocket from "ws";
import http from "http";
import url from "url";

import { SingleChat } from "./Sockets/Chats/SingleChat.js";

const server = http.createServer();

export const Server = app => {
  const SingleChatServer = new WebSocket.Server({ noServer: true });
  SingleChat(SingleChatServer);
  
  server.on("upgrade", function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    const getURL = pathname.split("/")[1];
    // var chatIDReg = new RegExp("^[0-9]+$");
    switch (getURL) {
      case "single_chat":
        SingleChatServer.handleUpgrade(request, socket, head, ws => {
          SingleChatServer.emit("connection", ws, request);
        });
        break;
      default:
        socket.destroy();
    }
  });
  server.listen(8080);
};

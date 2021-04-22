import query from "../../Controller/Query.js"
import url from "url";
import { API_FETCH } from "../../theplurg.config.js";


export const SingleChat = wss => {
  wss.on("connection", function connection(ws, request) {
    const pathname = url.parse(request.url).pathname;
    const getChatID = pathname.split("/")[2];

    ws.on("message", async data => {
      const receivedWireData = JSON.parse(data);
      const passingData = {
        conversation_id: receivedWireData.params.c_id
      };

      let request = await API_FETCH(
        "v1/chat/watch",
        passingData,
        receivedWireData.authorization
      );
      wss.clients.forEach(async client => {
        if (receivedWireData.params.c_id == getChatID) {
          client.send(JSON.stringify(request));
          if (request.length) {
            let uploadReadStatusSql = `UPDATE conversation_reply SET read_status='0' WHERE user_id_fk<>${receivedWireData.params.uid} and c_id_fk=${receivedWireData.params.c_id}`;
            await query(uploadReadStatusSql).then(response => response);
          }
          client.close();
        }
      });
    });
  });
};

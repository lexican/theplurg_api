import fetch from "node-fetch";

var port = process.env.PORT || 5000;

export const Config =  {
    API_BASE_URI : "http://localhost:" + port +  "/"
}

export const API_FETCH = async (uri,data,authorization) => {
    let request = await fetch(API_BASE_URI + uri, {
      method: "get",
      headers: {
        authorization: authorization,
        "abstract-data": JSON.stringify(data)
      }
    });
    let response = await request.json()
    return response
}
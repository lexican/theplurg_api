import query from "../Controller/Query.js"

const system = async (ctx, next) => {
  const key = ctx.request.header["authorization"];

  const unauthorizedAction = () => {
    ctx.body = JSON.stringify({statusCode: 406, response: "Unauthorized Request"})
    ctx.status = 406;
    return;
  };

  if (!key) return unauthorizedAction();
  const system_key = key.split(":")[0];
  if (!system_key) return unauthorizedAction();

  const sql = `select applicationToken from system_configurations  WHERE applicationToken = ?`;
  await query(sql, [system_key]).then(response => {
    if (response.length)
      return response[0].applicationToken ? next() : unauthorizedAction();
    return unauthorizedAction();
  });
};

export default system;

import query from "../../../Controller/Query.js";

export const NationStates = async ctx => {
  const {selectOptions} = JSON.parse(ctx.request.header["abstract-data"]);
  const result = `SELECT state_name FROM data_nation_states`;
  const fetched = await query(result).then(response => response);
  let response = {}
  if(selectOptions === true){
      let items = []
       for (let i = 0; i < fetched.length; i++) {
         items.push({
           name: fetched[i].state_name,
           id: i + 900,
           children: [],
         });
       }
       response = items;
  }else {
    response = fetched
  }
  ctx.body = JSON.stringify({ statusCode: 200, response: response });
  ctx.status = 200;
};

export const NationLGA = async ctx => {
   try {
     const { state_name, selectOptions } = JSON.parse(
       ctx.request.header["abstract-data"]
     );
      let sql = `SELECT nation_lga_id, lga_name FROM data_nation_lga WHERE state_name='${state_name}'`;
     const fetched = await query(sql).then(response => response);
    let response = {};
    if (selectOptions === true) {
      let items = [];
      for (let i = 0; i < fetched.length; i++) {
        items.push({
          name: fetched[i].lga_name,
          id: fetched[i].nation_lga_id
        });
      }
      response = items;
    } else {
      response = fetched;
    }
    ctx.body = JSON.stringify({ statusCode: 200, response: response });
    ctx.status = 200;
   } catch (error) {
     console.log(error);
   }
}

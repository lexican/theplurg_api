import query from '../../Controller/Query.js'

export const GetNationalLgaById = async id => {
    const sql = `SELECT * FROM data_nation_lga WHERE nation_lga_id=${id}`
    let response = await query(sql).then(response => response);
    return response[0]
}




//in case if 'categoria_id' is null, products of all categories should be listed
function list(categoria_id) {
    return new Promise((resolve, reject) => {
        let sql = global.sql;
        let query = "SELECT * FROM produtos"
            + (categoria_id ? " WHERE categoria_id = ?" : "")
            + " ORDER BY preco DESC;";
        sql.query(query, [categoria_id], (error, results) => {
            if (error) {
                console.error("Erro ao listar produtos: ", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


function search(search_text) {
    return new Promise((resolve, reject) => {
        let sql = global.sql;
        let query = "SELECT * FROM produtos WHERE (nome LIKE ?) OR (descricao LIKE ?) ORDER BY preco DESC;";
        sql.query(query, [`%${search_text}%`, `%${search_text}%`], (error, results) => {
            if (error) {
                console.error("Erro ao buscar produtos: ", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


function get(id) {
    return new Promise((resolve, reject) => {
        let sql = global.sql;
        let query = "SELECT * FROM produtos WHERE id = ?;";
        sql.query(query, [id], (error, results) => {
            if (error) {
                console.error("Erro ao listar produtos: ", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


module.exports = {
    list,
    search,
    get
};
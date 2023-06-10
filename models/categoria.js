

function list(callback) {
    return new Promise((resolve, reject) => {
        let sql = global.sql;
        sql.query("SELECT * FROM categorias", (error, results) => {
            if (error) {
                console.error("Erro ao listar categorias: ", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


module.exports = {
    list
}
const mysql = require("mysql");


global.sql = null;


function connectMySQL() {
    let conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ecommerce'
    });
    conn.connect((error) => {
        if (error)
            console.error("Erro ao conectar no banco de dados: ", error);
    });
    global.sql = conn;
}


module.exports = {
    connectMySQL
};
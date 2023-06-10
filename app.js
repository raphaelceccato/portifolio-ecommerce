const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MemoryStore = require('memorystore')(session)
const db = require("./utils/database.js");


const app = express();
const port = 8085;


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  cookie: { maxAge: 10 * 24 * 3600 * 1000},
  store: new MemoryStore({
    checkPeriod: 24 * 3600 * 1000
  }),
  resave: false,
  secret: '458305984390584958'
}));
app.use(express.static("public"));


//controllers
const main_controller = require("./controllers/main_controller.js");
const carrinho_controller = require("./controllers/carrinho_controller.js");
app.use("/", main_controller);
app.use("/carrinho", carrinho_controller);


db.connectMySQL();
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

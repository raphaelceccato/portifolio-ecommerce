const express = require("express");
const Produto = require("../models/produto.js");
const Categoria = require("../models/categoria.js")


let router = express.Router();
module.exports = router;


router.get("/", (req, res) => {
    return res.redirect("/produtos");
});


router.get("/produtos", (req, res) => {
    let _categorias = [];
    let _produtos = [];
    let searchText = (req.query.busca ?? "").trim();

    Categoria.list()
    .then((results) => {
        _categorias = results;

        if (searchText != "")
            return Produto.search(searchText);
        else
            return Produto.list(req.query.categoria);
    }).then((results) => {
        _produtos = results;
        res.render("main", {
            page: "produtos",
            produtos: _produtos,
            categorias: _categorias,
            current_categoria: req.query.categoria,
            searchText: searchText
        });
    }).catch((error) => {
        res.sendStatus(500);
    });
});


router.get("/produto/:productId", (req, res) => {
    let productId = parseInt(req.params.productId ?? "0");
    Produto.get(productId)
    .then(results => {
        if (results.length == 0) //no product with this id
            return res.redirect("404");
        let p = results[0];
        return res.render("main", {page: "produto", produto: p});
    })
    .catch(error => {
        console.error(`Erro ao acessar produto com id '${productId}': `, error);
        return res.error(500);
    })
});


router.get("/sobre", (req, res) => {
    return res.render("main", {page: "sobre"});
});


router.get("/contato", (req, res) => {
    return res.render("main", {page: "contato"});
});


router.get("/pagamento", (req, res) => {
    return res.render("main", {page: "pagamento"});
})
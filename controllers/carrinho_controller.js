const express = require("express");
const Produto = require("../models/produto.js");

let router = express.Router();
module.exports = router;


const MIN_AMOUNT = 1;
const MAX_AMOUNT = 999;


function addToCart(sess, productId, amount) {
    if (isNaN(productId) || isNaN(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT)
        return;
    let cart = sess.cart ?? {};
    cart[productId] = amount;
    sess.cart = cart;
}


function removeFromCart(sess, productId) {
    if (isNaN(productId))
        return;
    let cart = sess.cart ?? {};
    delete cart[productId];
    sess.cart = cart;
}


function getCart(sess) {
    return sess.cart ?? {};
}


function clearCart(sess) {
    delete sess.cart;
}


router.get("/", (req, res) => { //url: /carrinho/
    if (req.query.buy != null) { //happens when the user clicks on "buy"
        let productId = req.query.buy;
        addToCart(req.session, productId, 1);
    }

    //list products to get the their complete information
    (async () => {
        let produtos = [];

        for (const [id, amount] of Object.entries(getCart(req.session))) {
            await Produto.get(id)
            .then((results) => {
                let p = results[0];
                p.amount = amount;
                produtos.push(p);
            })
            .catch((error) => {
                console.log("Erro ao obter produto de id '" + id.toString() + "': ", error);
                return res.error(500);
            });
        }

        return res.render("main", {page: "carrinho", produtos: produtos}); //to do: list cart products
    })();
});


router.post("/add", (req, res) => { //url: /carrinho/add
    let productId = req.body.id;
    addToCart(req.session, productId, 1);
    return res.json({result: "ok"});
});


router.post("/edit", (req, res) => { //url: /carrinho/edit
    let productId = req.body.id;
    addToCart(req.session, productId, 1);
    return res.json({result: "ok"});
});


router.post("/remove", (req, res) => { //url: /carrinho/remove
    let productId = req.body.id;
    removeFromCart(req.session, productId, 1);
    return res.json({result: "ok"});
});


router.post("/amount", (req, res) => { //url: /carrinho/amount
    let productId = req.body.id;
    let amount = req.body.amount;
    addToCart(req.session, productId, amount);
    return res.json({result: "ok"});
});


router.post("/clear", (req, res) => {
    clearCart(req.session);
    return res.json({result: "ok"});
});


router.post("/finish", (req, res) => {
    (async () =>  {
        let idCompra = 0;
        let notEnoughProductIds = []; //ids of products that we don't have enough amount in stock
        let hadError = false;

        //check if cart is empty
        if (Object.values(getCart(req.session)).length == 0) {
            return res.json({result: "fail", msg: "O carrinho está vazio."});
        }

        //check if we have enough amount of all products
        for (const [id, amount] of Object.entries(getCart(req.session))) {
            await Produto.get(id)
            .then((result) => {
                let p = result[0];
                if (p.estoque < amount) {
                    notEnoughProductIds.push(id);
                }
            })
            .catch((error) => {
                console.error("Erro ao finalizar compra: ", error);
                hadError = true;
            });

            if (hadError)
                break;
        }

        if (hadError) {
            let msg = "Desculpe, ocorreu um erro ao processar a solicitação. Favor tentar novamente";
            return res.json({result: "fail", msg});
        }
        if (notEnoughProductIds.length > 0) {
            let msg = "A quantidade de algum(s) produto(s) excede o nosso estoque. Por favor tente novamente com uma quantidade menor";
            return res.json({result: "fail", msg, notEnoughProductIds});
        }

        //to do: generate idCompra, store in database and reserve products
        return res.json({result: "ok", destPage: `/pagamento?compra=${idCompra}`});
    })();
});
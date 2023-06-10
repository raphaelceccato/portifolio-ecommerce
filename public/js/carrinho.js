const MIN_VALUE = 1;
const MAX_VALUE = 999;

function onAmountChange(input, productId) {
    let value = input.value;
    if (isNaN(value) || value < MIN_VALUE || value > MAX_VALUE) {
        value = Math.max(MIN_VALUE, Math.min(value, MAX_VALUE));
        input.value = value;
    }

    
    fetch("/carrinho/amount", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: productId, amount: value})
    });
}


function clearCart() {
    fetch("/carrinho/clear", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
       location.href = "/carrinho";
    }).catch(error => {
        location.href = "/carrinho";
    });
}


function finishPurchase() {
    fetch("/carrinho/finish", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
    .then(data => {
        if (data.result == "ok")
            location.href = data.destPage;
        else if (data.result == "fail") {
            let msg = document.getElementById("msg");
            msg.style.display = "block";
            msg.innerText = data.msg;
            
            for (let pdiv of document.querySelectorAll("[id^='produto-']")) {
                pdiv.classList.remove("border-danger");
            }
            if (data.notEnoughProductIds != null && data.notEnoughProductIds.length > 0) {
                for (const id of data.notEnoughProductIds) {
                    let pdiv = document.getElementById(`produto-${id}`);
                    pdiv.classList.add("border-danger");
                }
            }
        }
    }).catch(error => {
        console.error("Erro ao finalizar compra: ", error);
    });
}
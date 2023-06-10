function add_to_cart(button, id) {
    const url = "/carrinho/add";
    const data = { id: id};

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        let tooltip = new bootstrap.Tooltip(button, {
            title: "Produto adicionado ao carrinho!",
            placement: "bottom",
            trigger: "manual"
        });
        tooltip.show();
        setInterval(() => tooltip.dispose(), 4000);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
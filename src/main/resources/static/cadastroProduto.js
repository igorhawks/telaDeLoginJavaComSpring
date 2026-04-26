const API_URL = "http://72.60.55.125:8080/product";

async function createProduct() {

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    const message = document.getElementById("productMessage");

    if (!name || !price) {
        message.innerText = "Preencha todos os campos";
        return;
    }

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                name: name,
                price: parseFloat(price)
            })
        });

        if (response.ok) {

            message.innerText = "Produto cadastrado com sucesso";

            limparCampos();

        }
        else {

            message.innerText = "Erro ao cadastrar produto";

        }

    }
    catch (error) {

        message.innerText = "Erro ao conectar com a API";

    }

}

function limparCampos() {

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";

}

function voltarHome() {

    window.location.href = "telainicial.html";

}

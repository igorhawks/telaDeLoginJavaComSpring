const API_URL = "/product"; // Usando caminho relativo para evitar dor de cabeça

async function createProduct() {

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const message = document.getElementById("productMessage");

    if (!name || !price) {
        message.innerText = "Preencha todos os campos";
        return;
    }

    const token = localStorage.getItem("token");

    // 👇 Teste 1: Verifica se o token realmente existe no navegador
    console.log("Token capturado: ", token);

    if (!token) {
        message.innerText = "Erro: Você não está logado! Token ausente.";
        return;
    }

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
        else if (response.status === 403) {
            // 👇 Teste 2: Se der erro 403, é falta de permissão de ADMIN
            message.innerText = "Erro 403: Seu usuário não é ADMIN.";
        }
        else if (response.status === 401) {
            // 👇 Teste 3: Se der erro 401, o token expirou ou é inválido
            message.innerText = "Erro 401: Token inválido ou expirado. Faça login novamente.";
        }
        else {
            message.innerText = "Erro ao cadastrar produto. Status: " + response.status;
        }

    }
    catch (error) {
        message.innerText = "Erro ao conectar com a API";
        console.error(error);
    }
}

function limparCampos() {
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
}

function voltarHome() {
    window.location.href = "telainicial.html";
}
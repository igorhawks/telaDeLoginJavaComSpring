const API_URL = "http://localhost:8081/auth";

function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

/* NOVO: limpa os campos do login */
function clearLoginFields() {
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginMessage").innerText = "";
}

/* NOVO: limpa os campos do cadastro */
function clearRegisterFields() {
    document.getElementById("registerUsername").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerRole").value = "USER";
    document.getElementById("registerMessage").innerText = "";
}

async function login() {

    const login = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        });

        if (response.ok) {

            const data = await response.json();

            localStorage.setItem("token", data.token);

            window.location.href = "telainicial.html";

        } else {

            document.getElementById("loginMessage").innerText =
                "Login inválido";

        }

    } catch (error) {

        document.getElementById("loginMessage").innerText =
            "Erro ao conectar com a API";

        console.error(error);

    }

}

async function register() {

    const login = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const role = document.getElementById("registerRole").value;

    try {

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: login,
                password: password,
                role: role
            })
        });

        if (response.ok) {

            document.getElementById("registerMessage").innerText =
                "Usuário cadastrado com sucesso";

            /* AJUSTE PRINCIPAL */
            clearRegisterFields(); // limpa cadastro
            showLogin();           // volta para login
            clearLoginFields();    // limpa login

        } else {

            document.getElementById("registerMessage").innerText =
                "Usuário já existe";

        }

    } catch (error) {

        document.getElementById("registerMessage").innerText =
            "Erro ao conectar com a API";

        console.error(error);

    }

}
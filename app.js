const botao = document.getElementById("btnAdicionar");
const corpoTabela = document.querySelector("#tabela tbody");

botao.addEventListener("click", adicionarAtivo);

function adicionarAtivo() {

    const tipo = document.getElementById("tipo").value;
    const ticker = document.getElementById("ticker").value;
    const quantidade = document.getElementById("qtd").value;
    const preco = document.getElementById("pm").value;
    const cotacao = document.getElementById("cotacao").value;

    if (
        ticker.trim() === "" ||
        quantidade === "" ||
        preco === "" ||
        cotacao === ""
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${tipo}</td>
        <td>${ticker.toUpperCase()}</td>
        <td>${quantidade}</td>
        <td>R$ ${parseFloat(preco).toFixed(2)}</td>
        <td>R$ ${parseFloat(cotacao).toFixed(2)}</td>
    `;

    corpoTabela.appendChild(linha);

    document.getElementById("ticker").value = "";
    document.getElementById("qtd").value = "";
    document.getElementById("pm").value = "";
    document.getElementById("cotacao").value = "";

    document.getElementById("ticker").focus();
}
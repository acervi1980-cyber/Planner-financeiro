const STORAGE_KEY = "planner";

const modal = document.getElementById("modal");
const modalExcluir = document.getElementById("modalExcluir");
const formAtivo = document.getElementById("formAtivo");
const categoria = document.getElementById("cat");
const moeda = document.getElementById("moeda");
const ticker = document.getElementById("tic");
const quantidade = document.getElementById("qtd");
const precoMedio = document.getElementById("pm");
const cotacao = document.getElementById("cot");
const tabela = document.getElementById("tb");
const buscaAtivo = document.getElementById("buscaAtivo");
const filtroCategoria = document.getElementById("filtroCategoria");
const estadoVazio = document.getElementById("estadoVazio");
const contadorAtivos = document.getElementById("contadorAtivos");
const tituloModal = document.getElementById("tituloModal");
const subtituloModal = document.getElementById("subtituloModal");
const textoConfirmacao = document.getElementById("textoConfirmacao");

const valorInvestidoEl = document.getElementById("valorInvestido");
const valorMercadoEl = document.getElementById("valorMercado");
const lucroPrejuizoEl = document.getElementById("lucroPrejuizo");

let ativos = carregarAtivos();
let ativoEmEdicaoId = null;
let ativoParaExcluirId = null;
let ordenacao = { campo: "t", direcao: "asc" };

function criarId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `ativo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function carregarAtivos() {
  try {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(dados)) {
      return [];
    }

    return dados.map((ativo) => {
      const preco = Number(ativo.p ?? ativo.precoMedio ?? 0);
      const tipo = String(ativo.c ?? ativo.categoria ?? "FII");

      return {
        id: ativo.id || criarId(),
        t: String(ativo.t ?? ativo.ticker ?? "").toUpperCase(),
        c: tipo,
        m: ativo.m ?? ativo.moeda ?? inferirMoeda(tipo),
        q: Number(ativo.q ?? ativo.quantidade ?? 0),
        p: preco,
        cot: Number(ativo.cot ?? ativo.cotacao ?? preco)
      };
    });
  } catch (erro) {
    console.error("Não foi possível carregar a carteira:", erro);
    return [];
  }
}

function inferirMoeda(tipo) {
  return tipo === "Stock" || tipo === "ETF Internacional" ? "USD" : "BRL";
}

function formatarMoeda(valor, codigoMoeda) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: codigoMoeda,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor);
}

function descricaoMoeda(codigoMoeda) {
  return codigoMoeda === "USD" ? "🇺🇸 Dólar (US$)" : "🇧🇷 Real (R$)";
}

function classeResultado(valor) {
  if (valor > 0) return "positive";
  if (valor < 0) return "negative";
  return "neutral";
}

function escaparHtml(valor) {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function salvarLocalmente() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ativos));
}

function obterAtivosVisiveis() {
  const termo = buscaAtivo.value.trim().toUpperCase();
  const categoriaSelecionada = filtroCategoria.value;

  return ativos
    .filter((ativo) => {
      const correspondeBusca = !termo || ativo.t.includes(termo);
      const correspondeCategoria =
        categoriaSelecionada === "Todos" || ativo.c === categoriaSelecionada;

      return correspondeBusca && correspondeCategoria;
    })
    .sort((a, b) => compararAtivos(a, b, ordenacao.campo, ordenacao.direcao));
}

function compararAtivos(a, b, campo, direcao) {
  const valorA = a[campo];
  const valorB = b[campo];
  let resultado = 0;

  if (typeof valorA === "number" && typeof valorB === "number") {
    resultado = valorA - valorB;
  } else {
    resultado = String(valorA).localeCompare(String(valorB), "pt-BR", {
      sensitivity: "base"
    });
  }

  return direcao === "asc" ? resultado : -resultado;
}

function atualizar() {
  tabela.innerHTML = "";

  let totalInvestidoBRL = 0;
  let totalMercadoBRL = 0;
  let totalInvestidoUSD = 0;
  let totalMercadoUSD = 0;

  ativos.forEach((ativo) => {
    const investido = ativo.q * ativo.p;
    const mercado = ativo.q * ativo.cot;

    if (ativo.m === "USD") {
      totalInvestidoUSD += investido;
      totalMercadoUSD += mercado;
    } else {
      totalInvestidoBRL += investido;
      totalMercadoBRL += mercado;
    }
  });

  const ativosVisiveis = obterAtivosVisiveis();

  ativosVisiveis.forEach((ativo) => {
    const investido = ativo.q * ativo.p;
    const mercado = ativo.q * ativo.cot;
    const resultado = mercado - investido;

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td><strong>${escaparHtml(ativo.t)}</strong></td>
      <td>${escaparHtml(ativo.c)}</td>
      <td>${descricaoMoeda(ativo.m)}</td>
      <td>${ativo.q.toLocaleString("pt-BR")}</td>
      <td>${formatarMoeda(ativo.p, ativo.m)}</td>
      <td>${formatarMoeda(ativo.cot, ativo.m)}</td>
      <td>${formatarMoeda(investido, ativo.m)}</td>
      <td>${formatarMoeda(mercado, ativo.m)}</td>
      <td class="${classeResultado(resultado)}">${formatarMoeda(resultado, ativo.m)}</td>
      <td>
        <div class="action-buttons">
          <button class="table-action" type="button" data-action="editar" data-id="${ativo.id}">Editar</button>
          <button class="table-action delete" type="button" data-action="excluir" data-id="${ativo.id}">Excluir</button>
        </div>
      </td>
    `;
    tabela.appendChild(linha);
  });

  const possuiBRL = ativos.some((ativo) => ativo.m === "BRL");
  const possuiUSD = ativos.some((ativo) => ativo.m === "USD");

  valorInvestidoEl.textContent = formatarResumo(
    totalInvestidoBRL,
    totalInvestidoUSD,
    possuiBRL,
    possuiUSD
  );

  valorMercadoEl.textContent = formatarResumo(
    totalMercadoBRL,
    totalMercadoUSD,
    possuiBRL,
    possuiUSD
  );

  const lucroBRL = totalMercadoBRL - totalInvestidoBRL;
  const lucroUSD = totalMercadoUSD - totalInvestidoUSD;

  lucroPrejuizoEl.textContent = formatarResumo(
    lucroBRL,
    lucroUSD,
    possuiBRL,
    possuiUSD
  );

  lucroPrejuizoEl.className = classeResultado(lucroBRL + lucroUSD);

  estadoVazio.hidden = ativosVisiveis.length > 0;
  contadorAtivos.textContent = formatarContador(ativosVisiveis.length, ativos.length);

  salvarLocalmente();
}

function formatarResumo(valorBRL, valorUSD, possuiBRL, possuiUSD) {
  if (possuiBRL && possuiUSD) {
    return `${formatarMoeda(valorBRL, "BRL")} · ${formatarMoeda(valorUSD, "USD")}`;
  }

  if (possuiUSD) {
    return formatarMoeda(valorUSD, "USD");
  }

  return formatarMoeda(valorBRL, "BRL");
}

function formatarContador(visiveis, total) {
  const rotulo = total === 1 ? "ativo" : "ativos";

  if (visiveis === total) {
    return `${total} ${rotulo}`;
  }

  return `${visiveis} de ${total} ${rotulo}`;
}

function ajustarMoedaPeloTipo() {
  if (categoria.value === "Stock" || categoria.value === "ETF Internacional") {
    moeda.value = "USD";
  }
}

function limparFormulario() {
  formAtivo.reset();
  categoria.value = "FII";
  moeda.value = "BRL";
  ativoEmEdicaoId = null;
  tituloModal.textContent = "Adicionar ativo";
  subtituloModal.textContent = "Cadastre um novo investimento.";
}

function abrirModalNovoAtivo() {
  limparFormulario();
  modal.showModal();
  ticker.focus();
}

function abrirModalEdicao(id) {
  const ativo = ativos.find((item) => item.id === id);

  if (!ativo) return;

  ativoEmEdicaoId = id;
  categoria.value = ativo.c;
  moeda.value = ativo.m;
  ticker.value = ativo.t;
  quantidade.value = ativo.q;
  precoMedio.value = ativo.p;
  cotacao.value = ativo.cot;
  tituloModal.textContent = "Editar ativo";
  subtituloModal.textContent = `Atualize os dados de ${ativo.t}.`;
  modal.showModal();
  ticker.focus();
}

function solicitarExclusao(id) {
  const ativo = ativos.find((item) => item.id === id);

  if (!ativo) return;

  ativoParaExcluirId = id;
  textoConfirmacao.textContent = `O ativo ${ativo.t} será removido da carteira. Esta ação não poderá ser desfeita.`;
  modalExcluir.showModal();
}

function fecharModalCadastro() {
  modal.close();
}

function fecharModalExclusao() {
  ativoParaExcluirId = null;
  modalExcluir.close();
}

function alternarOrdenacao(campo) {
  if (ordenacao.campo === campo) {
    ordenacao.direcao = ordenacao.direcao === "asc" ? "desc" : "asc";
  } else {
    ordenacao = { campo, direcao: "asc" };
  }

  atualizar();
}

document.getElementById("btnAdicionar").addEventListener("click", abrirModalNovoAtivo);
document.getElementById("btnCancelar").addEventListener("click", fecharModalCadastro);
document.getElementById("btnFecharModal").addEventListener("click", fecharModalCadastro);
document.getElementById("btnCancelarExclusao").addEventListener("click", fecharModalExclusao);

categoria.addEventListener("change", ajustarMoedaPeloTipo);
buscaAtivo.addEventListener("input", atualizar);
filtroCategoria.addEventListener("change", atualizar);

document.querySelectorAll(".sort-button").forEach((botao) => {
  botao.addEventListener("click", () => alternarOrdenacao(botao.dataset.sort));
});

tabela.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-action]");

  if (!botao) return;

  const { action, id } = botao.dataset;

  if (action === "editar") {
    abrirModalEdicao(id);
  }

  if (action === "excluir") {
    solicitarExclusao(id);
  }
});

formAtivo.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dadosAtivo = {
    id: ativoEmEdicaoId || criarId(),
    t: ticker.value.trim().toUpperCase(),
    c: categoria.value,
    m: moeda.value,
    q: Number(quantidade.value),
    p: Number(precoMedio.value),
    cot: Number(cotacao.value)
  };

  if (
    !dadosAtivo.t ||
    dadosAtivo.q <= 0 ||
    dadosAtivo.p < 0 ||
    dadosAtivo.cot < 0
  ) {
    alert("Preencha todos os campos com valores válidos.");
    return;
  }

  if (ativoEmEdicaoId) {
    const indice = ativos.findIndex((ativo) => ativo.id === ativoEmEdicaoId);

    if (indice >= 0) {
      ativos[indice] = dadosAtivo;
    }
  } else {
    ativos.push(dadosAtivo);
  }

  modal.close();
  atualizar();
});

document.getElementById("btnConfirmarExclusao").addEventListener("click", () => {
  if (!ativoParaExcluirId) return;

  ativos = ativos.filter((ativo) => ativo.id !== ativoParaExcluirId);
  fecharModalExclusao();
  atualizar();
});

modal.addEventListener("close", limparFormulario);
modalExcluir.addEventListener("close", () => {
  ativoParaExcluirId = null;
});

atualizar();

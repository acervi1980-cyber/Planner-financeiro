const STORAGE_KEY = "planner";

const modal = document.getElementById("modal");
const formAtivo = document.getElementById("formAtivo");
const categoria = document.getElementById("cat");
const moeda = document.getElementById("moeda");
const ticker = document.getElementById("tic");
const quantidade = document.getElementById("qtd");
const precoMedio = document.getElementById("pm");
const cotacao = document.getElementById("cot");
const tabela = document.getElementById("tb");

const valorInvestidoEl = document.getElementById("valorInvestido");
const valorMercadoEl = document.getElementById("valorMercado");
const lucroPrejuizoEl = document.getElementById("lucroPrejuizo");

let ativos = carregarAtivos();

function carregarAtivos() {
  try {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(dados)) {
      return [];
    }

    return dados.map((ativo) => {
      const preco = Number(ativo.p ?? ativo.precoMedio ?? 0);

      return {
        t: String(ativo.t ?? ativo.ticker ?? "").toUpperCase(),
        c: String(ativo.c ?? ativo.categoria ?? "FII"),
        m: ativo.m ?? ativo.moeda ?? inferirMoeda(ativo.c ?? ativo.categoria),
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

function salvarLocalmente() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ativos));
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
    const resultado = mercado - investido;

    if (ativo.m === "USD") {
      totalInvestidoUSD += investido;
      totalMercadoUSD += mercado;
    } else {
      totalInvestidoBRL += investido;
      totalMercadoBRL += mercado;
    }

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${ativo.t}</td>
      <td>${ativo.c}</td>
      <td>${descricaoMoeda(ativo.m)}</td>
      <td>${ativo.q.toLocaleString("pt-BR")}</td>
      <td>${formatarMoeda(ativo.p, ativo.m)}</td>
      <td>${formatarMoeda(ativo.cot, ativo.m)}</td>
      <td>${formatarMoeda(investido, ativo.m)}</td>
      <td>${formatarMoeda(mercado, ativo.m)}</td>
      <td class="${classeResultado(resultado)}">${formatarMoeda(resultado, ativo.m)}</td>
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

  const resultadoConsolidadoSinal = lucroBRL + lucroUSD;
  lucroPrejuizoEl.className = classeResultado(resultadoConsolidadoSinal);

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

function ajustarMoedaPeloTipo() {
  if (categoria.value === "Stock" || categoria.value === "ETF Internacional") {
    moeda.value = "USD";
  }
}

function limparFormulario() {
  formAtivo.reset();
  categoria.value = "FII";
  moeda.value = "BRL";
}

document.getElementById("btnAdicionar").addEventListener("click", () => {
  modal.showModal();
});

document.getElementById("btnCancelar").addEventListener("click", () => {
  modal.close();
  limparFormulario();
});

categoria.addEventListener("change", ajustarMoedaPeloTipo);

formAtivo.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const novoAtivo = {
    t: ticker.value.trim().toUpperCase(),
    c: categoria.value,
    m: moeda.value,
    q: Number(quantidade.value),
    p: Number(precoMedio.value),
    cot: Number(cotacao.value)
  };

  if (
    !novoAtivo.t ||
    novoAtivo.q <= 0 ||
    novoAtivo.p < 0 ||
    novoAtivo.cot < 0
  ) {
    alert("Preencha todos os campos com valores válidos.");
    return;
  }

  ativos.push(novoAtivo);
  modal.close();
  limparFormulario();
  atualizar();
});

modal.addEventListener("close", () => {
  limparFormulario();
});

atualizar();

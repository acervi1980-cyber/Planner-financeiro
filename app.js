const STORAGE_KEY = "planner";
const THEME_KEY = "planner-theme";
const BACKUP_VERSION = 2;

const modal = document.getElementById("modal");
const modalExcluir = document.getElementById("modalExcluir");
const modalImportacao = document.getElementById("modalImportacao");
const formAtivo = document.getElementById("formAtivo");
const categoria = document.getElementById("cat");
const moeda = document.getElementById("moeda");
const ticker = document.getElementById("tic");
const quantidade = document.getElementById("qtd");
const precoMedio = document.getElementById("pm");
const cotacao = document.getElementById("cot");
const dividendYield = document.getElementById("dy");
const dataCompra = document.getElementById("dataCompra");
const corretora = document.getElementById("corretora");
const favorito = document.getElementById("favorito");
const tabela = document.getElementById("tb");
const buscaAtivo = document.getElementById("buscaAtivo");
const filtroCategoria = document.getElementById("filtroCategoria");
const somenteFavoritos = document.getElementById("somenteFavoritos");
const estadoVazio = document.getElementById("estadoVazio");
const contadorAtivos = document.getElementById("contadorAtivos");
const tituloModal = document.getElementById("tituloModal");
const subtituloModal = document.getElementById("subtituloModal");
const textoConfirmacao = document.getElementById("textoConfirmacao");
const arquivoImportacao = document.getElementById("arquivoImportacao");
const toast = document.getElementById("toast");

const valorInvestidoEl = document.getElementById("valorInvestido");
const valorMercadoEl = document.getElementById("valorMercado");
const lucroPrejuizoEl = document.getElementById("lucroPrejuizo");
const rentabilidadeCarteiraEl = document.getElementById("rentabilidadeCarteira");
const detalheInvestidoEl = document.getElementById("detalheInvestido");
const alocacaoConteudo = document.getElementById("alocacaoConteudo");
const indicadorQuantidade = document.getElementById("indicadorQuantidade");
const indicadorFavoritos = document.getElementById("indicadorFavoritos");
const indicadorDyBRL = document.getElementById("indicadorDyBRL");
const indicadorDyUSD = document.getElementById("indicadorDyUSD");
const indicadorRendimentos = document.getElementById("indicadorRendimentos");
const btnTema = document.getElementById("btnTema");
const iconeTema = document.getElementById("iconeTema");
const textoTema = document.getElementById("textoTema");

const CORES_CATEGORIAS = [
  "#134e3a",
  "#caa13d",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#0891b2",
  "#64748b"
];

let ativos = carregarAtivos();
let ativoEmEdicaoId = null;
let ativoParaExcluirId = null;
let dadosImportacaoPendentes = null;
let ordenacao = { campo: "t", direcao: "asc" };
let toastTimeout = null;

function criarId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `ativo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizarAtivo(ativo) {
  const preco = numeroSeguro(ativo.p ?? ativo.precoMedio);
  const tipo = String(ativo.c ?? ativo.categoria ?? "FII");
  const cotacaoAtual = numeroSeguro(ativo.cot ?? ativo.cotacao, preco);

  return {
    id: String(ativo.id || criarId()),
    t: String(ativo.t ?? ativo.ticker ?? "").trim().toUpperCase(),
    c: tipo,
    m: ativo.m ?? ativo.moeda ?? inferirMoeda(tipo),
    q: numeroSeguro(ativo.q ?? ativo.quantidade),
    p: preco,
    cot: cotacaoAtual,
    dy: numeroSeguro(ativo.dy ?? ativo.dividendYield),
    data: validarData(ativo.data ?? ativo.dataCompra ?? ""),
    corretora: String(ativo.corretora ?? "").trim(),
    favorito: Boolean(ativo.favorito)
  };
}

function carregarAtivos() {
  try {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(dados)) {
      return [];
    }

    return dados.map(normalizarAtivo).filter((ativo) => ativo.t);
  } catch (erro) {
    console.error("Não foi possível carregar a carteira:", erro);
    return [];
  }
}

function numeroSeguro(valor, padrao = 0) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : padrao;
}

function validarData(valor) {
  if (!valor || !/^\d{4}-\d{2}-\d{2}$/.test(String(valor))) {
    return "";
  }

  return String(valor);
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
  }).format(numeroSeguro(valor));
}

function formatarPercentual(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numeroSeguro(valor) / 100);
}

function formatarData(valor) {
  if (!valor) return "—";

  const [ano, mes, dia] = valor.split("-");
  return `${dia}/${mes}/${ano}`;
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
  const termo = buscaAtivo.value.trim().toLocaleUpperCase("pt-BR");
  const categoriaSelecionada = filtroCategoria.value;
  const filtrarFavoritos = somenteFavoritos.checked;

  return ativos
    .filter((ativo) => {
      const textoBusca = `${ativo.t} ${ativo.corretora}`.toLocaleUpperCase("pt-BR");
      const correspondeBusca = !termo || textoBusca.includes(termo);
      const correspondeCategoria =
        categoriaSelecionada === "Todos" || ativo.c === categoriaSelecionada;
      const correspondeFavorito = !filtrarFavoritos || ativo.favorito;

      return correspondeBusca && correspondeCategoria && correspondeFavorito;
    })
    .sort((a, b) => compararAtivos(a, b, ordenacao.campo, ordenacao.direcao));
}

function compararAtivos(a, b, campo, direcao) {
  const valorA = a[campo];
  const valorB = b[campo];
  let resultado = 0;

  if (typeof valorA === "number" && typeof valorB === "number") {
    resultado = valorA - valorB;
  } else if (typeof valorA === "boolean" && typeof valorB === "boolean") {
    resultado = Number(valorA) - Number(valorB);
  } else {
    resultado = String(valorA ?? "").localeCompare(String(valorB ?? ""), "pt-BR", {
      sensitivity: "base"
    });
  }

  return direcao === "asc" ? resultado : -resultado;
}

function calcularTotais() {
  const totais = {
    BRL: { investido: 0, mercado: 0, rendimentos: 0, dyPonderado: 0 },
    USD: { investido: 0, mercado: 0, rendimentos: 0, dyPonderado: 0 }
  };

  ativos.forEach((ativo) => {
    const grupo = totais[ativo.m] || totais.BRL;
    const investido = ativo.q * ativo.p;
    const mercado = ativo.q * ativo.cot;
    const rendimentos = mercado * (ativo.dy / 100);

    grupo.investido += investido;
    grupo.mercado += mercado;
    grupo.rendimentos += rendimentos;
    grupo.dyPonderado += mercado * ativo.dy;
  });

  Object.values(totais).forEach((grupo) => {
    grupo.dyMedio = grupo.mercado > 0 ? grupo.dyPonderado / grupo.mercado : 0;
    grupo.lucro = grupo.mercado - grupo.investido;
    grupo.rentabilidade =
      grupo.investido > 0 ? (grupo.lucro / grupo.investido) * 100 : 0;
  });

  return totais;
}

function atualizar() {
  tabela.innerHTML = "";

  const totais = calcularTotais();
  const ativosVisiveis = obterAtivosVisiveis();

  ativosVisiveis.forEach((ativo) => {
    const investido = ativo.q * ativo.p;
    const mercado = ativo.q * ativo.cot;
    const resultado = mercado - investido;
    const rentabilidade = investido > 0 ? (resultado / investido) * 100 : 0;

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td class="favorite-column">
        <button
          class="favorite-button ${ativo.favorito ? "active" : ""}"
          type="button"
          data-action="favorito"
          data-id="${ativo.id}"
          aria-label="${ativo.favorito ? "Remover" : "Adicionar"} ${escaparHtml(ativo.t)} dos favoritos"
          title="${ativo.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
        >★</button>
      </td>
      <td><strong>${escaparHtml(ativo.t)}</strong></td>
      <td>${escaparHtml(ativo.c)}</td>
      <td>${descricaoMoeda(ativo.m)}</td>
      <td>${ativo.q.toLocaleString("pt-BR")}</td>
      <td>${formatarMoeda(ativo.p, ativo.m)}</td>
      <td>${formatarMoeda(ativo.cot, ativo.m)}</td>
      <td>${formatarMoeda(investido, ativo.m)}</td>
      <td>${formatarMoeda(mercado, ativo.m)}</td>
      <td class="${classeResultado(resultado)}">${formatarMoeda(resultado, ativo.m)}</td>
      <td class="${classeResultado(rentabilidade)}">${formatarPercentual(rentabilidade)}</td>
      <td>${formatarPercentual(ativo.dy)}</td>
      <td class="muted-cell">${formatarData(ativo.data)}</td>
      <td class="muted-cell">${ativo.corretora ? escaparHtml(ativo.corretora) : "—"}</td>
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
    totais.BRL.investido,
    totais.USD.investido,
    possuiBRL,
    possuiUSD
  );

  valorMercadoEl.textContent = formatarResumo(
    totais.BRL.mercado,
    totais.USD.mercado,
    possuiBRL,
    possuiUSD
  );

  lucroPrejuizoEl.textContent = formatarResumo(
    totais.BRL.lucro,
    totais.USD.lucro,
    possuiBRL,
    possuiUSD
  );

  const resultadoSinal = totais.BRL.lucro + totais.USD.lucro;
  lucroPrejuizoEl.className = classeResultado(resultadoSinal);

  rentabilidadeCarteiraEl.textContent = formatarRentabilidadeResumo(
    totais,
    possuiBRL,
    possuiUSD
  );
  rentabilidadeCarteiraEl.className = `card-detail ${classeResultado(resultadoSinal)}`;

  detalheInvestidoEl.textContent = formatarContador(ativos.length, ativos.length);
  estadoVazio.hidden = ativosVisiveis.length > 0;
  contadorAtivos.textContent = formatarContador(ativosVisiveis.length, ativos.length);

  atualizarIndicadores(totais, possuiBRL, possuiUSD);
  renderizarAlocacao();

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

function formatarRentabilidadeResumo(totais, possuiBRL, possuiUSD) {
  if (possuiBRL && possuiUSD) {
    return `${formatarPercentual(totais.BRL.rentabilidade)} em R$ · ${formatarPercentual(totais.USD.rentabilidade)} em US$`;
  }

  if (possuiUSD) {
    return formatarPercentual(totais.USD.rentabilidade);
  }

  return formatarPercentual(totais.BRL.rentabilidade);
}

function formatarContador(visiveis, total) {
  const rotuloTotal = total === 1 ? "ativo" : "ativos";

  if (visiveis === total) {
    return `${total} ${rotuloTotal}`;
  }

  return `${visiveis} de ${total} ${rotuloTotal}`;
}

function atualizarIndicadores(totais, possuiBRL, possuiUSD) {
  indicadorQuantidade.textContent = ativos.length.toLocaleString("pt-BR");
  indicadorFavoritos.textContent = ativos.filter((ativo) => ativo.favorito).length.toLocaleString("pt-BR");
  indicadorDyBRL.textContent = formatarPercentual(totais.BRL.dyMedio);
  indicadorDyUSD.textContent = formatarPercentual(totais.USD.dyMedio);
  indicadorRendimentos.textContent = formatarResumo(
    totais.BRL.rendimentos,
    totais.USD.rendimentos,
    possuiBRL,
    possuiUSD
  );
}

function agruparAlocacao(codigoMoeda) {
  const mapa = new Map();

  ativos
    .filter((ativo) => ativo.m === codigoMoeda)
    .forEach((ativo) => {
      const mercado = ativo.q * ativo.cot;
      mapa.set(ativo.c, (mapa.get(ativo.c) || 0) + mercado);
    });

  return [...mapa.entries()]
    .map(([categoriaAtivo, valor]) => ({ categoria: categoriaAtivo, valor }))
    .filter((item) => item.valor > 0)
    .sort((a, b) => b.valor - a.valor);
}

function renderizarAlocacao() {
  const grupos = [
    { moeda: "BRL", titulo: "Carteira em Real" },
    { moeda: "USD", titulo: "Carteira em Dólar" }
  ]
    .map((grupo) => ({ ...grupo, dados: agruparAlocacao(grupo.moeda) }))
    .filter((grupo) => grupo.dados.length > 0);

  if (!grupos.length) {
    alocacaoConteudo.innerHTML = `
      <div class="chart-empty">
        <strong>Adicione ativos para visualizar a alocação.</strong>
        <span>O gráfico será atualizado automaticamente.</span>
      </div>
    `;
    return;
  }

  alocacaoConteudo.innerHTML = `
    <div class="allocation-groups">
      ${grupos.map(renderizarGrupoAlocacao).join("")}
    </div>
  `;
}

function renderizarGrupoAlocacao(grupo) {
  const total = grupo.dados.reduce((soma, item) => soma + item.valor, 0);
  let acumulado = 0;

  const segmentos = grupo.dados.map((item, indice) => {
    const inicio = (acumulado / total) * 100;
    acumulado += item.valor;
    const fim = (acumulado / total) * 100;
    return `${CORES_CATEGORIAS[indice % CORES_CATEGORIAS.length]} ${inicio.toFixed(2)}% ${fim.toFixed(2)}%`;
  });

  const legenda = grupo.dados.map((item, indice) => {
    const percentual = total > 0 ? (item.valor / total) * 100 : 0;
    const cor = CORES_CATEGORIAS[indice % CORES_CATEGORIAS.length];

    return `
      <div class="legend-row">
        <span class="legend-dot" style="background:${cor}"></span>
        <span class="legend-name">${escaparHtml(item.categoria)}</span>
        <span class="legend-value">${formatarPercentual(percentual)} · ${formatarMoeda(item.valor, grupo.moeda)}</span>
      </div>
    `;
  }).join("");

  return `
    <div class="allocation-group">
      <div class="allocation-chart" style="--chart-background: conic-gradient(${segmentos.join(",")})">
        <div class="allocation-center">
          <strong>${formatarMoeda(total, grupo.moeda)}</strong>
          <span>Valor de mercado</span>
        </div>
      </div>
      <div class="allocation-legend">
        <h4>${grupo.titulo}</h4>
        <div class="legend-list">${legenda}</div>
      </div>
    </div>
  `;
}

function ajustarMoedaPeloTipo() {
  if (categoria.value === "Stock" || categoria.value === "ETF Internacional") {
    moeda.value = "USD";
  } else {
    moeda.value = "BRL";
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
  dividendYield.value = ativo.dy || "";
  dataCompra.value = ativo.data;
  corretora.value = ativo.corretora;
  favorito.checked = ativo.favorito;
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

function alternarFavorito(id) {
  const ativo = ativos.find((item) => item.id === id);

  if (!ativo) return;

  ativo.favorito = !ativo.favorito;
  atualizar();
}

function mostrarToast(mensagem, tipo = "success") {
  clearTimeout(toastTimeout);
  toast.textContent = mensagem;
  toast.className = tipo === "error" ? "toast error" : "toast";
  toast.hidden = false;

  toastTimeout = setTimeout(() => {
    toast.hidden = true;
  }, 3500);
}

function exportarBackup() {
  const backup = {
    app: "Planner Financeiro",
    versao: BACKUP_VERSION,
    exportadoEm: new Date().toISOString(),
    ativos
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const data = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `planner-backup-${data}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  mostrarToast("Backup exportado com sucesso.");
}

async function prepararImportacao(evento) {
  const arquivo = evento.target.files?.[0];
  evento.target.value = "";

  if (!arquivo) return;

  try {
    const texto = await arquivo.text();
    const dados = JSON.parse(texto);
    const lista = Array.isArray(dados) ? dados : dados.ativos;

    if (!Array.isArray(lista)) {
      throw new Error("O arquivo não contém uma lista válida de ativos.");
    }

    dadosImportacaoPendentes = lista.map(normalizarAtivo).filter((ativo) => ativo.t);
    document.getElementById("textoImportacao").textContent =
      `${dadosImportacaoPendentes.length} ativo(s) serão importados. Os dados atuais serão substituídos.`;
    modalImportacao.showModal();
  } catch (erro) {
    console.error("Falha ao importar backup:", erro);
    mostrarToast("Não foi possível ler esse backup.", "error");
  }
}

function confirmarImportacao() {
  if (!dadosImportacaoPendentes) return;

  ativos = dadosImportacaoPendentes;
  dadosImportacaoPendentes = null;
  modalImportacao.close();
  atualizar();
  mostrarToast("Backup importado com sucesso.");
}

function cancelarImportacao() {
  dadosImportacaoPendentes = null;
  modalImportacao.close();
}

function aplicarTema(tema) {
  const temaEscuro = tema === "dark";
  document.documentElement.dataset.theme = temaEscuro ? "dark" : "light";
  btnTema.setAttribute("aria-pressed", String(temaEscuro));
  iconeTema.textContent = temaEscuro ? "☀" : "☾";
  textoTema.textContent = temaEscuro ? "Modo claro" : "Modo escuro";
  localStorage.setItem(THEME_KEY, temaEscuro ? "dark" : "light");
}

function inicializarTema() {
  const temaSalvo = localStorage.getItem(THEME_KEY);
  const prefereEscuro = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  aplicarTema(temaSalvo || (prefereEscuro ? "dark" : "light"));
}

document.getElementById("btnAdicionar").addEventListener("click", abrirModalNovoAtivo);
document.getElementById("btnCancelar").addEventListener("click", fecharModalCadastro);
document.getElementById("btnFecharModal").addEventListener("click", fecharModalCadastro);
document.getElementById("btnCancelarExclusao").addEventListener("click", fecharModalExclusao);
document.getElementById("btnExportar").addEventListener("click", exportarBackup);
document.getElementById("btnImportar").addEventListener("click", () => arquivoImportacao.click());
document.getElementById("btnConfirmarImportacao").addEventListener("click", confirmarImportacao);
document.getElementById("btnCancelarImportacao").addEventListener("click", cancelarImportacao);

btnTema.addEventListener("click", () => {
  const temaAtual = document.documentElement.dataset.theme;
  aplicarTema(temaAtual === "dark" ? "light" : "dark");
});

categoria.addEventListener("change", ajustarMoedaPeloTipo);
buscaAtivo.addEventListener("input", atualizar);
filtroCategoria.addEventListener("change", atualizar);
somenteFavoritos.addEventListener("change", atualizar);
arquivoImportacao.addEventListener("change", prepararImportacao);

document.querySelectorAll(".sort-button").forEach((botao) => {
  botao.addEventListener("click", () => alternarOrdenacao(botao.dataset.sort));
});

tabela.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-action]");

  if (!botao) return;

  const { action, id } = botao.dataset;

  if (action === "editar") {
    abrirModalEdicao(id);
  } else if (action === "excluir") {
    solicitarExclusao(id);
  } else if (action === "favorito") {
    alternarFavorito(id);
  }
});

formAtivo.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dadosAtivo = {
    id: ativoEmEdicaoId || criarId(),
    t: ticker.value.trim().toUpperCase(),
    c: categoria.value,
    m: moeda.value,
    q: numeroSeguro(quantidade.value),
    p: numeroSeguro(precoMedio.value),
    cot: numeroSeguro(cotacao.value),
    dy: numeroSeguro(dividendYield.value),
    data: validarData(dataCompra.value),
    corretora: corretora.value.trim(),
    favorito: favorito.checked
  };

  if (
    !dadosAtivo.t ||
    dadosAtivo.q <= 0 ||
    dadosAtivo.p < 0 ||
    dadosAtivo.cot < 0 ||
    dadosAtivo.dy < 0
  ) {
    alert("Preencha todos os campos obrigatórios com valores válidos.");
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

  const mensagem = ativoEmEdicaoId
    ? `${dadosAtivo.t} foi atualizado.`
    : `${dadosAtivo.t} foi adicionado à carteira.`;

  modal.close();
  atualizar();
  mostrarToast(mensagem);
});

document.getElementById("btnConfirmarExclusao").addEventListener("click", () => {
  if (!ativoParaExcluirId) return;

  const ativo = ativos.find((item) => item.id === ativoParaExcluirId);
  ativos = ativos.filter((item) => item.id !== ativoParaExcluirId);
  fecharModalExclusao();
  atualizar();
  mostrarToast(`${ativo?.t || "Ativo"} foi excluído.`);
});

modal.addEventListener("close", limparFormulario);
modalExcluir.addEventListener("close", () => {
  ativoParaExcluirId = null;
});
modalImportacao.addEventListener("close", () => {
  dadosImportacaoPendentes = null;
});

inicializarTema();
atualizar();

const STORAGE_KEY = "planner";
const THEME_KEY = "planner-theme";
const BACKUP_VERSION = 3;
const PASSIVE_SETTINGS_KEY = "planner-passive-settings";
const QUOTES_CONFIG_KEY = "planner-quotes-config";

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
const btnAtualizarCotacoes = document.getElementById("btnAtualizarCotacoes");
const quotesStatusPanel = document.getElementById("quotesStatusPanel");
const quotesStatusIcon = document.getElementById("quotesStatusIcon");
const quotesStatusTitle = document.getElementById("quotesStatusTitle");
const quotesStatusText = document.getElementById("quotesStatusText");
const quotesStatusTime = document.getElementById("quotesStatusTime");
const QUOTES_STATUS_KEY = "planner-quotes-status";
const modalCotacoes = document.getElementById("modalCotacoes");
const formCotacoes = document.getElementById("formCotacoes");
const btnConfigurarCotacoes = document.getElementById("btnConfigurarCotacoes");
const btnFecharCotacoes = document.getElementById("btnFecharCotacoes");
const btnCancelarCotacoes = document.getElementById("btnCancelarCotacoes");
const brapiTokenInput = document.getElementById("brapiToken");
const finnhubTokenInput = document.getElementById("finnhubToken");

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

const menuViewLinks = document.querySelectorAll("[data-view]");
const menuScrollLinks = document.querySelectorAll("[data-scroll]");
const viewDashboard = document.getElementById("viewDashboard");
const viewRendaPassiva = document.getElementById("viewRendaPassiva");
const tituloPagina = document.getElementById("tituloPagina");
const subtituloPagina = document.getElementById("subtituloPagina");
const rendaMensalProjetada = document.getElementById("rendaMensalProjetada");
const rendaMensalDetalhe = document.getElementById("rendaMensalDetalhe");
const rendaAnualProjetada = document.getElementById("rendaAnualProjetada");
const yocMedioCarteira = document.getElementById("yocMedioCarteira");
const metaMensalResumo = document.getElementById("metaMensalResumo");
const metaMensalProgresso = document.getElementById("metaMensalProgresso");
const periodoProjecao = document.getElementById("periodoProjecao");
const graficoProjecao = document.getElementById("graficoProjecao");
const metaRendaMensal = document.getElementById("metaRendaMensal");
const aporteMensal = document.getElementById("aporteMensal");
const rendaAtualMeta = document.getElementById("rendaAtualMeta");
const faltaMeta = document.getElementById("faltaMeta");
const barraMeta = document.getElementById("barraMeta");
const percentualMeta = document.getElementById("percentualMeta");
const tabelaReinvestimento = document.getElementById("tabelaReinvestimento");
const tabelaRendaAtivos = document.getElementById("tabelaRendaAtivos");
const rendaVazia = document.getElementById("rendaVazia");

const assetDrawer = document.getElementById("assetDrawer");
const assetDrawerBackdrop = document.getElementById("assetDrawerBackdrop");
const btnFecharDrawer = document.getElementById("btnFecharDrawer");
const drawerLogo = document.getElementById("drawerLogo");
const drawerCategoria = document.getElementById("drawerCategoria");
const drawerTicker = document.getElementById("drawerTicker");
const drawerMoeda = document.getElementById("drawerMoeda");
const drawerResultado = document.getElementById("drawerResultado");
const drawerRentabilidade = document.getElementById("drawerRentabilidade");
const drawerQuantidade = document.getElementById("drawerQuantidade");
const drawerPrecoMedio = document.getElementById("drawerPrecoMedio");
const drawerCotacao = document.getElementById("drawerCotacao");
const drawerInvestido = document.getElementById("drawerInvestido");
const drawerMercado = document.getElementById("drawerMercado");
const drawerDy = document.getElementById("drawerDy");
const drawerYoc = document.getElementById("drawerYoc");
const drawerYocMensal = document.getElementById("drawerYocMensal");
const drawerRendaMensal = document.getElementById("drawerRendaMensal");
const drawerRendaAnual = document.getElementById("drawerRendaAnual");
const btnDrawerEditar = document.getElementById("btnDrawerEditar");
const btnDrawerExcluir = document.getElementById("btnDrawerExcluir");
const rendaHeroValor = document.getElementById("rendaHeroValor");
const rendaHeroTexto = document.getElementById("rendaHeroTexto");
const rendaHeroMeta = document.getElementById("rendaHeroMeta");
const rendaHeroBarra = document.getElementById("rendaHeroBarra");



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
let passiveSettings = carregarConfiguracoesRenda();
let ativoNoDrawerId = null;

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
      const textoBusca = ativo.t.toLocaleUpperCase("pt-BR");
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


const LOGO_DOMAINS = {
  AAPL: "apple.com",
  COST: "costco.com",
  MSFT: "microsoft.com",
  AMZN: "amazon.com",
  GOOGL: "google.com",
  GOOG: "google.com",
  META: "meta.com",
  NVDA: "nvidia.com",
  TSLA: "tesla.com",
  KO: "coca-cola.com",
  MCD: "mcdonalds.com",
  DIS: "thewaltdisneycompany.com",
  VOO: "vanguard.com",
  VTI: "vanguard.com",
  QQQ: "invesco.com",
  SPY: "ssga.com",
  PETR3: "petrobras.com.br",
  PETR4: "petrobras.com.br",
  ITUB3: "itau.com.br",
  ITUB4: "itau.com.br",
  BBAS3: "bb.com.br",
  BBDC3: "bradesco.com.br",
  BBDC4: "bradesco.com.br",
  VALE3: "vale.com",
  WEGE3: "weg.net",
  ABEV3: "ambev.com.br",
  IVVB11: "blackrock.com",
  BOVA11: "blackrock.com",
  VRTA11: "btgpactual.com",
  BTLG11: "btgpactual.com",
  KNRI11: "kinea.com.br",
  KNSC11: "kinea.com.br",
  VISC11: "vinci.com.br",
  MXRF11: "xpasset.com.br",
  HGLG11: "patria.com",
  ITSA4: "itausa.com.br",
  SANB11: "santander.com.br",
  XPML11: "xp.com.br",
  JBSS3: "jbs.com.br",
  ELET3: "eletrobras.com",
  ELET6: "eletrobras.com",
  SUZB3: "suzano.com.br",
  RADL3: "rdsaude.com.br",
  B3SA3: "b3.com.br",
  CGAS5: "comgas.com.br",
  UGPA3: "ultrapar.com.br",
  HYPE3: "hypera.com.br",
  ASAI3: "assai.com.br",
  ENBR3: "enel.com.br",
  GGBR4: "gerdau.com.br",
  CRFB3: "carrefour.com.br",
  SMBU3: "smartfit.com.br",
  ENEV3: "eneva.com.br",
  IRBR3: "irbbrasilseguradora.com.br",
  CVCB3: "cvc.com.br",
  CSNA3: "csn.com.br",
  LREN3: "lrenner.com.br",
  FLRY3: "fleury.com.br",
  MGLU3: "magazineluiza.com.br",
  SOMA3: "somagrupo.com.br",
  PCAR3: "gpabr.com",
  CMIG4: "cemig.com.br",
  PSSA3: "portoseguro.com.br",
  KLBN11: "klabin.com.br",
  VAMO3: "vamos.com.br",
  AMER3: "americanas.com.br",
  NTCO3: "natura.com.br",
  JPM: "jpmorganchase.com",
  BAC: "bankofamerica.com",
  XOM: "exxonmobil.com",
  WMT: "walmart.com",
  MA: "mastercard.com",
  V: "visa.com",
  HD: "homedepot.com",
  CAT: "caterpillar.com",
  CRM: "salesforce.com",
  ORCL: "oracle.com",
  AMD: "amd.com",
  INTC: "intel.com",
  NFLX: "netflix.com",
  PYPL: "paypal.com",
  ABBV: "abbvie.com",
  AVGO: "broadcom.com",
  QCOM: "qualcomm.com",
  TXN: "ti.com",
  AMGN: "amgen.com",
  ISRG: "intuitive.com",
  ADBE: "adobe.com",
  INTU: "intuit.com",
  CMCSA: "comcast.com",
  PEP: "pepsico.com",
  COKE: "coca-cola.com",
  WM: "wastemanagement.com",
  GE: "ge.com",
  UNH: "uhc.com",
  CVS: "cvshealth.com",
  TMO: "thermofisher.com",
  LLY: "lilly.com",
  MRK: "merck.com",
  PFE: "pfizer.com",
  BMY: "bms.com",
  ABBV: "abbvie.com"
};

function siglaAtivo(tickerAtivo) {
  return String(tickerAtivo || "AT")
    .replace(/[^A-Z0-9]/gi, "")
    .slice(0, 3)
    .toUpperCase();
}

function normalizarTickerParaChave(tickerAtivo) {
  return String(tickerAtivo || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z0-9]/gi, "")
    .toUpperCase();
}

function tipoLogoAtivo(ativo) {
  const categoria = String(ativo.c || "").trim();

  if (categoria === "FII") return "fii";
  if (categoria === "ETF Brasil" || categoria === "ETF Internacional") return "etf";
  if (categoria === "BDR") return "bdr";

  return "empresa";
}

function obterFontesLogo(ativo) {
  const chave = normalizarTickerParaChave(ativo?.t);
  if (!chave) return [];

  const fontes = [];
  const ehAtivoB3 = ativo?.m === "BRL" && ativo?.c !== "Renda Fixa";
  const ehAtivoAmericano =
    ativo?.m === "USD" &&
    (ativo?.c === "Stock" || ativo?.c === "ETF Internacional");

  // A brapi disponibiliza os logotipos da B3 diretamente pelo ticker.
  // Assim, novas ações e BDRs não precisam ser incluídos manualmente no código.
  if (ehAtivoB3) {
    fontes.push(`https://icons.brapi.dev/icons/${encodeURIComponent(chave)}.svg`);
  }

  // Para ativos dos EUA, usamos apenas domínios conhecidos.
  // Isso evita associações incorretas entre tickers parecidos e marcas não relacionadas.
  const dominio = LOGO_DOMAINS[chave];
  if (dominio) {
    const host = String(dominio)
      .trim()
      .replace(/^https?:\/\//i, "")
      .replace(/\/.*$/, "")
      .toLowerCase();

    fontes.push(
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`,
      `https://icons.duckduckgo.com/ip3/${encodeURIComponent(host)}.ico`
    );
  }

  return [...new Set(fontes)];
}

function tentarProximaFonteLogo(imagem) {
  if (!(imagem instanceof HTMLImageElement)) return;

  let fontes = [];
  try {
    fontes = JSON.parse(imagem.dataset.fontesLogo || "[]");
  } catch {
    fontes = [];
  }

  const indiceAtual = Number(imagem.dataset.indiceLogo || 0);
  const proximoIndice = indiceAtual + 1;

  if (proximoIndice < fontes.length) {
    imagem.dataset.indiceLogo = String(proximoIndice);
    imagem.src = fontes[proximoIndice];
    return;
  }

  const container = imagem.closest(".asset-logo");
  container?.classList.remove("has-image");
  imagem.remove();
}

function criarIconeSvg(tipo) {
  if (tipo === "fii") {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 8.5h16"></path>
        <path d="M6 8.5v8.5"></path>
        <path d="M18 8.5v8.5"></path>
        <path d="M8 11.5h8"></path>
        <path d="M10.5 16.5v-5"></path>
        <path d="M13.5 16.5v-5"></path>
        <path d="M4 17h16"></path>
      </svg>
    `;
  }

  if (tipo === "etf") {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="3"></rect>
        <path d="M8 8v8"></path>
        <path d="M12 8v8"></path>
        <path d="M16 8v8"></path>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="3"></rect>
      <path d="M8 10h8"></path>
      <path d="M8 14h5"></path>
      <path d="M15 14h1"></path>
    </svg>
  `;
}

function criarLogoHtml(ativo, classeExtra = "") {
  const fontes = obterFontesLogo(ativo);
  const sigla = siglaAtivo(ativo.t);
  const tipoLogo = tipoLogoAtivo(ativo);
  const classes = ["asset-logo", classeExtra, `asset-logo-${tipoLogo}`].filter(Boolean).join(" ");

  if (fontes.length) {
    const fontesSerializadas = escaparHtml(JSON.stringify(fontes));
    const fallback = `<span class="asset-logo-icon" aria-hidden="true">${criarIconeSvg(tipoLogo)}</span>`;

    return `
      <div class="${classes}" data-logo-ticker="${escaparHtml(ativo.t)}">
        ${fallback}
        <img
          src="${fontes[0]}"
          alt=""
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
          data-fontes-logo="${fontesSerializadas}"
          data-indice-logo="0"
          onload="this.previousElementSibling.hidden=true; this.closest('.asset-logo')?.classList.add('has-image')"
          onerror="tentarProximaFonteLogo(this)"
        >
      </div>
    `;
  }

  return `
    <div class="${classes}">
      <span class="asset-logo-icon" aria-hidden="true">${criarIconeSvg(tipoLogo)}</span>
    </div>
  `;
}

function preencherLogoDrawer(ativo) {
  const html = criarLogoHtml(ativo, "asset-logo-large");
  drawerLogo.innerHTML = html
    .replace(/^<div class="asset-logo(?: [^"]+)?">/, "")
    .replace(/<\/div>\s*$/, "");
}

function abrirDrawerAtivo(id) {
  const ativo = ativos.find((item) => item.id === id);
  if (!ativo) return;

  ativoNoDrawerId = id;
  const investido = ativo.q * ativo.p;
  const mercado = ativo.q * ativo.cot;
  const resultado = mercado - investido;
  const rentabilidade = investido > 0 ? (resultado / investido) * 100 : 0;
  const rendaAnual = mercado * (ativo.dy / 100);
  const rendaMensal = rendaAnual / 12;
  const yoc = investido > 0 ? (rendaAnual / investido) * 100 : 0;
  const yocMensal = yoc / 12;

  preencherLogoDrawer(ativo);
  drawerCategoria.textContent = ativo.c;
  drawerTicker.textContent = ativo.t;
  drawerMoeda.textContent = descricaoMoeda(ativo.m);
  drawerResultado.textContent = formatarMoeda(resultado, ativo.m);
  drawerResultado.className = classeResultado(resultado);
  drawerRentabilidade.textContent = formatarPercentual(rentabilidade);
  drawerRentabilidade.className = classeResultado(rentabilidade);
  drawerQuantidade.textContent = ativo.q.toLocaleString("pt-BR");
  drawerPrecoMedio.textContent = formatarMoeda(ativo.p, ativo.m);
  drawerCotacao.textContent = formatarMoeda(ativo.cot, ativo.m);
  drawerInvestido.textContent = formatarMoeda(investido, ativo.m);
  drawerMercado.textContent = formatarMoeda(mercado, ativo.m);
  drawerDy.textContent = `${formatarPercentual(ativo.dy)} ao ano`;
  drawerYoc.textContent = `${formatarPercentual(yoc)} ao ano`;
  drawerYocMensal.textContent =
    `Equivale a ${formatarPercentual(yocMensal)} ao mês sobre o valor investido.`;
  drawerRendaMensal.textContent = formatarMoeda(rendaMensal, ativo.m);
  drawerRendaAnual.textContent = formatarMoeda(rendaAnual, ativo.m);

  assetDrawerBackdrop.hidden = false;
  assetDrawer.classList.add("open");
  assetDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  btnFecharDrawer.focus();
}

function fecharDrawerAtivo() {
  ativoNoDrawerId = null;
  assetDrawer.classList.remove("open");
  assetDrawer.setAttribute("aria-hidden", "true");
  assetDrawerBackdrop.hidden = true;
  document.body.classList.remove("drawer-open");
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
    linha.dataset.id = ativo.id;
    linha.tabIndex = 0;
    linha.setAttribute("aria-label", `Abrir detalhes de ${ativo.t}`);
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
      <td>
        <div class="asset-cell">
          ${criarLogoHtml(ativo)}
          <div class="asset-name">
            <strong>${escaparHtml(ativo.t)}</strong>
            <small>${escaparHtml(ativo.c)} · ${ativo.m === "USD" ? "Dólar" : "Real"}</small>
          </div>
        </div>
      </td>
      <td>${escaparHtml(ativo.c)}</td>
      <td>${ativo.q.toLocaleString("pt-BR")}</td>
      <td>${formatarMoeda(ativo.p, ativo.m)}</td>
      <td>${formatarMoeda(ativo.cot, ativo.m)}</td>
      <td>${formatarMoeda(mercado, ativo.m)}</td>
      <td class="${classeResultado(resultado)}">${formatarMoeda(resultado, ativo.m)}</td>
      <td class="${classeResultado(rentabilidade)}">${formatarPercentual(rentabilidade)}</td>
      <td>
        <button class="details-button" type="button" data-action="detalhes" data-id="${ativo.id}">
          Detalhes
        </button>
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
  atualizarRendaPassiva();
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


function carregarConfiguracoesRenda() {
  try {
    const dados = JSON.parse(localStorage.getItem(PASSIVE_SETTINGS_KEY) || "{}");
    return {
      metaMensal: numeroSeguro(dados.metaMensal, 10000),
      aporteMensal: numeroSeguro(dados.aporteMensal, 1000)
    };
  } catch (erro) {
    console.error("Não foi possível carregar as configurações de renda:", erro);
    return { metaMensal: 10000, aporteMensal: 1000 };
  }
}

function salvarConfiguracoesRenda() {
  passiveSettings = {
    metaMensal: numeroSeguro(metaRendaMensal.value),
    aporteMensal: numeroSeguro(aporteMensal.value)
  };
  localStorage.setItem(PASSIVE_SETTINGS_KEY, JSON.stringify(passiveSettings));
  atualizarRendaPassiva();
}

function obterDadosRendaPassiva() {
  const dados = {
    BRL: { mercado: 0, investido: 0, anual: 0, mensal: 0 },
    USD: { mercado: 0, investido: 0, anual: 0, mensal: 0 }
  };

  ativos.forEach((ativo) => {
    const grupo = dados[ativo.m] || dados.BRL;
    const mercado = ativo.q * ativo.cot;
    const investido = ativo.q * ativo.p;
    const anual = mercado * (ativo.dy / 100);

    grupo.mercado += mercado;
    grupo.investido += investido;
    grupo.anual += anual;
    grupo.mensal += anual / 12;
  });

  Object.values(dados).forEach((grupo) => {
    grupo.dyMedio = grupo.mercado > 0 ? (grupo.anual / grupo.mercado) * 100 : 0;
    grupo.yoc = grupo.investido > 0 ? (grupo.anual / grupo.investido) * 100 : 0;
    grupo.taxaMensal = grupo.mercado > 0 ? grupo.mensal / grupo.mercado : 0;
  });

  return dados;
}

function formatarLinhasMoeda(valorBRL, valorUSD) {
  const linhas = [];
  if (ativos.some((ativo) => ativo.m === "BRL")) linhas.push(formatarMoeda(valorBRL, "BRL"));
  if (ativos.some((ativo) => ativo.m === "USD")) linhas.push(formatarMoeda(valorUSD, "USD"));
  return linhas.length ? linhas.join(" · ") : formatarMoeda(0, "BRL");
}

function atualizarRendaPassiva() {
  if (!rendaMensalProjetada) return;

  const dados = obterDadosRendaPassiva();
  const mensalBRL = dados.BRL.mensal;
  const mensalUSD = dados.USD.mensal;
  const anualBRL = dados.BRL.anual;
  const anualUSD = dados.USD.anual;

  rendaMensalProjetada.textContent = formatarLinhasMoeda(mensalBRL, mensalUSD);
  rendaAnualProjetada.textContent = formatarLinhasMoeda(anualBRL, anualUSD);

  const investidoTotalSinal = dados.BRL.investido + dados.USD.investido;
  const rendaAnualSinal = dados.BRL.anual + dados.USD.anual;
  const yocMedio = investidoTotalSinal > 0 ? (rendaAnualSinal / investidoTotalSinal) * 100 : 0;
  yocMedioCarteira.textContent = formatarPercentual(yocMedio);

  metaRendaMensal.value = passiveSettings.metaMensal || "";
  aporteMensal.value = passiveSettings.aporteMensal || "";
  metaMensalResumo.textContent = formatarMoeda(passiveSettings.metaMensal, "BRL");

  const meta = passiveSettings.metaMensal;
  const progresso = meta > 0 ? Math.min((mensalBRL / meta) * 100, 100) : 0;
  const falta = Math.max(meta - mensalBRL, 0);

  rendaAtualMeta.textContent = formatarMoeda(mensalBRL, "BRL");
  faltaMeta.textContent = formatarMoeda(falta, "BRL");
  barraMeta.style.width = `${progresso}%`;
  percentualMeta.textContent = `${formatarPercentual(progresso)} da meta atingida`;
  metaMensalProgresso.textContent =
    meta > 0 ? `${formatarPercentual(progresso)} da meta mensal` : "Defina sua meta abaixo";

  rendaHeroValor.textContent = `${formatarMoeda(mensalBRL, "BRL")} por mês`;
  rendaHeroMeta.textContent = formatarPercentual(progresso);
  rendaHeroBarra.style.width = `${progresso}%`;
  rendaHeroTexto.textContent = ativos.some((ativo) => ativo.dy > 0)
    ? `Projeção anual de ${formatarMoeda(anualBRL, "BRL")}, com base nos DYs cadastrados.`
    : "Preencha o Dividend Yield dos ativos para visualizar sua projeção.";


  rendaMensalDetalhe.textContent =
    ativos.some((ativo) => ativo.dy > 0)
      ? "Estimativa pelos DYs cadastrados"
      : "Preencha o DY anual dos ativos";

  renderizarGraficoProjecao(dados);
  renderizarSimulacaoReinvestimento(dados);
  renderizarTabelaRendaAtivos();
}

function adicionarMes(data, quantidadeMeses) {
  const novaData = new Date(data.getFullYear(), data.getMonth() + quantidadeMeses, 1);
  return novaData.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })
    .replace(".", "")
    .replace(" de ", "/");
}

function projetarRendaMensal(grupo, meses, aporte = 0, reinvestir = true) {
  let patrimonio = grupo.mercado;
  const taxaMensal = grupo.taxaMensal;
  const valores = [];

  for (let indice = 0; indice < meses; indice += 1) {
    const renda = patrimonio * taxaMensal;
    valores.push(renda);

    if (reinvestir) {
      patrimonio += renda + aporte;
    } else {
      patrimonio += aporte;
    }
  }

  return valores;
}

function renderizarGraficoProjecao(dados) {
  const meses = Number(periodoProjecao.value || 12);
  const valores = projetarRendaMensal(
    dados.BRL,
    meses,
    passiveSettings.aporteMensal,
    true
  );
  const maiorValor = Math.max(...valores, 1);
  const hoje = new Date();

  graficoProjecao.innerHTML = valores.map((valor, indice) => {
    const altura = Math.max((valor / maiorValor) * 100, valor > 0 ? 3 : 0);
    return `
      <div class="projection-column">
        <span class="projection-value">${formatarMoeda(valor, "BRL")}</span>
        <div class="projection-bar-wrap">
          <span class="projection-bar" style="height:${altura}%"></span>
        </div>
        <span class="projection-month">${adicionarMes(hoje, indice + 1)}</span>
      </div>
    `;
  }).join("");
}

function simularPeriodo(grupo, meses, aporte, reinvestir) {
  let patrimonio = grupo.mercado;
  const taxaMensal = grupo.taxaMensal;
  let rendaMensal = patrimonio * taxaMensal;

  for (let indice = 0; indice < meses; indice += 1) {
    rendaMensal = patrimonio * taxaMensal;
    patrimonio += aporte + (reinvestir ? rendaMensal : 0);
  }

  return patrimonio * taxaMensal;
}

function renderizarSimulacaoReinvestimento(dados) {
  const periodos = [0, 12, 24, 36];
  const aporte = passiveSettings.aporteMensal;

  tabelaReinvestimento.innerHTML = periodos.map((meses) => {
    const semReinvestir = meses === 0
      ? dados.BRL.mensal
      : simularPeriodo(dados.BRL, meses, aporte, false);
    const comReinvestimento = meses === 0
      ? dados.BRL.mensal
      : simularPeriodo(dados.BRL, meses, aporte, true);
    const diferenca = Math.max(comReinvestimento - semReinvestir, 0);

    return `
      <tr>
        <td><strong>${meses === 0 ? "Hoje" : `${meses} meses`}</strong></td>
        <td>${formatarMoeda(semReinvestir, "BRL")}</td>
        <td>${formatarMoeda(comReinvestimento, "BRL")}</td>
        <td class="${diferenca > 0 ? "positive" : "neutral"}">${formatarMoeda(diferenca, "BRL")}</td>
      </tr>
    `;
  }).join("");
}

function renderizarTabelaRendaAtivos() {
  const ativosComRenda = ativos
    .filter((ativo) => ativo.dy > 0)
    .sort((a, b) => {
      const rendaA = a.q * a.cot * (a.dy / 100);
      const rendaB = b.q * b.cot * (b.dy / 100);
      return rendaB - rendaA;
    });

  rendaVazia.hidden = ativosComRenda.length > 0;

  tabelaRendaAtivos.innerHTML = ativosComRenda.map((ativo) => {
    const mercado = ativo.q * ativo.cot;
    const investido = ativo.q * ativo.p;
    const rendaAnual = mercado * (ativo.dy / 100);
    const rendaMensal = rendaAnual / 12;
    const yoc = investido > 0 ? (rendaAnual / investido) * 100 : 0;

    return `
      <tr>
        <td>
          <div class="asset-income-name">
            <strong>${escaparHtml(ativo.t)}</strong>
            <small>${escaparHtml(ativo.c)}</small>
          </div>
        </td>
        <td>${formatarPercentual(ativo.dy)}</td>
        <td class="${classeResultado(yoc)}">${formatarPercentual(yoc)}</td>
        <td>${formatarMoeda(rendaMensal, ativo.m)}</td>
        <td>${formatarMoeda(rendaAnual, ativo.m)}</td>
      </tr>
    `;
  }).join("");
}

function abrirView(nomeView) {
  fecharDrawerAtivo();
  const rendaAtiva = nomeView === "renda-passiva";

  viewDashboard.hidden = rendaAtiva;
  viewDashboard.classList.toggle("active", !rendaAtiva);
  viewRendaPassiva.hidden = !rendaAtiva;
  viewRendaPassiva.classList.toggle("active", rendaAtiva);

  tituloPagina.textContent = rendaAtiva ? "Renda Passiva" : "Dashboard";
  subtituloPagina.textContent = rendaAtiva
    ? "Projeções simples para acompanhar sua renda e seus reinvestimentos"
    : "Visão consolidada da sua carteira";

  menuViewLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.view === nomeView);
  });

  if (rendaAtiva) {
    atualizarRendaPassiva();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function formatarDataHoraCotacoes(dataIso) {
  if (!dataIso) return "Nunca verificado";

  const data = new Date(dataIso);
  if (Number.isNaN(data.getTime())) return "Nunca verificado";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(data);
}

function carregarConfiguracaoCotacoes() {
  try {
    const dados = JSON.parse(localStorage.getItem(QUOTES_CONFIG_KEY) || "{}");
    return {
      brapiToken: String(dados.brapiToken || "").trim(),
      finnhubToken: String(dados.finnhubToken || "").trim()
    };
  } catch (erro) {
    console.warn("Não foi possível ler a configuração das APIs.", erro);
    return { brapiToken: "", finnhubToken: "" };
  }
}

function salvarConfiguracaoCotacoes(configuracao) {
  localStorage.setItem(QUOTES_CONFIG_KEY, JSON.stringify(configuracao));
}

function abrirConfiguracaoCotacoes() {
  const configuracao = carregarConfiguracaoCotacoes();
  brapiTokenInput.value = configuracao.brapiToken;
  finnhubTokenInput.value = configuracao.finnhubToken;
  modalCotacoes.showModal();
  brapiTokenInput.focus();
}

function fecharConfiguracaoCotacoes() {
  modalCotacoes.close();
}

function formatarDataHoraCotacoes(valor) {
  if (!valor) return "Nunca atualizado";
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return "Nunca atualizado";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(data);
}

function definirStatusCotacoes(tipo, titulo, texto, horario = null) {
  quotesStatusPanel.classList.remove("is-loading", "is-success", "is-warning", "is-error");
  if (tipo) quotesStatusPanel.classList.add(`is-${tipo}`);

  const icones = {
    loading: "↻",
    success: "✓",
    warning: "!",
    error: "×"
  };

  quotesStatusIcon.textContent = icones[tipo] || "◷";
  quotesStatusTitle.textContent = titulo;
  quotesStatusText.textContent = texto;
  quotesStatusTime.textContent = horario ? formatarDataHoraCotacoes(horario) : "—";
}

function carregarStatusCotacoes() {
  try {
    const status = JSON.parse(localStorage.getItem(QUOTES_STATUS_KEY) || "null");
    if (status?.atualizadoEm) {
      const falhas = numeroSeguro(status.falhas);
      definirStatusCotacoes(
        falhas ? "warning" : "success",
        `${numeroSeguro(status.atualizados)} ${numeroSeguro(status.atualizados) === 1 ? "cotação atualizada" : "cotações atualizadas"}`,
        falhas
          ? `${falhas} ativo(s) não puderam ser consultados e mantiveram o preço anterior.`
          : "Preços reais carregados e carteira recalculada.",
        status.atualizadoEm
      );
      return;
    }
  } catch (erro) {
    console.warn("Não foi possível ler o status das cotações.", erro);
  }

  definirStatusCotacoes(
    "warning",
    "Configure as APIs de cotações",
    "Informe as chaves da brapi e da Finnhub para atualizar B3 e Estados Unidos."
  );
}

async function fetchJsonComTimeout(url, opcoes = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resposta = await fetch(url, { ...opcoes, signal: controller.signal });
    if (!resposta.ok) {
      let detalhe = "";
      try {
        const corpo = await resposta.json();
        detalhe = corpo?.message || corpo?.error || corpo?.detail || "";
      } catch {
        detalhe = "";
      }
      throw new Error(`${resposta.status}${detalhe ? ` · ${detalhe}` : ""}`);
    }
    return await resposta.json();
  } finally {
    clearTimeout(timeout);
  }
}

function ehAtivoB3(ativo) {
  return ativo.m === "BRL" && ativo.c !== "Renda Fixa";
}

function ehAtivoEUA(ativo) {
  return ativo.m === "USD" && (ativo.c === "Stock" || ativo.c === "ETF Internacional");
}

function dividirEmLotes(lista, tamanho) {
  const lotes = [];
  for (let i = 0; i < lista.length; i += tamanho) {
    lotes.push(lista.slice(i, i + tamanho));
  }
  return lotes;
}

async function consultarBrapi(ativosB3, token) {
  const precos = new Map();
  const erros = [];
  const tickers = [...new Set(ativosB3.map((ativo) => normalizarTickerParaChave(ativo.t)).filter(Boolean))];

  for (const lote of dividirEmLotes(tickers, 20)) {
    try {
      const url = `https://brapi.dev/api/v2/stocks/quote?symbols=${encodeURIComponent(lote.join(","))}`;
      const dados = await fetchJsonComTimeout(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      const resultados = Array.isArray(dados?.results) ? dados.results : [];
      resultados.forEach((resultado) => {
        const tickerResultado = normalizarTickerParaChave(resultado?.symbol || resultado?.requestedSymbol);
        const payload = resultado?.data || resultado;
        const preco = numeroSeguro(payload?.regularMarketPrice, NaN);
        if (tickerResultado && Number.isFinite(preco) && preco > 0) {
          precos.set(tickerResultado, preco);
        }
      });
    } catch (erro) {
      console.error("Falha ao consultar brapi:", erro);
      erros.push(`B3: ${erro.message}`);
    }
  }

  return { precos, erros };
}

async function consultarFinnhub(ativosEUA, token) {
  const precos = new Map();
  const erros = [];
  const tickers = [...new Set(ativosEUA.map((ativo) => normalizarTickerParaChave(ativo.t)).filter(Boolean))];

  for (const tickerAtivo of tickers) {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(tickerAtivo)}&token=${encodeURIComponent(token)}`;
      const dados = await fetchJsonComTimeout(url);
      const preco = numeroSeguro(dados?.c, NaN);
      if (Number.isFinite(preco) && preco > 0) {
        precos.set(tickerAtivo, preco);
      } else {
        erros.push(`${tickerAtivo}: cotação indisponível`);
      }
    } catch (erro) {
      console.error(`Falha ao consultar ${tickerAtivo} na Finnhub:`, erro);
      erros.push(`${tickerAtivo}: ${erro.message}`);
    }

    // Evita disparar muitas requisições simultâneas no plano gratuito.
    await new Promise((resolve) => window.setTimeout(resolve, 120));
  }

  return { precos, erros };
}

async function atualizarCotacoes() {
  if (!btnAtualizarCotacoes || btnAtualizarCotacoes.disabled) return;

  const configuracao = carregarConfiguracaoCotacoes();
  const ativosB3 = ativos.filter(ehAtivoB3);
  const ativosEUA = ativos.filter(ehAtivoEUA);
  const precisaBrapi = ativosB3.length > 0;
  const precisaFinnhub = ativosEUA.length > 0;

  if ((precisaBrapi && !configuracao.brapiToken) || (precisaFinnhub && !configuracao.finnhubToken)) {
    abrirConfiguracaoCotacoes();
    definirStatusCotacoes(
      "warning",
      "Configuração necessária",
      "Informe as chaves das APIs usadas pelos ativos cadastrados."
    );
    return;
  }

  if (!ativosB3.length && !ativosEUA.length) {
    definirStatusCotacoes(
      "warning",
      "Nenhum ativo compatível",
      "Cadastre uma ação, FII, BDR, ETF brasileiro, Stock ou ETF dos EUA."
    );
    return;
  }

  btnAtualizarCotacoes.disabled = true;
  btnAtualizarCotacoes.classList.add("is-loading");
  btnAtualizarCotacoes.textContent = "Atualizando...";
  definirStatusCotacoes(
    "loading",
    "Buscando preços reais",
    `Consultando ${ativosB3.length} ativo(s) da B3 e ${ativosEUA.length} ativo(s) dos EUA...`
  );

  try {
    const [resultadoB3, resultadoEUA] = await Promise.all([
      ativosB3.length
        ? consultarBrapi(ativosB3, configuracao.brapiToken)
        : Promise.resolve({ precos: new Map(), erros: [] }),
      ativosEUA.length
        ? consultarFinnhub(ativosEUA, configuracao.finnhubToken)
        : Promise.resolve({ precos: new Map(), erros: [] })
    ]);

    let atualizados = 0;
    let falhas = 0;

    ativos.forEach((ativo) => {
      const chave = normalizarTickerParaChave(ativo.t);
      const novoPreco = ehAtivoB3(ativo)
        ? resultadoB3.precos.get(chave)
        : ehAtivoEUA(ativo)
          ? resultadoEUA.precos.get(chave)
          : null;

      if (Number.isFinite(novoPreco) && novoPreco > 0) {
        ativo.cot = novoPreco;
        atualizados += 1;
      } else if (ehAtivoB3(ativo) || ehAtivoEUA(ativo)) {
        falhas += 1;
      }
    });

    const atualizadoEm = new Date().toISOString();
    localStorage.setItem(QUOTES_STATUS_KEY, JSON.stringify({
      atualizadoEm,
      atualizados,
      falhas
    }));

    atualizar();

    if (atualizados === 0) {
      const detalhes = [...resultadoB3.erros, ...resultadoEUA.erros].slice(0, 2).join(" · ");
      definirStatusCotacoes(
        "error",
        "Nenhuma cotação foi atualizada",
        detalhes || "Confira os tickers, as chaves das APIs e os limites dos planos.",
        atualizadoEm
      );
      mostrarToast("Não foi possível atualizar as cotações.", "error");
    } else {
      definirStatusCotacoes(
        falhas ? "warning" : "success",
        `${atualizados} ${atualizados === 1 ? "cotação atualizada" : "cotações atualizadas"}`,
        falhas
          ? `${falhas} ativo(s) mantiveram o preço anterior por indisponibilidade ou ticker inválido.`
          : "Preços reais carregados e carteira recalculada.",
        atualizadoEm
      );
      mostrarToast(`${atualizados} ${atualizados === 1 ? "cotação atualizada" : "cotações atualizadas"}.`);
    }
  } catch (erro) {
    console.error("Erro inesperado ao atualizar cotações:", erro);
    definirStatusCotacoes(
      "error",
      "Falha na atualização",
      "Não foi possível concluir a consulta. Confira sua conexão e as chaves das APIs."
    );
    mostrarToast("Falha ao atualizar cotações.", "error");
  } finally {
    btnAtualizarCotacoes.disabled = false;
    btnAtualizarCotacoes.classList.remove("is-loading");
    btnAtualizarCotacoes.textContent = "↻ Atualizar cotações";
  }
}

document.getElementById("btnAdicionar").addEventListener("click", abrirModalNovoAtivo);
document.getElementById("btnCancelar").addEventListener("click", fecharModalCadastro);
document.getElementById("btnFecharModal").addEventListener("click", fecharModalCadastro);
document.getElementById("btnCancelarExclusao").addEventListener("click", fecharModalExclusao);
document.getElementById("btnExportar").addEventListener("click", exportarBackup);
document.getElementById("btnImportar").addEventListener("click", () => arquivoImportacao.click());
btnAtualizarCotacoes.addEventListener("click", atualizarCotacoes);
btnConfigurarCotacoes.addEventListener("click", abrirConfiguracaoCotacoes);
btnFecharCotacoes.addEventListener("click", fecharConfiguracaoCotacoes);
btnCancelarCotacoes.addEventListener("click", fecharConfiguracaoCotacoes);
document.getElementById("btnConfirmarImportacao").addEventListener("click", confirmarImportacao);
document.getElementById("btnCancelarImportacao").addEventListener("click", cancelarImportacao);


formCotacoes.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  salvarConfiguracaoCotacoes({
    brapiToken: brapiTokenInput.value.trim(),
    finnhubToken: finnhubTokenInput.value.trim()
  });
  fecharConfiguracaoCotacoes();
  mostrarToast("Configuração das APIs salva.");
  await atualizarCotacoes();
});


menuViewLinks.forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
    abrirView(link.dataset.view);
    history.replaceState(null, "", link.getAttribute("href"));
  });
});

menuScrollLinks.forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
    abrirView("dashboard");
    document.getElementById(link.dataset.scroll)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

document.querySelectorAll('.menu a[aria-disabled="true"]').forEach((link) => {
  link.addEventListener("click", (evento) => evento.preventDefault());
});

metaRendaMensal.addEventListener("change", salvarConfiguracoesRenda);
aporteMensal.addEventListener("change", salvarConfiguracoesRenda);
periodoProjecao.addEventListener("change", atualizarRendaPassiva);

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

  if (botao) {
    evento.stopPropagation();
    const { action, id } = botao.dataset;

    if (action === "favorito") {
      alternarFavorito(id);
    } else if (action === "detalhes") {
      abrirDrawerAtivo(id);
    }
    return;
  }

  const linha = evento.target.closest("tr[data-id]");
  if (linha) abrirDrawerAtivo(linha.dataset.id);
});

tabela.addEventListener("keydown", (evento) => {
  if (evento.key !== "Enter" && evento.key !== " ") return;
  const linha = evento.target.closest("tr[data-id]");
  if (!linha) return;
  evento.preventDefault();
  abrirDrawerAtivo(linha.dataset.id);
});


btnFecharDrawer.addEventListener("click", fecharDrawerAtivo);
assetDrawerBackdrop.addEventListener("click", fecharDrawerAtivo);

btnDrawerEditar.addEventListener("click", () => {
  const id = ativoNoDrawerId;
  fecharDrawerAtivo();
  if (id) abrirModalEdicao(id);
});

btnDrawerExcluir.addEventListener("click", () => {
  const id = ativoNoDrawerId;
  fecharDrawerAtivo();
  if (id) solicitarExclusao(id);
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && assetDrawer.classList.contains("open")) {
    fecharDrawerAtivo();
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
carregarStatusCotacoes();
atualizar();
abrirView(location.hash === "#renda-passiva" ? "renda-passiva" : "dashboard");

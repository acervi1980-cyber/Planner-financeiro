const STORAGE_KEY = "planner";
const THEME_KEY = "planner-theme";
const BACKUP_VERSION = 4;
const PASSIVE_SETTINGS_KEY = "planner-passive-settings";
const SUMMARY_CURRENCY_KEY = "planner-summary-currency";
const MOVEMENT_CURRENCY_KEY = "planner-movement-currency";

const modal = document.getElementById("modal");
const modalExcluir = document.getElementById("modalExcluir");
const modalImportacao = document.getElementById("modalImportacao");
const formAtivo = document.getElementById("formAtivo");
const categoria = document.getElementById("cat");
const moeda = document.getElementById("moeda");
const ticker = document.getElementById("tic");
const quantidade = document.getElementById("qtd");
const precoMedio = document.getElementById("pm");
const labelPrecoMedio = document.getElementById("labelPrecoMedio");
const hintPrecoMedio = document.getElementById("hintPrecoMedio");
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
const btnConfigurarBrapi = document.getElementById("btnConfigurarBrapi");
const QUOTES_STATUS_KEY = "planner-quotes-status";
const BRAPI_TOKEN_KEY = "planner-brapi-token";
const BRAPI_FREE_TICKERS = new Set(["PETR4", "MGLU3", "VALE3", "ITUB4"]);
const BRAPI_AUTO_INTERVAL_MS = 15 * 60 * 1000;
const BRAPI_AUTO_FRESHNESS_MS = 5 * 60 * 1000;
let atualizacaoAutomaticaEmAndamento = false;


const valorInvestidoEl = document.getElementById("valorInvestido");
const valorMercadoEl = document.getElementById("valorMercado");
const lucroPrejuizoEl = document.getElementById("lucroPrejuizo");
const rentabilidadeCarteiraEl = document.getElementById("rentabilidadeCarteira");
const detalheInvestidoEl = document.getElementById("detalheInvestido");
const detalheMercadoEl = document.getElementById("detalheMercado");
const summaryCurrencyButtons = document.querySelectorAll("[data-summary-currency]");
const alocacaoConteudo = document.getElementById("alocacaoConteudo");
const indicadorQuantidade = document.getElementById("indicadorQuantidade");
const indicadorFavoritos = document.getElementById("indicadorFavoritos");
const indicadorMelhorAtivo = document.getElementById("indicadorMelhorAtivo");
const indicadorPiorAtivo = document.getElementById("indicadorPiorAtivo");
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

const viewMovimentacoes = document.getElementById("viewMovimentacoes");
const btnNovaMovimentacao = document.getElementById("btnNovaMovimentacao");
const modalMovimentacao = document.getElementById("modalMovimentacao");
const formMovimentacao = document.getElementById("formMovimentacao");
const movAtivo = document.getElementById("movAtivo");
const movTipo = document.getElementById("movTipo");
const movData = document.getElementById("movData");
const movQuantidade = document.getElementById("movQuantidade");
const movQuantidadeGrupo = document.getElementById("movQuantidadeGrupo");
const movPreco = document.getElementById("movPreco");
const movPrecoLabel = document.getElementById("movPrecoLabel");
const movCorretora = document.getElementById("movCorretora");
const movObservacao = document.getElementById("movObservacao");
const movPreview = document.getElementById("movPreview");
const tabelaMovimentacoes = document.getElementById("tabelaMovimentacoes");
const movimentacoesVazias = document.getElementById("movimentacoesVazias");
const contadorMovimentacoes = document.getElementById("contadorMovimentacoes");
const buscaMovimentacao = document.getElementById("buscaMovimentacao");
const filtroTipoMovimentacao = document.getElementById("filtroTipoMovimentacao");
const movementCurrencyButtons = document.querySelectorAll("[data-movement-currency]");
const movTotalRegistros = document.getElementById("movTotalRegistros");
const movTotalCompras = document.getElementById("movTotalCompras");
const movTotalVendas = document.getElementById("movTotalVendas");
const movTotalRendimentos = document.getElementById("movTotalRendimentos");
const movComprasDetalhe = document.getElementById("movComprasDetalhe");
const movVendasDetalhe = document.getElementById("movVendasDetalhe");
const movRendimentosDetalhe = document.getElementById("movRendimentosDetalhe");
const drawerHistorico = document.getElementById("drawerHistorico");
const drawerHistoricoResumo = document.getElementById("drawerHistoricoResumo");
const btnDrawerMovimentacao = document.getElementById("btnDrawerMovimentacao");

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
let moedaResumo = localStorage.getItem(SUMMARY_CURRENCY_KEY) === "USD" ? "USD" : "BRL";
let moedaMovimentacoes = localStorage.getItem(MOVEMENT_CURRENCY_KEY) === "USD" ? "USD" : "BRL";

function criarId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `ativo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizarMovimentacao(movimentacao) {
  if (!movimentacao || typeof movimentacao !== "object") return null;

  const tipo = ["compra", "venda", "rendimento"].includes(String(movimentacao.tipo))
    ? String(movimentacao.tipo)
    : "compra";
  const quantidadeMov = Math.max(0, numeroSeguro(movimentacao.q ?? movimentacao.quantidade));
  const precoMov = Math.max(0, numeroSeguro(movimentacao.preco ?? movimentacao.p ?? movimentacao.valor));

  if ((tipo === "compra" || tipo === "venda") && quantidadeMov <= 0) return null;
  if (tipo === "rendimento" && precoMov <= 0) return null;

  return {
    id: String(movimentacao.id || criarId()),
    tipo,
    data: validarData(movimentacao.data || ""),
    q: tipo === "rendimento" ? 0 : quantidadeMov,
    preco: precoMov,
    corretora: String(movimentacao.corretora || "").trim(),
    observacao: String(movimentacao.observacao || "").trim()
  };
}

function normalizarAtivo(ativo) {
  const preco = numeroSeguro(ativo.p ?? ativo.precoMedio);
  const tipo = String(ativo.c ?? ativo.categoria ?? "FII");
  const cotacaoAtual = numeroSeguro(ativo.cot ?? ativo.cotacao, preco);
  const movimentacoes = Array.isArray(ativo.movimentacoes)
    ? ativo.movimentacoes.map(normalizarMovimentacao).filter(Boolean)
    : [];

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
    favorito: Boolean(ativo.favorito),
    movimentacoes
  };
}

function consolidarAtivosDuplicados(lista) {
  const consolidados = new Map();

  lista.forEach((ativo) => {
    if (!ativo.t) return;

    const chave = `${ativo.t}::${ativo.m}`;
    const existente = consolidados.get(chave);

    if (!existente) {
      consolidados.set(chave, { ...ativo, movimentacoes: [...(ativo.movimentacoes || [])] });
      return;
    }

    const quantidadeAnterior = numeroSeguro(existente.q);
    const quantidadeNova = numeroSeguro(ativo.q);
    const quantidadeTotal = quantidadeAnterior + quantidadeNova;
    const custoTotal = (quantidadeAnterior * numeroSeguro(existente.p)) +
      (quantidadeNova * numeroSeguro(ativo.p));

    existente.q = quantidadeTotal;
    existente.p = quantidadeTotal > 0 ? custoTotal / quantidadeTotal : 0;
    existente.cot = numeroSeguro(ativo.cot) > 0 ? numeroSeguro(ativo.cot) : existente.cot;
    existente.dy = numeroSeguro(ativo.dy) > 0 ? numeroSeguro(ativo.dy) : existente.dy;
    existente.data = ativo.data || existente.data;
    existente.corretora = ativo.corretora || existente.corretora;
    existente.favorito = existente.favorito || ativo.favorito;
    existente.movimentacoes = [
      ...(existente.movimentacoes || []),
      ...(ativo.movimentacoes || [])
    ];
  });

  return [...consolidados.values()];
}

function carregarAtivos() {
  try {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(dados)) {
      return [];
    }

    return consolidarAtivosDuplicados(
      dados.map(normalizarAtivo).filter((ativo) => ativo.t)
    );
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


const SIMPLE_ICON_SLUGS = {
  AAPL: "apple", COST: "costco", FTNT: "fortinet", MSFT: "microsoft",
  AMZN: "amazon", GOOGL: "google", GOOG: "google", META: "meta",
  NVDA: "nvidia", TSLA: "tesla", KO: "cocacola", MCD: "mcdonalds",
  DIS: "disney", WMT: "walmart", V: "visa", MA: "mastercard",
  NFLX: "netflix", PYPL: "paypal", ADBE: "adobe", INTC: "intel",
  AMD: "amd", ORCL: "oracle", CRM: "salesforce", QCOM: "qualcomm",
  PETR3: "petrobras", PETR4: "petrobras"
};

const LOGO_DOMAINS = {
  AAPL: "apple.com",
  COST: "costco.com",
  FTNT: "fortinet.com",
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

  const categoria = String(ativo?.c || "").trim();

  // FIIs e ETFs usam ícones próprios e consistentes. Isso evita que apareça
  // o favicon da gestora no lugar da identidade visual do tipo de ativo.
  if (
    categoria === "FII" ||
    categoria === "ETF Brasil" ||
    categoria === "ETF Internacional" ||
    categoria === "Renda Fixa"
  ) {
    return [];
  }

  const fontes = [];

  // Prioriza SVG vetorial para marcas conhecidas; se falhar, usa as fontes já existentes.
  const simpleIconSlug = SIMPLE_ICON_SLUGS[chave];
  if (simpleIconSlug) {
    fontes.push(`https://cdn.simpleicons.org/${encodeURIComponent(simpleIconSlug)}`);
  }

  const ehAcaoB3 = ativo?.m === "BRL" && (categoria === "Ação" || categoria === "BDR");
  const ehStockAmericana = ativo?.m === "USD" && categoria === "Stock";

  // Logotipos automáticos de ações e BDRs negociados na B3.
  if (ehAcaoB3) {
    fontes.push(`https://icons.brapi.dev/icons/${encodeURIComponent(chave)}.svg`);
  }

  // Logotipos automáticos de stocks negociadas nos Estados Unidos.
  if (ehStockAmericana) {
    fontes.push(`https://financialmodelingprep.com/image-stock/${encodeURIComponent(chave)}.png`);
  }

  // Fontes alternativas por domínio para os tickers conhecidos.
  const dominio = LOGO_DOMAINS[chave];
  if (dominio) {
    const host = String(dominio)
      .trim()
      .replace(/^https?:\/\//i, "")
      .replace(/\/.*$/, "")
      .toLowerCase();

    fontes.push(
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=256`,
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
  const tipoLogo = tipoLogoAtivo(ativo);
  const classes = ["asset-logo", classeExtra, `asset-logo-${tipoLogo}`].filter(Boolean).join(" ");
  const fallback = `<span class="asset-logo-icon asset-logo-placeholder" aria-hidden="true">${criarIconeSvg(tipoLogo)}</span>`;

  if (fontes.length) {
    const fontesSerializadas = escaparHtml(JSON.stringify(fontes));

    return `
      <div class="${classes}" data-logo-ticker="${escaparHtml(ativo.t)}">
        ${fallback}
        <img
          src="${fontes[0]}"
          alt="Logotipo ${escaparHtml(ativo.t)}"
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
      ${fallback}
    </div>
  `;
}

function preencherLogoDrawer(ativo) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = criarLogoHtml(ativo, "asset-logo-large").trim();
  const logoGerado = wrapper.firstElementChild;

  drawerLogo.className = logoGerado?.className || "asset-logo asset-logo-large";
  drawerLogo.innerHTML = logoGerado?.innerHTML || `<span class="asset-logo-icon asset-logo-placeholder" aria-hidden="true">${criarIconeSvg(tipoLogoAtivo(ativo))}</span>`;
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
  renderizarHistoricoDrawer(ativo);

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

  const totalResumo = totais[moedaResumo];
  const ativosNaMoeda = ativos.filter((ativo) => ativo.m === moedaResumo).length;
  const nomeMoeda = moedaResumo === "USD" ? "Dólar" : "Real";

  valorInvestidoEl.textContent = formatarMoeda(totalResumo.investido, moedaResumo);
  valorMercadoEl.textContent = formatarMoeda(totalResumo.mercado, moedaResumo);
  lucroPrejuizoEl.textContent = formatarMoeda(totalResumo.lucro, moedaResumo);

  const resultadoSinal = totalResumo.lucro;
  lucroPrejuizoEl.className = classeResultado(resultadoSinal);

  rentabilidadeCarteiraEl.textContent = formatarPercentual(totalResumo.rentabilidade);
  rentabilidadeCarteiraEl.className = `card-detail ${classeResultado(resultadoSinal)}`;

  detalheInvestidoEl.textContent = `${ativosNaMoeda} ${ativosNaMoeda === 1 ? "ativo" : "ativos"} em ${nomeMoeda}`;
  detalheMercadoEl.textContent = `Patrimônio da carteira em ${nomeMoeda}`;

  summaryCurrencyButtons.forEach((botao) => {
    const ativo = botao.dataset.summaryCurrency === moedaResumo;
    botao.classList.toggle("active", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  });
  estadoVazio.hidden = ativosVisiveis.length > 0;
  contadorAtivos.textContent = formatarContador(ativosVisiveis.length, ativos.length);

  atualizarIndicadores(totais, possuiBRL, possuiUSD);
  renderizarAlocacao();

  salvarLocalmente();
  atualizarRendaPassiva();
  atualizarMovimentacoes();
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

  const desempenhos = ativos
    .filter((ativo) => numeroSeguro(ativo.p) > 0)
    .map((ativo) => ({
      ticker: ativo.t,
      percentual: ((numeroSeguro(ativo.cot) - numeroSeguro(ativo.p)) / numeroSeguro(ativo.p)) * 100
    }))
    .filter((item) => Number.isFinite(item.percentual));

  if (desempenhos.length) {
    const melhor = desempenhos.reduce((a, b) => b.percentual > a.percentual ? b : a);
    const pior = desempenhos.reduce((a, b) => b.percentual < a.percentual ? b : a);
    indicadorMelhorAtivo.textContent = `${melhor.ticker} · ${formatarPercentual(melhor.percentual)}`;
    indicadorMelhorAtivo.className = melhor.percentual > 0 ? "positive" : melhor.percentual < 0 ? "negative" : "neutral";
    indicadorPiorAtivo.textContent = `${pior.ticker} · ${formatarPercentual(pior.percentual)}`;
    indicadorPiorAtivo.className = pior.percentual > 0 ? "positive" : pior.percentual < 0 ? "negative" : "neutral";
  } else {
    indicadorMelhorAtivo.textContent = "—";
    indicadorMelhorAtivo.className = "neutral";
    indicadorPiorAtivo.textContent = "—";
    indicadorPiorAtivo.className = "neutral";
  }
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
  tituloModal.textContent = "Adicionar compra";
  subtituloModal.textContent = "Informe a compra. Se o ticker já existir, a posição será consolidada.";
  if (labelPrecoMedio) labelPrecoMedio.textContent = "Preço da compra";
  if (hintPrecoMedio) hintPrecoMedio.textContent = "O preço médio da posição será recalculado automaticamente.";
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
  tituloModal.textContent = "Editar posição";
  subtituloModal.textContent = `Atualize os dados consolidados de ${ativo.t}.`;
  if (labelPrecoMedio) labelPrecoMedio.textContent = "Preço médio atual";
  if (hintPrecoMedio) hintPrecoMedio.textContent = "Na edição da posição, este campo altera diretamente o preço médio consolidado.";
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

function rotuloTipoMovimentacao(tipo) {
  if (tipo === "venda") return "Venda";
  if (tipo === "rendimento") return "Rendimento";
  return "Compra";
}

function classeTipoMovimentacao(tipo) {
  if (tipo === "venda") return "movement-type-sale";
  if (tipo === "rendimento") return "movement-type-income";
  return "movement-type-buy";
}

function obterMovimentacoesConsolidadas() {
  return ativos.flatMap((ativo) => (ativo.movimentacoes || []).map((movimentacao) => ({
    ...movimentacao,
    ativoId: ativo.id,
    ticker: ativo.t,
    moeda: ativo.m,
    categoria: ativo.c
  })));
}

function totalMovimentacao(movimentacao) {
  return movimentacao.tipo === "rendimento"
    ? numeroSeguro(movimentacao.preco)
    : numeroSeguro(movimentacao.q) * numeroSeguro(movimentacao.preco);
}

function renderizarHistoricoDrawer(ativo) {
  const lista = [...(ativo.movimentacoes || [])]
    .sort((a, b) => String(b.data || "").localeCompare(String(a.data || "")))
    .slice(0, 5);

  drawerHistoricoResumo.textContent = ativo.movimentacoes?.length
    ? `${ativo.movimentacoes.length} ${ativo.movimentacoes.length === 1 ? "movimentação" : "movimentações"}`
    : "Nenhuma movimentação registrada";

  if (!lista.length) {
    drawerHistorico.innerHTML = '<div class="drawer-history-empty">O histórico aparecerá aqui.</div>';
    return;
  }

  drawerHistorico.innerHTML = lista.map((mov) => {
    const total = totalMovimentacao(mov);
    const detalhe = mov.tipo === "rendimento"
      ? formatarMoeda(total, ativo.m)
      : `${numeroSeguro(mov.q).toLocaleString("pt-BR")} × ${formatarMoeda(mov.preco, ativo.m)}`;
    return `
      <div class="drawer-history-row">
        <span class="movement-type ${classeTipoMovimentacao(mov.tipo)}">${rotuloTipoMovimentacao(mov.tipo)}</span>
        <div><strong>${formatarData(mov.data)}</strong><small>${detalhe}</small></div>
        <strong>${formatarMoeda(total, ativo.m)}</strong>
      </div>`;
  }).join("");
}

function preencherSelectMovimentacoes(ativoSelecionadoId = "") {
  const ordenados = [...ativos].sort((a, b) => a.t.localeCompare(b.t, "pt-BR"));
  movAtivo.innerHTML = ordenados.length
    ? ordenados.map((ativo) => `<option value="${ativo.id}">${escaparHtml(ativo.t)} · ${escaparHtml(ativo.c)} · ${ativo.m}</option>`).join("")
    : '<option value="">Nenhum ativo cadastrado</option>';

  if (ativoSelecionadoId && ordenados.some((ativo) => ativo.id === ativoSelecionadoId)) {
    movAtivo.value = ativoSelecionadoId;
  }
}

function atualizarCamposMovimentacao() {
  const rendimento = movTipo.value === "rendimento";
  movQuantidadeGrupo.hidden = rendimento;
  movQuantidade.required = !rendimento;
  movPrecoLabel.textContent = rendimento ? "Valor recebido" : "Preço por unidade";
  movPreco.placeholder = rendimento ? "Valor total recebido" : "0,00";
  atualizarPreviewMovimentacao();
}

function atualizarPreviewMovimentacao() {
  const ativo = ativos.find((item) => item.id === movAtivo.value);
  const moedaCodigo = ativo?.m || "BRL";
  const total = movTipo.value === "rendimento"
    ? numeroSeguro(movPreco.value)
    : numeroSeguro(movQuantidade.value) * numeroSeguro(movPreco.value);
  movPreview.textContent = `${rotuloTipoMovimentacao(movTipo.value)}: ${formatarMoeda(total, moedaCodigo)}`;
}

function abrirModalMovimentacao(ativoId = "") {
  if (!ativos.length) {
    mostrarToast("Cadastre um ativo antes de registrar movimentações.", "error");
    return;
  }

  formMovimentacao.reset();
  preencherSelectMovimentacoes(ativoId);
  movTipo.value = "compra";
  movData.value = new Date().toISOString().slice(0, 10);
  const ativo = ativos.find((item) => item.id === movAtivo.value);
  movCorretora.value = ativo?.corretora || "";
  atualizarCamposMovimentacao();
  modalMovimentacao.showModal();
}

function fecharModalMovimentacao() {
  modalMovimentacao.close();
}

function excluirMovimentacao(ativoId, movimentacaoId) {
  const ativo = ativos.find((item) => item.id === ativoId);
  const mov = ativo?.movimentacoes?.find((item) => item.id === movimentacaoId);
  if (!ativo || !mov) return;

  if (!window.confirm(`Excluir esta ${rotuloTipoMovimentacao(mov.tipo).toLowerCase()} de ${ativo.t}?`)) return;

  // Reverte apenas movimentações que alteram a posição, preservando consistência da carteira.
  if (mov.tipo === "compra") {
    const qtdAtual = numeroSeguro(ativo.q);
    const qtdMov = numeroSeguro(mov.q);
    const qtdNova = Math.max(0, qtdAtual - qtdMov);
    const custoAtual = qtdAtual * numeroSeguro(ativo.p);
    const custoMov = qtdMov * numeroSeguro(mov.preco);
    ativo.q = qtdNova;
    ativo.p = qtdNova > 0 ? Math.max(0, (custoAtual - custoMov) / qtdNova) : 0;
  } else if (mov.tipo === "venda") {
    ativo.q = numeroSeguro(ativo.q) + numeroSeguro(mov.q);
  }

  ativo.movimentacoes = ativo.movimentacoes.filter((item) => item.id !== movimentacaoId);
  atualizar();
  atualizarMovimentacoes();
  if (ativoNoDrawerId === ativo.id) renderizarHistoricoDrawer(ativo);
  mostrarToast("Movimentação excluída.");
}

function atualizarMovimentacoes() {
  if (!tabelaMovimentacoes) return;

  const termo = buscaMovimentacao.value.trim().toUpperCase();
  const tipoFiltro = filtroTipoMovimentacao.value;
  const todas = obterMovimentacoesConsolidadas();
  const filtradas = todas
    .filter((mov) => (!termo || mov.ticker.includes(termo)) && (tipoFiltro === "Todos" || mov.tipo === tipoFiltro))
    .sort((a, b) => {
      const dataCmp = String(b.data || "").localeCompare(String(a.data || ""));
      return dataCmp || String(b.id).localeCompare(String(a.id));
    });

  tabelaMovimentacoes.innerHTML = filtradas.map((mov) => {
    const total = totalMovimentacao(mov);
    const quantidadeTexto = mov.tipo === "rendimento" ? "—" : numeroSeguro(mov.q).toLocaleString("pt-BR");
    const precoTexto = formatarMoeda(mov.preco, mov.moeda);
    return `
      <tr>
        <td>${formatarData(mov.data)}</td>
        <td><strong>${escaparHtml(mov.ticker)}</strong><small class="movement-asset-type">${escaparHtml(mov.categoria)}</small></td>
        <td><span class="movement-type ${classeTipoMovimentacao(mov.tipo)}">${rotuloTipoMovimentacao(mov.tipo)}</span></td>
        <td>${quantidadeTexto}</td>
        <td>${precoTexto}</td>
        <td><strong>${formatarMoeda(total, mov.moeda)}</strong></td>
        <td>${escaparHtml(mov.corretora || "—")}</td>
        <td>${escaparHtml(mov.observacao || "—")}</td>
        <td><button type="button" class="table-action delete" data-delete-movement="${mov.id}" data-asset-id="${mov.ativoId}">Excluir</button></td>
      </tr>`;
  }).join("");

  movimentacoesVazias.hidden = filtradas.length > 0;
  contadorMovimentacoes.textContent = `${filtradas.length} ${filtradas.length === 1 ? "movimentação" : "movimentações"}`;
  movTotalRegistros.textContent = todas.length.toLocaleString("pt-BR");

  const moeda = moedaMovimentacoes;
  const naMoeda = todas.filter((mov) => mov.moeda === moeda);
  const compras = naMoeda.filter((mov) => mov.tipo === "compra").reduce((soma, mov) => soma + totalMovimentacao(mov), 0);
  const vendas = naMoeda.filter((mov) => mov.tipo === "venda").reduce((soma, mov) => soma + totalMovimentacao(mov), 0);
  const rendimentos = naMoeda.filter((mov) => mov.tipo === "rendimento").reduce((soma, mov) => soma + totalMovimentacao(mov), 0);

  movTotalCompras.textContent = formatarMoeda(compras, moeda);
  movTotalVendas.textContent = formatarMoeda(vendas, moeda);
  movTotalRendimentos.textContent = formatarMoeda(rendimentos, moeda);
  const rotuloMoeda = moeda === "USD" ? "Total em Dólar" : "Total em Real";
  movComprasDetalhe.textContent = rotuloMoeda;
  movVendasDetalhe.textContent = rotuloMoeda;
  movRendimentosDetalhe.textContent = moeda === "USD" ? "Rendimentos em Dólar" : "Rendimentos em Real";

  movementCurrencyButtons.forEach((botao) => {
    const ativo = botao.dataset.movementCurrency === moeda;
    botao.classList.toggle("active", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  });
}

function abrirView(nomeView) {
  fecharDrawerAtivo();
  const rendaAtiva = nomeView === "renda-passiva";
  const movimentacoesAtiva = nomeView === "movimentacoes";
  const dashboardAtivo = !rendaAtiva && !movimentacoesAtiva;

  viewDashboard.hidden = !dashboardAtivo;
  viewDashboard.classList.toggle("active", dashboardAtivo);
  viewRendaPassiva.hidden = !rendaAtiva;
  viewRendaPassiva.classList.toggle("active", rendaAtiva);
  viewMovimentacoes.hidden = !movimentacoesAtiva;
  viewMovimentacoes.classList.toggle("active", movimentacoesAtiva);

  if (rendaAtiva) {
    tituloPagina.textContent = "Renda Passiva";
    subtituloPagina.textContent = "Projeções simples para acompanhar sua renda e seus reinvestimentos";
  } else if (movimentacoesAtiva) {
    tituloPagina.textContent = "Movimentações";
    subtituloPagina.textContent = "Histórico de compras, vendas e rendimentos da carteira";
  } else {
    tituloPagina.textContent = "Dashboard";
    subtituloPagina.textContent = "Visão consolidada da sua carteira";
  }

  menuViewLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.view === nomeView);
  });

  if (rendaAtiva) atualizarRendaPassiva();
  if (movimentacoesAtiva) atualizarMovimentacoes();

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

function obterTokenBrapi() {
  try {
    return (localStorage.getItem(BRAPI_TOKEN_KEY) || "").trim();
  } catch (erro) {
    console.warn("Não foi possível ler o token da BRAPI.", erro);
    return "";
  }
}

function configurarBrapi() {
  const tokenAtual = obterTokenBrapi();
  const resposta = window.prompt(
    "Cole seu token da BRAPI. Ele ficará salvo somente neste navegador e não será enviado ao GitHub.\n\nDeixe em branco e confirme para remover o token.",
    tokenAtual
  );

  if (resposta === null) return;

  const token = resposta.trim();

  try {
    if (token) {
      localStorage.setItem(BRAPI_TOKEN_KEY, token);
      quotesStatusPanel.classList.remove("is-error");
      quotesStatusPanel.classList.add("is-success");
      quotesStatusIcon.textContent = "✓";
      quotesStatusTitle.textContent = "BRAPI configurada";
      quotesStatusText.textContent = "Token salvo apenas neste navegador. Agora você pode atualizar as cotações da B3.";
      mostrarToast("Token da BRAPI salvo neste navegador.");
    } else {
      localStorage.removeItem(BRAPI_TOKEN_KEY);
      quotesStatusPanel.classList.remove("is-success", "is-error");
      quotesStatusIcon.textContent = "◷";
      quotesStatusTitle.textContent = "BRAPI sem token";
      quotesStatusText.textContent = "Sem token, somente os tickers gratuitos de teste da BRAPI podem ser consultados.";
      mostrarToast("Token da BRAPI removido.");
    }
  } catch (erro) {
    console.error("Não foi possível salvar o token da BRAPI.", erro);
    mostrarToast("Não foi possível salvar o token da BRAPI.", true);
  }
}

function tickerConsultaBrapi(ativo) {
  const tickerBase = String(ativo.t || "").trim().toUpperCase().replace(/\s+/g, "");

  // Alguns cadastros antigos de FII foram salvos sem o sufixo 11 (ex.: VRTA).
  // Para a consulta na B3 tentamos o formato padrão, sem alterar o ticker exibido ao usuário.
  if (ativo.c === "FII" && /^[A-Z]{4}$/.test(tickerBase)) {
    return `${tickerBase}11`;
  }

  return tickerBase;
}

function ativosElegiveisBrapi() {
  const categoriasB3 = new Set(["Ação", "FII", "ETF Brasil", "BDR"]);
  return ativos.filter((ativo) => ativo.m === "BRL" && categoriasB3.has(ativo.c) && ativo.t);
}

async function buscarLoteBrapi(tickers, token) {
  const url = `https://brapi.dev/api/quote/${tickers.map(encodeURIComponent).join(",")}`;
  const headers = { Accept: "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const resposta = await fetch(url, { headers, cache: "no-store" });

  if (!resposta.ok) {
    let detalhe = "";
    try {
      const corpo = await resposta.json();
      detalhe = corpo?.message || corpo?.error || "";
    } catch (_) {
      // resposta sem JSON; mantemos apenas o status HTTP
    }

    const erro = new Error(detalhe || `BRAPI respondeu HTTP ${resposta.status}.`);
    erro.status = resposta.status;
    throw erro;
  }

  const dados = await resposta.json();
  return Array.isArray(dados?.results) ? dados.results : [];
}

function carregarStatusCotacoes() {
  let ultimaVerificacao = "";

  try {
    ultimaVerificacao = localStorage.getItem(QUOTES_STATUS_KEY) || "";
  } catch (erro) {
    console.warn("Não foi possível ler o status das cotações.", erro);
  }

  quotesStatusTime.textContent = formatarDataHoraCotacoes(ultimaVerificacao);

  if (ultimaVerificacao) {
    quotesStatusPanel.classList.add("is-success");
    quotesStatusIcon.textContent = "✓";
    quotesStatusTitle.textContent = "Cotações da B3 atualizadas";
    quotesStatusText.textContent = "A última consulta pela BRAPI foi concluída. Ativos em dólar permanecem manuais nesta etapa.";
  } else if (obterTokenBrapi()) {
    quotesStatusTitle.textContent = "BRAPI pronta";
    quotesStatusText.textContent = "Token configurado. Clique em Atualizar cotações para consultar os ativos da B3.";
  }
}

async function atualizarCotacoes() {
  if (!btnAtualizarCotacoes || btnAtualizarCotacoes.disabled) return;

  const ativosB3 = ativosElegiveisBrapi();
  const token = obterTokenBrapi();

  if (!ativosB3.length) {
    quotesStatusPanel.classList.remove("is-success", "is-loading", "is-error");
    quotesStatusIcon.textContent = "i";
    quotesStatusTitle.textContent = "Nenhum ativo da B3 para atualizar";
    quotesStatusText.textContent = "Nesta etapa a BRAPI atualiza apenas Ações, FIIs, ETFs Brasil e BDRs cadastrados em Real.";
    mostrarToast("Nenhum ativo da B3 encontrado na carteira.");
    return;
  }

  const tickersConsulta = [...new Set(ativosB3.map(tickerConsultaBrapi).filter(Boolean))];
  const precisaToken = tickersConsulta.some((ticker) => !BRAPI_FREE_TICKERS.has(ticker));

  if (precisaToken && !token) {
    quotesStatusPanel.classList.remove("is-success", "is-loading");
    quotesStatusPanel.classList.add("is-error");
    quotesStatusIcon.textContent = "!";
    quotesStatusTitle.textContent = "Configure o token da BRAPI";
    quotesStatusText.textContent = "Clique em ⚙ BRAPI e cole seu token. Ele será guardado somente neste navegador.";
    quotesStatusTime.textContent = "Aguardando configuração";
    mostrarToast("Configure o token da BRAPI antes de atualizar.", true);
    return;
  }

  btnAtualizarCotacoes.disabled = true;
  btnAtualizarCotacoes.classList.add("is-loading");
  btnAtualizarCotacoes.textContent = "Atualizando B3...";
  quotesStatusPanel.classList.remove("is-success", "is-error");
  quotesStatusPanel.classList.add("is-loading");
  quotesStatusIcon.textContent = "↻";
  quotesStatusTitle.textContent = "Consultando a BRAPI";
  quotesStatusText.textContent = `Buscando ${tickersConsulta.length} ${tickersConsulta.length === 1 ? "cotação" : "cotações"} da B3...`;
  quotesStatusTime.textContent = "Em andamento";

  try {
    const resultados = [];
    const TAMANHO_LOTE = 20;

    for (let i = 0; i < tickersConsulta.length; i += TAMANHO_LOTE) {
      const lote = tickersConsulta.slice(i, i + TAMANHO_LOTE);
      const respostaLote = await buscarLoteBrapi(lote, token);
      resultados.push(...respostaLote);
    }

    const precos = new Map();

    resultados.forEach((resultado) => {
      const simbolo = String(resultado?.symbol || resultado?.stock || "").trim().toUpperCase();
      const preco = numeroSeguro(resultado?.regularMarketPrice, NaN);
      if (simbolo && Number.isFinite(preco) && preco > 0) {
        precos.set(simbolo, preco);
      }
    });

    let atualizados = 0;
    const naoEncontrados = [];

    ativosB3.forEach((ativo) => {
      const tickerBrapi = tickerConsultaBrapi(ativo);
      const novoPreco = precos.get(tickerBrapi);

      if (Number.isFinite(novoPreco) && novoPreco > 0) {
        ativo.cot = novoPreco;
        atualizados += 1;
      } else {
        naoEncontrados.push(ativo.t);
      }
    });

    const agora = new Date().toISOString();
    localStorage.setItem(QUOTES_STATUS_KEY, agora);
    atualizar();

    quotesStatusPanel.classList.remove("is-loading", "is-error");
    quotesStatusPanel.classList.add("is-success");
    quotesStatusIcon.textContent = "✓";
    quotesStatusTitle.textContent = `${atualizados} ${atualizados === 1 ? "cotação atualizada" : "cotações atualizadas"} pela BRAPI`;
    quotesStatusText.textContent = naoEncontrados.length
      ? `Sem cotação para: ${naoEncontrados.join(", ")}. Os preços anteriores desses ativos foram preservados.`
      : "Ações, FIIs, ETFs Brasil e BDRs em Real foram atualizados. Ativos em dólar permanecem inalterados nesta etapa.";
    quotesStatusTime.textContent = formatarDataHoraCotacoes(agora);
    mostrarToast(`${atualizados} ${atualizados === 1 ? "cotação atualizada" : "cotações atualizadas"} pela BRAPI.`);
  } catch (erro) {
    console.error("Falha ao atualizar cotações pela BRAPI:", erro);
    quotesStatusPanel.classList.remove("is-loading", "is-success");
    quotesStatusPanel.classList.add("is-error");
    quotesStatusIcon.textContent = "!";
    quotesStatusTitle.textContent = "Não foi possível atualizar pela BRAPI";

    if (erro?.status === 401 || erro?.status === 403) {
      quotesStatusText.textContent = "O token da BRAPI foi recusado. Clique em ⚙ BRAPI para conferir ou substituir o token.";
    } else {
      quotesStatusText.textContent = "As cotações anteriores foram preservadas. Confira sua conexão e tente novamente.";
    }

    quotesStatusTime.textContent = "Falha na atualização";
    mostrarToast("Falha ao consultar a BRAPI. Nenhuma cotação foi zerada.", true);
  } finally {
    btnAtualizarCotacoes.disabled = false;
    btnAtualizarCotacoes.classList.remove("is-loading");
    btnAtualizarCotacoes.textContent = "↻ Atualizar cotações";
  }
}


function ultimaCotacaoAindaRecente() {
  try {
    const ultima = localStorage.getItem(QUOTES_STATUS_KEY);
    if (!ultima) return false;
    const tempo = new Date(ultima).getTime();
    return Number.isFinite(tempo) && (Date.now() - tempo) < BRAPI_AUTO_FRESHNESS_MS;
  } catch (_) {
    return false;
  }
}

async function atualizarCotacoesAutomaticamente({ forcar = false } = {}) {
  if (atualizacaoAutomaticaEmAndamento || document.hidden) return;

  const ativosB3 = ativosElegiveisBrapi();
  if (!ativosB3.length) return;

  const token = obterTokenBrapi();
  const tickers = [...new Set(ativosB3.map(tickerConsultaBrapi).filter(Boolean))];
  const precisaToken = tickers.some((ticker) => !BRAPI_FREE_TICKERS.has(ticker));

  // Sem token, não interrompe a navegação com erro automático.
  // O botão manual e o botão de configuração continuam disponíveis.
  if (precisaToken && !token) {
    quotesStatusPanel.classList.remove("is-loading", "is-success");
    quotesStatusPanel.classList.add("is-error");
    quotesStatusIcon.textContent = "!";
    quotesStatusTitle.textContent = "Atualização automática aguardando BRAPI";
    quotesStatusText.textContent = "Configure o token uma única vez em ⚙ BRAPI. Depois, o Planner atualizará a B3 automaticamente ao abrir.";
    quotesStatusTime.textContent = "Token necessário";
    return;
  }

  if (!forcar && ultimaCotacaoAindaRecente()) return;

  atualizacaoAutomaticaEmAndamento = true;
  try {
    await atualizarCotacoes();
  } finally {
    atualizacaoAutomaticaEmAndamento = false;
  }
}

function iniciarAtualizacaoAutomaticaBrapi() {
  // Executa logo após a interface carregar.
  window.setTimeout(() => atualizarCotacoesAutomaticamente(), 500);

  // Enquanto o Planner permanecer aberto, verifica novamente a cada 15 minutos.
  window.setInterval(() => atualizarCotacoesAutomaticamente({ forcar: true }), BRAPI_AUTO_INTERVAL_MS);

  // Ao voltar para uma aba que ficou em segundo plano, verifica se os preços ficaram antigos.
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) atualizarCotacoesAutomaticamente();
  });
}

document.getElementById("btnAdicionar").addEventListener("click", abrirModalNovoAtivo);
document.getElementById("btnCancelar").addEventListener("click", fecharModalCadastro);
document.getElementById("btnFecharModal").addEventListener("click", fecharModalCadastro);
document.getElementById("btnCancelarExclusao").addEventListener("click", fecharModalExclusao);
document.getElementById("btnExportar").addEventListener("click", exportarBackup);
document.getElementById("btnImportar").addEventListener("click", () => arquivoImportacao.click());
btnAtualizarCotacoes.addEventListener("click", atualizarCotacoes);
btnConfigurarBrapi?.addEventListener("click", configurarBrapi);
document.getElementById("btnConfirmarImportacao").addEventListener("click", confirmarImportacao);
document.getElementById("btnCancelarImportacao").addEventListener("click", cancelarImportacao);


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
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
    mostrarToast("Este módulo será liberado em uma próxima atualização.");
  });
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



summaryCurrencyButtons.forEach((botao) => {
  botao.addEventListener("click", () => {
    moedaResumo = botao.dataset.summaryCurrency === "USD" ? "USD" : "BRL";
    localStorage.setItem(SUMMARY_CURRENCY_KEY, moedaResumo);
    atualizar();
  });
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

btnNovaMovimentacao.addEventListener("click", () => abrirModalMovimentacao());
document.getElementById("btnFecharMovimentacao").addEventListener("click", fecharModalMovimentacao);
document.getElementById("btnCancelarMovimentacao").addEventListener("click", fecharModalMovimentacao);
movTipo.addEventListener("change", atualizarCamposMovimentacao);
movAtivo.addEventListener("change", () => {
  const ativo = ativos.find((item) => item.id === movAtivo.value);
  if (ativo && !movCorretora.value) movCorretora.value = ativo.corretora || "";
  atualizarPreviewMovimentacao();
});
movQuantidade.addEventListener("input", atualizarPreviewMovimentacao);
movPreco.addEventListener("input", atualizarPreviewMovimentacao);
buscaMovimentacao.addEventListener("input", atualizarMovimentacoes);
filtroTipoMovimentacao.addEventListener("change", atualizarMovimentacoes);
movementCurrencyButtons.forEach((botao) => {
  botao.addEventListener("click", () => {
    moedaMovimentacoes = botao.dataset.movementCurrency === "USD" ? "USD" : "BRL";
    localStorage.setItem(MOVEMENT_CURRENCY_KEY, moedaMovimentacoes);
    atualizarMovimentacoes();
  });
});

tabelaMovimentacoes.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-delete-movement]");
  if (!botao) return;
  excluirMovimentacao(botao.dataset.assetId, botao.dataset.deleteMovement);
});

btnDrawerMovimentacao.addEventListener("click", () => {
  const id = ativoNoDrawerId;
  fecharDrawerAtivo();
  if (id) abrirModalMovimentacao(id);
});

formMovimentacao.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const ativo = ativos.find((item) => item.id === movAtivo.value);
  if (!ativo) {
    mostrarToast("Selecione um ativo válido.", "error");
    return;
  }

  const tipo = movTipo.value;
  const qtd = tipo === "rendimento" ? 0 : numeroSeguro(movQuantidade.value);
  const preco = numeroSeguro(movPreco.value);

  if (!movData.value || preco <= 0 || (tipo !== "rendimento" && qtd <= 0)) {
    mostrarToast("Preencha os dados da movimentação com valores válidos.", "error");
    return;
  }

  if (tipo === "venda" && qtd > numeroSeguro(ativo.q)) {
    mostrarToast(`A venda excede a posição atual de ${ativo.q.toLocaleString("pt-BR")} ${ativo.t}.`, "error");
    return;
  }

  const movimentacao = {
    id: criarId(),
    tipo,
    data: validarData(movData.value),
    q: qtd,
    preco,
    corretora: movCorretora.value.trim(),
    observacao: movObservacao.value.trim()
  };

  if (tipo === "compra") {
    const qtdAnterior = numeroSeguro(ativo.q);
    const qtdNova = qtdAnterior + qtd;
    ativo.p = qtdNova > 0 ? ((qtdAnterior * numeroSeguro(ativo.p)) + (qtd * preco)) / qtdNova : 0;
    ativo.q = qtdNova;
  } else if (tipo === "venda") {
    ativo.q = Math.max(0, numeroSeguro(ativo.q) - qtd);
  }

  ativo.corretora = movimentacao.corretora || ativo.corretora;
  ativo.data = movimentacao.data || ativo.data;
  ativo.movimentacoes = [...(ativo.movimentacoes || []), movimentacao];
  modalMovimentacao.close();
  atualizar();
  mostrarToast(`${rotuloTipoMovimentacao(tipo)} de ${ativo.t} registrada.`);
});

formAtivo.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const tickerNormalizado = ticker.value.trim().toUpperCase();
  const quantidadeInformada = numeroSeguro(quantidade.value);
  const precoInformado = numeroSeguro(precoMedio.value);
  const cotacaoInformada = numeroSeguro(cotacao.value);
  const dadosBase = {
    id: ativoEmEdicaoId || criarId(),
    t: tickerNormalizado,
    c: categoria.value,
    m: moeda.value,
    q: quantidadeInformada,
    p: precoInformado,
    cot: cotacaoInformada,
    dy: numeroSeguro(dividendYield.value),
    data: validarData(dataCompra.value),
    corretora: corretora.value.trim(),
    favorito: favorito.checked
  };

  if (
    !dadosBase.t ||
    dadosBase.q <= 0 ||
    dadosBase.p < 0 ||
    dadosBase.cot < 0 ||
    dadosBase.dy < 0
  ) {
    alert("Preencha todos os campos obrigatórios com valores válidos.");
    return;
  }

  let mensagem = "";

  if (ativoEmEdicaoId) {
    const indice = ativos.findIndex((ativo) => ativo.id === ativoEmEdicaoId);

    if (indice >= 0) {
      const atual = ativos[indice];
      ativos[indice] = {
        ...dadosBase,
        cot: dadosBase.cot > 0 ? dadosBase.cot : atual.cot,
        movimentacoes: [...(atual.movimentacoes || [])]
      };
      mensagem = `${dadosBase.t} foi atualizado.`;
    }
  } else {
    const existente = ativos.find(
      (ativo) => ativo.t === dadosBase.t && ativo.m === dadosBase.m
    );

    const novaMovimentacao = {
      id: criarId(),
      tipo: "compra",
      data: dadosBase.data,
      q: dadosBase.q,
      preco: dadosBase.p,
      corretora: dadosBase.corretora
    };

    if (existente) {
      const quantidadeAnterior = numeroSeguro(existente.q);
      const custoAnterior = quantidadeAnterior * numeroSeguro(existente.p);
      const custoNovaCompra = dadosBase.q * dadosBase.p;
      const quantidadeTotal = quantidadeAnterior + dadosBase.q;

      existente.q = quantidadeTotal;
      existente.p = quantidadeTotal > 0
        ? (custoAnterior + custoNovaCompra) / quantidadeTotal
        : 0;
      existente.cot = dadosBase.cot > 0 ? dadosBase.cot : existente.cot;
      existente.dy = dadosBase.dy > 0 ? dadosBase.dy : existente.dy;
      existente.data = dadosBase.data || existente.data;
      existente.corretora = dadosBase.corretora || existente.corretora;
      existente.favorito = existente.favorito || dadosBase.favorito;
      existente.c = dadosBase.c || existente.c;
      existente.movimentacoes = [
        ...(existente.movimentacoes || []),
        novaMovimentacao
      ];

      mensagem = `${dadosBase.t}: compra consolidada. Nova quantidade ${quantidadeTotal} e preço médio ${formatarMoeda(existente.p, existente.m)}.`;
    } else {
      const novoAtivo = {
        ...dadosBase,
        cot: dadosBase.cot > 0 ? dadosBase.cot : dadosBase.p,
        movimentacoes: [novaMovimentacao]
      };
      ativos.push(novoAtivo);
      mensagem = `${dadosBase.t} foi adicionado à carteira.`;
    }
  }

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
abrirView(
  location.hash === "#renda-passiva"
    ? "renda-passiva"
    : location.hash === "#movimentacoes"
      ? "movimentacoes"
      : "dashboard"
);
iniciarAtualizacaoAutomaticaBrapi();

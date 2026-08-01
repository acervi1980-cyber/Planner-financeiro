const STORAGE_KEY = "planner_financeiro_carteira_v3";
const LEGACY_KEY = "planner_financeiro_carteira_v2";

const form = document.getElementById("formAtivo");
const corpoTabela = document.querySelector("#tabela tbody");
const estadoVazio = document.getElementById("estadoVazio");
const mensagem = document.getElementById("mensagem");
const contadorAtivos = document.getElementById("contadorAtivos");
const btnLimparTudo = document.getElementById("btnLimparTudo");

const campos = {
  tipo: document.getElementById("tipo"),
  moeda: document.getElementById("moeda"),
  ticker: document.getElementById("ticker"),
  quantidade: document.getElementById("qtd"),
  precoMedio: document.getElementById("pm"),
  cotacao: document.getElementById("cotacao"),
};

let carteira = carregarCarteira();

function formatarMoeda(valor, moeda) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: moeda });
}
function numero(valor, casas = 2) {
  return Number(valor).toLocaleString("pt-BR", { maximumFractionDigits: casas });
}
function percentual(valor) {
  return `${Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
}
function carregarCarteira() {
  try {
    const atual = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(atual)) return atual;
    const anterior = JSON.parse(localStorage.getItem(LEGACY_KEY));
    return Array.isArray(anterior) ? anterior.map(item => ({ ...item, moeda: item.moeda || "BRL" })) : [];
  } catch { return []; }
}
function salvarCarteira() { localStorage.setItem(STORAGE_KEY, JSON.stringify(carteira)); }
function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.classList.toggle("erro", erro);
  clearTimeout(mostrarMensagem.timer);
  mostrarMensagem.timer = setTimeout(() => { mensagem.textContent = ""; mensagem.classList.remove("erro"); }, 3500);
}
function ajustarMoedaPorTipo() {
  campos.moeda.value = (campos.tipo.value === "Stock" || campos.tipo.value === "ETF Internacional") ? "USD" : "BRL";
}
function lerFormulario() {
  return {
    tipo: campos.tipo.value,
    moeda: campos.moeda.value,
    ticker: campos.ticker.value.trim().toUpperCase(),
    quantidade: Number(campos.quantidade.value),
    precoMedio: Number(campos.precoMedio.value),
    cotacao: Number(campos.cotacao.value),
  };
}
function validarAtivo(a) {
  if (!a.ticker) return "Informe o ticker.";
  if (!Number.isFinite(a.quantidade) || a.quantidade <= 0) return "Informe uma quantidade maior que zero.";
  if (!Number.isFinite(a.precoMedio) || a.precoMedio < 0) return "Informe um preço médio válido.";
  if (!Number.isFinite(a.cotacao) || a.cotacao < 0) return "Informe uma cotação válida.";
  return "";
}
function adicionarOuSomarAtivo(novo) {
  const existente = carteira.find(i => i.ticker === novo.ticker && i.tipo === novo.tipo && (i.moeda || "BRL") === novo.moeda);
  if (existente) {
    const total = existente.quantidade + novo.quantidade;
    existente.precoMedio = ((existente.quantidade * existente.precoMedio) + (novo.quantidade * novo.precoMedio)) / total;
    existente.quantidade = total;
    existente.cotacao = novo.cotacao;
    mostrarMensagem(`${novo.ticker} atualizado e preço médio recalculado.`);
    return;
  }
  carteira.push({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), ...novo });
  mostrarMensagem(`${novo.ticker} adicionado em ${novo.moeda}.`);
}
function excluirAtivo(id) {
  const ativo = carteira.find(i => i.id === id);
  if (!ativo || !confirm(`Excluir ${ativo.ticker} da carteira?`)) return;
  carteira = carteira.filter(i => i.id !== id);
  salvarCarteira(); renderizar();
}
function editarAtivo(id) {
  const a = carteira.find(i => i.id === id); if (!a) return;
  campos.tipo.value = a.tipo; campos.moeda.value = a.moeda || "BRL"; campos.ticker.value = a.ticker;
  campos.quantidade.value = a.quantidade; campos.precoMedio.value = a.precoMedio.toFixed(2); campos.cotacao.value = a.cotacao.toFixed(2);
  carteira = carteira.filter(i => i.id !== id); salvarCarteira(); renderizar(); campos.ticker.focus();
  mostrarMensagem(`Edite os dados de ${a.ticker} e clique em Adicionar ativo.`);
}
function renderizarTabela() {
  corpoTabela.innerHTML = "";
  carteira.slice().sort((a,b) => (a.moeda||"BRL").localeCompare(b.moeda||"BRL") || a.tipo.localeCompare(b.tipo) || a.ticker.localeCompare(b.ticker)).forEach(a => {
    const moeda = a.moeda || "BRL", investido = a.quantidade * a.precoMedio, mercado = a.quantidade * a.cotacao;
    const resultado = mercado - investido, rentabilidade = investido > 0 ? (resultado / investido) * 100 : 0, classe = resultado >= 0 ? "positivo" : "negativo";
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${a.tipo}</td><td><span class="moeda-badge ${moeda === "USD" ? "usd" : ""}">${moeda}</span></td><td class="ticker-cell">${a.ticker}</td><td>${numero(a.quantidade,6)}</td><td>${formatarMoeda(a.precoMedio,moeda)}</td><td>${formatarMoeda(a.cotacao,moeda)}</td><td>${formatarMoeda(investido,moeda)}</td><td>${formatarMoeda(mercado,moeda)}</td><td class="${classe}">${formatarMoeda(resultado,moeda)}</td><td class="${classe}">${percentual(rentabilidade)}</td><td><div class="acoes"><button class="btn-icon" data-editar="${a.id}">Editar</button><button class="btn-icon excluir" data-excluir="${a.id}">Excluir</button></div></td>`;
    corpoTabela.appendChild(tr);
  });
  estadoVazio.classList.toggle("hidden", carteira.length > 0);
  document.getElementById("tabela").classList.toggle("hidden", carteira.length === 0);
}
function totaisDaMoeda(moeda) {
  return carteira.filter(i => (i.moeda || "BRL") === moeda).reduce((acc,i) => {
    acc.investido += i.quantidade * i.precoMedio; acc.mercado += i.quantidade * i.cotacao; return acc;
  }, { investido: 0, mercado: 0 });
}
function preencherResumo(moeda) {
  const t = totaisDaMoeda(moeda), lucro = t.mercado - t.investido, rent = t.investido > 0 ? (lucro / t.investido) * 100 : 0;
  const lucroEl = document.getElementById(`lucro${moeda}`), rentEl = document.getElementById(`rentabilidade${moeda}`);
  document.getElementById(`investido${moeda}`).textContent = formatarMoeda(t.investido, moeda);
  document.getElementById(`mercado${moeda}`).textContent = formatarMoeda(t.mercado, moeda);
  lucroEl.textContent = formatarMoeda(lucro, moeda); rentEl.textContent = percentual(rent);
  lucroEl.className = lucro >= 0 ? "positivo" : "negativo"; rentEl.className = lucro >= 0 ? "positivo" : "negativo";
}
function renderizarResumo() {
  preencherResumo("BRL"); preencherResumo("USD");
  contadorAtivos.textContent = carteira.length === 0 ? "Nenhum ativo cadastrado" : `${carteira.length} ${carteira.length === 1 ? "ativo cadastrado" : "ativos cadastrados"}`;
}
function renderizar() { renderizarTabela(); renderizarResumo(); }

campos.tipo.addEventListener("change", ajustarMoedaPorTipo);
form.addEventListener("submit", e => {
  e.preventDefault(); const ativo = lerFormulario(), erro = validarAtivo(ativo);
  if (erro) return mostrarMensagem(erro, true);
  adicionarOuSomarAtivo(ativo); salvarCarteira(); renderizar();
  campos.ticker.value = ""; campos.quantidade.value = ""; campos.precoMedio.value = ""; campos.cotacao.value = ""; campos.ticker.focus();
});
corpoTabela.addEventListener("click", e => {
  const ed = e.target.closest("[data-editar]"), ex = e.target.closest("[data-excluir]");
  if (ed) editarAtivo(ed.dataset.editar); if (ex) excluirAtivo(ex.dataset.excluir);
});
btnLimparTudo.addEventListener("click", () => {
  if (!carteira.length || !confirm("Apagar todos os ativos da carteira?")) return;
  carteira = []; salvarCarteira(); renderizar(); mostrarMensagem("Carteira apagada.");
});
adjustarMoedaPorTipo(); salvarCarteira(); renderizar();

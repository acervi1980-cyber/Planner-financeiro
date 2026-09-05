const BRAPI_ENDPOINT = "https://brapi.dev/api/v2/stocks/quote";
const MAX_TICKERS = 20;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function normalizarTickers(valor) {
  return [...new Set(
    String(valor || "")
      .split(",")
      .map((item) => item.trim().toUpperCase())
      .filter(Boolean)
  )];
}

function resumoSeguro(payload) {
  try {
    const texto = typeof payload === "string" ? payload : JSON.stringify(payload);
    return String(texto || "").slice(0, 1500);
  } catch (_) {
    return "[resposta não serializável]";
  }
}

export default async (request) => {
  const requestId = crypto.randomUUID().slice(0, 8);

  if (request.method !== "GET") {
    console.warn(`[BRAPI ${requestId}] método não permitido: ${request.method}`);
    return json({ error: "Método não permitido.", requestId }, 405);
  }

  const token = (process.env.BRAPI_TOKEN || "").trim();
  if (!token) {
    console.error(`[BRAPI ${requestId}] BRAPI_TOKEN ausente no ambiente do Netlify.`);
    return json({
      error: "BRAPI_TOKEN não está configurado no Netlify.",
      code: "BRAPI_TOKEN_MISSING",
      requestId
    }, 500);
  }

  const url = new URL(request.url);
  const tickers = normalizarTickers(url.searchParams.get("symbols"));

  if (!tickers.length) {
    return json({ error: "Informe ao menos um ticker em symbols.", requestId }, 400);
  }

  if (tickers.length > MAX_TICKERS) {
    return json({ error: `Máximo de ${MAX_TICKERS} tickers por consulta.`, requestId }, 400);
  }

  const invalidos = tickers.filter((ticker) => !/^[A-Z0-9]{4,12}$/.test(ticker));
  if (invalidos.length) {
    return json({ error: `Ticker inválido: ${invalidos.join(", ")}.`, requestId }, 400);
  }

  const endpoint = new URL(BRAPI_ENDPOINT);
  endpoint.searchParams.set("symbols", tickers.join(","));

  console.log(`[BRAPI ${requestId}] consultando ${tickers.join(",")} via v2; token presente=${Boolean(token)}.`);

  try {
    const resposta = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      signal: AbortSignal.timeout(12000)
    });

    const textoResposta = await resposta.text();
    let dados = null;
    try {
      dados = textoResposta ? JSON.parse(textoResposta) : null;
    } catch (_) {
      dados = null;
    }

    console.log(`[BRAPI ${requestId}] upstream HTTP ${resposta.status} ${resposta.statusText || ""}; tickers=${tickers.join(",")}.`);

    if (!resposta.ok) {
      console.error(`[BRAPI ${requestId}] upstream erro HTTP ${resposta.status}; corpo=${resumoSeguro(dados || textoResposta)}`);
      const mensagem = dados?.message || dados?.error || textoResposta || `BRAPI respondeu HTTP ${resposta.status}.`;
      return json({
        error: String(mensagem).slice(0, 500),
        code: "BRAPI_UPSTREAM_ERROR",
        upstreamStatus: resposta.status,
        requestId
      }, resposta.status);
    }

    const results = Array.isArray(dados?.results)
      ? dados.results.map((item) => ({
          requestedSymbol: String(item?.requestedSymbol || "").toUpperCase(),
          symbol: String(item?.symbol || item?.requestedSymbol || "").toUpperCase(),
          changed: Boolean(item?.changed),
          currency: item?.data?.currency || "BRL",
          price: Number(item?.data?.regularMarketPrice)
        }))
      : [];

    console.log(`[BRAPI ${requestId}] sucesso; resultados=${results.length}.`);

    return json({
      results,
      requestedAt: dados?.requestedAt || new Date().toISOString(),
      requestId
    });
  } catch (error) {
    console.error(`[BRAPI ${requestId}] falha de rede/runtime:`, error?.name, error?.message);
    return json({
      error: `Falha de rede/runtime ao consultar a BRAPI: ${String(error?.message || "erro desconhecido").slice(0, 300)}`,
      code: "BRAPI_FETCH_FAILED",
      requestId
    }, 502);
  }
};

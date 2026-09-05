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

export default async (request) => {
  if (request.method !== "GET") {
    return json({ error: "Método não permitido." }, 405);
  }

  const token = (process.env.BRAPI_TOKEN || "").trim();
  if (!token) {
    return json({
      error: "BRAPI_TOKEN não está configurado no Netlify.",
      code: "BRAPI_TOKEN_MISSING"
    }, 500);
  }

  const url = new URL(request.url);
  const tickers = normalizarTickers(url.searchParams.get("symbols"));

  if (!tickers.length) {
    return json({ error: "Informe ao menos um ticker em symbols." }, 400);
  }

  if (tickers.length > MAX_TICKERS) {
    return json({ error: `Máximo de ${MAX_TICKERS} tickers por consulta.` }, 400);
  }

  const invalidos = tickers.filter((ticker) => !/^[A-Z0-9]{4,12}$/.test(ticker));
  if (invalidos.length) {
    return json({ error: `Ticker inválido: ${invalidos.join(", ")}.` }, 400);
  }

  const endpoint = new URL(BRAPI_ENDPOINT);
  endpoint.searchParams.set("symbols", tickers.join(","));

  try {
    const resposta = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      signal: AbortSignal.timeout(12000)
    });

    let dados = null;
    try {
      dados = await resposta.json();
    } catch (_) {
      // Mantemos uma mensagem genérica abaixo se a BRAPI não devolver JSON.
    }

    if (!resposta.ok) {
      const mensagem = dados?.message || dados?.error || `BRAPI respondeu HTTP ${resposta.status}.`;
      return json({
        error: mensagem,
        code: "BRAPI_UPSTREAM_ERROR"
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

    return json({
      results,
      requestedAt: dados?.requestedAt || new Date().toISOString()
    });
  } catch (error) {
    console.error("Falha ao consultar BRAPI:", error);
    return json({
      error: "Não foi possível consultar a BRAPI neste momento.",
      code: "BRAPI_FETCH_FAILED"
    }, 502);
  }
};

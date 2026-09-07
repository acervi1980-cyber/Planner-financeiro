const FINNHUB_ENDPOINT = "https://finnhub.io/api/v1/quote";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export default async (request) => {
  const requestId = crypto.randomUUID().slice(0, 8);
  if (request.method !== "GET") return json({ error: "Método não permitido.", requestId }, 405);

  const token = (process.env.FINNHUB_TOKEN || "").trim();
  if (!token) {
    return json({ error: "FINNHUB_TOKEN não está configurado no Netlify.", code: "FINNHUB_TOKEN_MISSING", requestId }, 500);
  }

  const url = new URL(request.url);
  const symbol = String(url.searchParams.get("symbol") || "").trim().toUpperCase();
  if (!/^[A-Z0-9.\-]{1,20}$/.test(symbol)) {
    return json({ error: "Ticker inválido.", code: "INVALID_SYMBOL", requestId }, 400);
  }

  try {
    const endpoint = new URL(FINNHUB_ENDPOINT);
    endpoint.searchParams.set("symbol", symbol);
    endpoint.searchParams.set("token", token);

    const resposta = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(12000)
    });

    let dados = null;
    try { dados = await resposta.json(); } catch (_) {}

    if (!resposta.ok) {
      return json({ error: dados?.error || `Finnhub respondeu HTTP ${resposta.status}.`, code: "FINNHUB_HTTP_ERROR", requestId }, resposta.status);
    }

    const price = Number(dados?.c);
    if (!Number.isFinite(price) || price <= 0) {
      return json({ error: `Nenhuma cotação válida encontrada para ${symbol}.`, code: "QUOTE_NOT_FOUND", requestId }, 404);
    }

    return json({ symbol, currency: "USD", price, previousClose: Number(dados?.pc) || null, timestamp: Number(dados?.t) || null, requestId });
  } catch (erro) {
    const timeout = erro?.name === "TimeoutError";
    return json({ error: timeout ? "Tempo esgotado ao consultar a Finnhub." : "Falha ao consultar a Finnhub.", code: timeout ? "FINNHUB_TIMEOUT" : "FINNHUB_FETCH_ERROR", requestId }, 502);
  }
};

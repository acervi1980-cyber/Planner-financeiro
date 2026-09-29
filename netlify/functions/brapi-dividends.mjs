const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  },
  body: JSON.stringify(body)
});

export async function handler(event) {
  if (event.httpMethod !== "GET") return json(405, { error: "Método não permitido." });

  const token = process.env.BRAPI_TOKEN;
  if (!token) return json(500, { error: "BRAPI_TOKEN não configurado no Netlify." });

  const symbol = String(event.queryStringParameters?.symbol || "").trim().toUpperCase();
  const kind = String(event.queryStringParameters?.kind || "stock").trim().toLowerCase();
  if (!/^[A-Z0-9.]{4,16}$/.test(symbol)) return json(400, { error: "Ticker inválido." });

  const endpoint = kind === "fii"
    ? "https://brapi.dev/api/v2/fii/dividends"
    : "https://brapi.dev/api/v2/stocks/dividends";

  const url = new URL(endpoint);
  url.searchParams.set("symbols", symbol);
  url.searchParams.set("sortOrder", "desc");

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        payload?.error?.message ||
        payload?.error ||
        payload?.message ||
        `BRAPI: HTTP ${response.status}`;
      return json(response.status, { error: String(message) });
    }

    let dividends = [];
    if (kind === "fii") {
      dividends = Array.isArray(payload?.dividends) ? payload.dividends : [];
    } else {
      const results = Array.isArray(payload?.results) ? payload.results : [];
      const first = results.find((item) => String(item?.symbol || "").toUpperCase() === symbol) || results[0] || {};
      dividends =
        first?.data?.cashDividends ||
        first?.cashDividends ||
        payload?.dividends ||
        [];
    }

    return json(200, {
      symbol,
      dividends: (Array.isArray(dividends) ? dividends : []).map((item) => ({
        symbol,
        label: item?.label || item?.type || "DIVIDENDO",
        rate: Number(item?.rate ?? item?.value ?? 0),
        paymentDate: item?.paymentDate || null,
        lastDatePrior: item?.lastDatePrior || null,
        exDate: item?.exDate || null
      }))
    });
  } catch (error) {
    return json(502, { error: error?.message || "Falha ao consultar dividendos na BRAPI." });
  }
}

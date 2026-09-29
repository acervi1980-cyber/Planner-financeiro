const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  },
  body: JSON.stringify(body)
});

function normalizarData(valor) {
  if (!valor) return null;
  const texto = String(valor).slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(texto) ? texto : null;
}

function normalizarEvento(item, symbol) {
  return {
    symbol,
    label: String(item?.tipo || item?.label || "DIVIDENDO").toUpperCase(),
    rate: Number(item?.valor ?? item?.rate ?? 0),
    paymentDate: normalizarData(
      item?.data_pagamento ??
      item?.paymentDate ??
      item?.pagamento ??
      item?.dataPagamento
    ),
    lastDatePrior: normalizarData(
      item?.data_com ??
      item?.lastDatePrior ??
      item?.dataCom
    ),
    exDate: normalizarData(
      item?.data_ex ??
      item?.exDate ??
      item?.dataEx
    )
  };
}

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Método não permitido." });
  }

  const apiKey = process.env.DADOSB3_API_KEY;
  if (!apiKey) {
    return json(500, { error: "DADOSB3_API_KEY não configurada no Netlify." });
  }

  const symbol = String(event.queryStringParameters?.symbol || "").trim().toUpperCase();
  const kind = String(event.queryStringParameters?.kind || "stock").trim().toLowerCase();

  if (!/^[A-Z0-9.]{4,16}$/.test(symbol)) {
    return json(400, { error: "Ticker inválido." });
  }

  const url = kind === "fii"
    ? `https://dadosb3.com/fiis/${encodeURIComponent(symbol)}`
    : `https://dadosb3.com/empresas/${encodeURIComponent(symbol)}/dividendos`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        "Accept": "application/json"
      }
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        payload?.detail ||
        payload?.error ||
        payload?.message ||
        `Dados B3: HTTP ${response.status}`;
      return json(response.status, { error: String(message) });
    }

    const origem = kind === "fii"
      ? (Array.isArray(payload?.proventos_recentes) ? payload.proventos_recentes : [])
      : (Array.isArray(payload?.proventos) ? payload.proventos : []);

    const dividends = origem
      .map((item) => normalizarEvento(item, symbol))
      .filter((item) =>
        Number.isFinite(item.rate) &&
        item.rate > 0 &&
        (item.lastDatePrior || item.paymentDate)
      )
      .sort((a, b) => {
        const dataA = a.paymentDate || a.lastDatePrior || "";
        const dataB = b.paymentDate || b.lastDatePrior || "";
        return dataB.localeCompare(dataA);
      });

    return json(200, {
      symbol,
      source: "Dados B3",
      dividends
    });
  } catch (error) {
    return json(502, {
      error: error?.message || "Falha ao consultar o Dados B3."
    });
  }
}

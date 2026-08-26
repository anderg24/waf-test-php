export async function onRequest(context) {
  const url = new URL(context.request.url);
  const queryString = url.search.toUpperCase();

  // Detecta patrones de Inyección SQL
  if (
    queryString.includes("OR") ||
    queryString.includes("'") ||
    queryString.includes("%27") ||
    queryString.includes("ATTACK")
  ) {
    return new Response(
      JSON.stringify({
        status: 403,
        blocked: true,
        message: "Solicitud Interceptada por Cloudflare Security Edge",
        rule: "SQL_INJECTION_DETECTED",
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  return await context.next();
}

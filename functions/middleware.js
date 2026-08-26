export async function onRequest(context) {
  const url = new URL(context.request.url);
  const searchParams = url.search.toLowerCase();

  // Detecta palabras clave de inyección SQL comunmente usadas
  const esAtaque =
    searchParams.includes("or") ||
    searchParams.includes("sqli") ||
    searchParams.includes("'") ||
    searchParams.includes("%27") ||
    searchParams.includes("1=1") ||
    searchParams.includes("1%3d1");

  if (esAtaque) {
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

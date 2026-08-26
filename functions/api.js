export async function onRequest(context) {
  const url = new URL(context.request.url);
  const searchParams = url.search.toLowerCase();

  // Imprime en los logs de Cloudflare para depuración
  console.log("Query recibida:", searchParams);

  // Evalúa los patrones de ataque en la URL
  const esAtaque =
    searchParams.includes("sqli") ||
    searchParams.includes("or") ||
    searchParams.includes("'") ||
    searchParams.includes("%27") ||
    searchParams.includes("1=1");

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

  return new Response(
    JSON.stringify({ status: 200, message: "Tráfico seguro verificado." }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

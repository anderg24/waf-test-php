export async function onRequest(context) {
  const url = new URL(context.request.url);
  const queryString = url.search.toUpperCase();

  // Detecta 'OR', comillas simples (') o su equivalente codificado en URL (%27)
  if (
    queryString.includes("OR") ||
    queryString.includes("'") ||
    queryString.includes("%27")
  ) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>403 Forbidden - Cloudflare WAF</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8f9fa; }
          .box { background: white; border-top: 5px solid #d9381e; padding: 30px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
          h1 { color: #d9381e; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>403 Forbidden</h1>
          <h2>Solicitud Bloqueada por Cloudflare Security Edge</h2>
          <p>Se ha interceptado una amenaza de seguridad (Inyección SQL sospechosa).</p>
          <hr>
          <small>Protegido por Cloudflare Edge Functions</small>
        </div>
      </body>
      </html>`,
      {
        status: 403,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  }

  return await context.next();
}

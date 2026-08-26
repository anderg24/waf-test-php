exports.handler = async function (event, context) {
  const user = event.queryStringParameters.user || "invitado";

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      estado: "Éxito",
      mensaje: "Petición procesada correctamente por el backend de Netlify",
      usuarioRecibido: user,
      timestamp: new Date().toISOString(),
    }),
  };
};

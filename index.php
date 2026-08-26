<?php
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];

// ENDPOINT 1: POST (SQLi y XSS)
if ($request_uri === '/api/login' && $request_method === 'POST') {
    $username = $_POST['username'] ?? '';
    header('Content-Type: text/html; charset=utf-8');
    echo "<div style='font-family:sans-serif; padding:30px;'>";
    echo "<h1 style='color:green;'>¡Éxito! Backend PHP Alcanzado</h1>";
    echo "<p>La petición superó la capa del WAF y llegó al servidor de origen.</p>";
    echo "<p><strong>Dato recibido:</strong> " . htmlspecialchars($username) . "</p>";
    echo "<a href='/'>← Volver al panel de pruebas</a></div>";
    exit();
}

// ENDPOINT 2: GET (Path Traversal / LFI)
if ($request_uri === '/api/download' && $request_method === 'GET') {
    $file = $_GET['file'] ?? '';
    header('Content-Type: text/html; charset=utf-8');
    echo "<div style='font-family:sans-serif; padding:30px;'>";
    echo "<h1 style='color:green;'>¡Éxito! Backend PHP Alcanzado</h1>";
    echo "<p>La petición superó la capa del WAF y llegó al servidor de origen.</p>";
    echo "<p><strong>Archivo solicitado:</strong> " . htmlspecialchars($file) . "</p>";
    echo "<a href='/'>← Volver al panel de pruebas</a></div>";
    exit();
}

// VISTA PRINCIPAL (INTERFAZ GRÁFICA)
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WAF Testing Ground - PHP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container py-5" style="max-width: 700px;">
        <div class="card shadow-sm border-0">
            <div class="card-body p-4">
                <h2 class="card-title text-primary border-bottom pb-2 mb-4">Entorno de Pruebas WAF (PHP)</h2>
                <p class="text-muted mb-4">Haz clic en los botones para enviar ataques simulados hacia el servidor pasando por Cloudflare.</p>

                <div class="card border-danger mb-3">
                    <div class="card-body">
                        <h5 class="card-title text-danger">1. SQL Injection (SQLi)</h5>
                        <p class="card-text mb-2">Payload: <code>' OR '1'='1' --</code></p>
                        <form action="/api/login" method="POST">
                            <input type="hidden" name="username" value="' OR '1'='1' --">
                            <button type="submit" class="btn btn-danger">Enviar Ataque SQLi</button>
                        </form>
                    </div>
                </div>

                <div class="card border-warning mb-3">
                    <div class="card-body">
                        <h5 class="card-title text-warning text-dark">2. Cross-Site Scripting (XSS)</h5>
                        <p class="card-text mb-2">Payload: <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></p>
                        <form action="/api/login" method="POST">
                            <input type="hidden" name="username" value="<script>alert('XSS')</script>">
                            <button type="submit" class="btn btn-warning">Enviar Ataque XSS</button>
                        </form>
                    </div>
                </div>

                <div class="card border-secondary">
                    <div class="card-body">
                        <h5 class="card-title text-secondary">3. Path Traversal / LFI</h5>
                        <p class="card-text mb-2">Payload: <code>../../../../etc/passwd</code></p>
                        <form action="/api/download" method="GET">
                            <input type="hidden" name="file" value="../../../../etc/passwd">
                            <button type="submit" class="btn btn-secondary">Enviar Ataque LFI</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
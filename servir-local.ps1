# Servidor local para ver a LP no navegador (Windows, sem instalar nada).
# Uso: botão direito > "Executar com o PowerShell"  ou  powershell -ExecutionPolicy Bypass -File servir-local.ps1
# Depois abra http://localhost:8080/  (celular separado: /celular-mia.html)
param([int]$Port = 8080)
$Root = $PSScriptRoot
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='application/javascript'; '.svg'='image/svg+xml'; '.png'='image/png'; '.jpg'='image/jpeg'; '.webp'='image/webp'; '.mp4'='video/mp4'; '.pdf'='application/pdf'; '.json'='application/json' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
Write-Host "LP Morada.ai + CV em http://localhost:$Port/  (Ctrl+C para parar)"
Start-Process "http://localhost:$Port/"
while ($l.IsListening) {
  $ctx = $l.GetContext()
  try {
    $p = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ($p -eq '') { $p = 'index.html' }
    $f = Join-Path $Root $p
    if (Test-Path $f -PathType Container) { $f = Join-Path $f 'index.html' }
    if (Test-Path $f -PathType Leaf) {
      $b = [System.IO.File]::ReadAllBytes($f)
      $ext = [System.IO.Path]::GetExtension($f).ToLower()
      $ctx.Response.ContentType = $(if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' })
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')
      $ctx.Response.ContentLength64 = $b.Length
      $ctx.Response.OutputStream.Write($b, 0, $b.Length)
    } else { $ctx.Response.StatusCode = 404 }
  } catch { Write-Host "ERRO $_" }
  finally { $ctx.Response.OutputStream.Close() }
}

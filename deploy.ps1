$ErrorActionPreference = "Stop"

docker compose up -d --build
docker compose ps
Write-Host "`nDISTILL 已启动，健康检查： http://服务器IP/healthz"

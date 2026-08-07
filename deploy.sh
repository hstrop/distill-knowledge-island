#!/usr/bin/env sh
set -eu

docker compose up -d --build
docker compose ps
printf '\nDISTILL 已启动，健康检查： http://服务器IP/healthz\n'

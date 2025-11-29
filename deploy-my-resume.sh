#!/usr/bin/env bash
set -e

echo "[deploy] Preparing Node environment..."

# Cargar nvm
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  # usa Node 20; si falla, usa la default
  nvm use 20 >/dev/null 2>&1 || nvm use default >/dev/null 2>&1 || true
fi

echo "[DEBUG] PATH: $PATH"
echo "[DEBUG] node: $(command -v node || echo 'not found')"
echo "[DEBUG] pnpm: $(command -v pnpm || echo 'not found')"
echo "[DEBUG] pm2: $(command -v pm2 || echo 'not found')"

echo "[deploy] Pulling latest code..."
git pull origin main

echo "[deploy] Installing dependencies..."
pnpm install --frozen-lockfile

echo "[deploy] Building Next.js app..."
pnpm run build

echo "[deploy] Restarting PM2 app..."
pm2 restart my-resume || pm2 start pnpm --name my-resume -- start

echo "[deploy] Done."

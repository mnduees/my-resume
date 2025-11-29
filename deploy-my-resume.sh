set -e

echo "[deploy] Pulling latest code..."
git pull origin main

echo "[deploy] Installing dependencies..."
pnpm install --frozen-lockfile

echo "[deploy] Building Next.js app..."
pnpm run build

echo "[deploy] Restarting PM2 app..."
pm2 restart my-resume || pm2 start pnpm --name my-resume -- start

echo "[deploy] Done."

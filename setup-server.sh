#!/usr/bin/env bash
set -e

# ============================================================
# NyVer ERP — VPS Serverni Boshlang'ich Tayyorlash Skripti
# Ubuntu 22.04 / 24.04 LTS uchun
# ============================================================

echo "=================================================="
echo "🚀 NyVer ERP VPS sozlash boshlandi..."
echo "=================================================="

# 1. Tizim paketlarini yangilash
export DEBIAN_FRONTEND=noninteractive
apt update && apt upgrade -y

# 2. Asosiy yordamchi paketlarni o'rnatish
apt install -y curl wget git ufw apt-transport-https ca-certificates gnupg lsb-release

# 3. SWAP (Virtual xotira) sozlash (1GB RAM li VPS lar uchun muhim)
if [ ! -f /swapfile ]; then
    echo "📦 2GB Swap xotira yaratilmoqda..."
    fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    sysctl vm.swappiness=10
    echo 'vm.swappiness=10' >> /etc/sysctl.conf
    echo "✅ Swap muvaffaqiyatli yoqildi."
fi

# 4. Docker va Docker Compose o'rnatish
if ! command -v docker &> /dev/null; then
    echo "🐳 Docker o'rnatilmoqda..."
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    systemctl start docker
    systemctl enable docker
    echo "✅ Docker va Docker Compose o'rnatildi."
fi

# 5. UFW Firewall sozlash
echo "🛡️ Xavfsizlik devori (UFW) sozlanmoqda..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP Web'
ufw allow 443/tcp comment 'HTTPS'
ufw allow 1402/tcp comment 'PostgreSQL External'
ufw allow 3000/tcp comment 'NestJS Backend API'
echo "y" | ufw enable || true

# 6. Loyiha papkasini tayyorlash
PROJECT_DIR="/var/www/nyver_erp"
mkdir -p "$PROJECT_DIR"
chown -R root:root "$PROJECT_DIR"

echo "=================================================="
echo "🎉 Server to'liq tayyor!"
echo "Docker versiyasi: $(docker --version)"
echo "Docker Compose: $(docker compose version)"
echo "Loyiha papkasi: $PROJECT_DIR"
echo "Ochiq portlar: 22 (SSH), 80 (HTTP), 1402 (PostgreSQL), 3000 (API)"
echo "=================================================="

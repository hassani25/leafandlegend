#!/bin/bash
# ============================================================
# Leaf & Legend — Quick GitHub Pages Deployment
# ============================================================
# Run this script with your GitHub Personal Access Token:
#   chmod +x deploy.sh && ./deploy.sh YOUR_TOKEN
#
# Create a token at: https://github.com/settings/tokens/new
# Required scopes: repo, workflow
# ============================================================

set -e
TOKEN="${1:?Usage: ./deploy.sh YOUR_GITHUB_TOKEN}"
REPO="hassani25/leafandlegend"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 Deploying Leaf & Legend to GitHub Pages..."
echo ""

# Use the Python deploy script
python3 "$DIR/deploy-to-github.py" "$TOKEN"

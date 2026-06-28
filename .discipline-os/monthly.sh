#!/usr/bin/env bash
# .discipline-os/monthly.sh — Discipline Loop monthly (desktop/Tauri)
set -e

echo "Discipline Loop monthly maintenance (desktop) — $(date +%Y-%m-%d)"
echo ""

echo "=== 1/6 Backups verification ==="
echo "Manual: backend dashboard → Backups → last <24h?"
echo ""

echo "=== 2/6 Bundle audit ==="
if [ -f "package.json" ] && grep -q 'tauri build' package.json; then
  echo "Manual: run 'npm run tauri build' and inspect src-tauri/target/release/bundle/ sizes."
  echo "  Target: <100 MB for .dmg/.msi on typical apps."
fi
echo ""

echo "=== 3/6 Signing certificate check ==="
echo "Manual checks:"
echo "  - macOS: 'security find-identity -p codesigning -v' — any cert expiring <60 days?"
echo "  - Windows: check cert expiration in your signing vendor dashboard (Sectigo, DigiCert, etc.)."
echo "  - Linux: AppImage signing if applicable (GPG key expiration)."
echo ""

echo "=== 4/6 Lighthouse re-run (webview) ==="
echo "Manual: npx unlighthouse against your dev URL."
echo ""

echo "=== 5/6 Dependency budget ==="
if command -v depcheck >/dev/null 2>&1; then
  npx depcheck
else
  echo "Install: npm install -g depcheck"
fi
echo ""

echo "=== 6/6 Findings review ==="
echo "Manual: findings.md §Incidents last 30 days."

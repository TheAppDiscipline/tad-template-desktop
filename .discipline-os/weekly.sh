#!/usr/bin/env bash
# .discipline-os/weekly.sh — Discipline Loop weekly maintenance (desktop)
set -e

echo "Discipline Loop weekly maintenance — $(date +%Y-%m-%d)"
echo ""

echo "=== 1/5 Outdated deps ==="
npm outdated || true
echo ""

echo "=== 2/5 Security audit ==="
npm audit --production || echo "⚠ npm audit found issues."
echo ""

echo "=== 3/5 Cargo check (Tauri backend) ==="
if [ -f "src-tauri/Cargo.toml" ]; then
  cargo check --manifest-path src-tauri/Cargo.toml || echo "⚠ cargo check failed."
else
  echo "⏭ No src-tauri detected; skipping."
fi
echo ""

echo "=== 4/5 Gates ==="
if npm run gate; then
  echo "✅ Gate green."
else
  echo "⚠ Gate failed."
fi
echo ""

echo "=== 5/5 Report ==="
echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"

#!/usr/bin/env bash
# .discipline-os/quarterly.sh — Discipline Loop quarterly (desktop/Tauri)
set -e

echo "Discipline Loop quarterly maintenance (desktop) — $(date +%Y-%m-%d)"
echo "Timebox: 1 hour."
echo ""

echo "=== 1/4 Full security review ==="
echo "- Agent(discipline-security-reviewer) on main."
echo "- gitleaks detect (full history)."
echo "- Tauri-specific: verify src-tauri/tauri.conf.json CSP does not use 'unsafe-inline' or 'unsafe-eval'."
echo "- Tauri commands: each #[tauri::command] validates inputs (path traversal, injection)."
echo ""

echo "=== 2/4 Compliance review ==="
echo "- Run generate-privacy-policy skill; diff vs current."
echo "- Desktop: app-specific privacy (does the app collect local-device telemetry? if yes, declare)."
echo "- Auto-update mechanism: is the signing check for updates robust?"
echo ""

echo "=== 3/4 Tech debt inventory ==="
grep -rE 'TODO|FIXME|HACK' src/ src-tauri/src/ 2>/dev/null | head -20 || echo "  None in src/ or src-tauri/src/."
echo ""

echo "=== 4/4 Breach drill ==="
echo "Simulate 1 scenario from runbooks/breach.md (15 min)."
echo "Desktop-specific scenarios: stolen dev signing key, malicious update server MITM, local storage exfiltration."

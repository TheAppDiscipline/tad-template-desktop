# .discipline-os/ — Maintenance Automation (Discipline Loop)

Scripts to keep solo-builder maintenance from becoming "intention without habit". The doctrine behind them lives in The App Discipline vault (sold separately).

## Setup

Add these entries to your `package.json` under `scripts`:

```json
{
  "scripts": {
    "discipline-os:weekly": "bash .discipline-os/weekly.sh",
    "discipline-os:monthly": "bash .discipline-os/monthly.sh",
    "discipline-os:quarterly": "bash .discipline-os/quarterly.sh"
  }
}
```

## Cadence

| Script | Cadence | Time | What it checks |
|---|---|---|---|
| `weekly` | Every Monday | <2 min | `npm outdated` · `npm audit` · `npm run gate` · short report |
| `monthly` | First Sunday of the month | <10 min | Backups · bundle audit · Lighthouse · dependency budget · findings review |
| `quarterly` | Jan/Apr/Jul/Oct 1st | <1 h | Full security · compliance · tech debt · breach drill + Tauri signing check |

## Desktop-specific notes (Tauri)

- `weekly.sh`: also runs `cargo check --manifest-path src-tauri/Cargo.toml` if Rust project detected.
- `monthly.sh`: verifies signing certificates are not expiring (macOS notarization cert, Windows code-signing cert).
- `quarterly.sh`: additional breach scenarios — IPC command injection, path traversal via `fs.readFile` Tauri command.

## Windows compatibility

Scripts require bash. Git Bash on Windows works. WSL also works.

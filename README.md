# Discipline Loop Desktop Template

> Discipline Loop factory template for native desktop apps with **Tauri v2 + React 19 + Vite + TypeScript (strict) + Rust**.

**Part of The App Discipline.** This is the public, MIT-licensed template (see `LICENSE`). The complete Discipline Loop methodology and vault (full system, playbooks, prompts, and extended materials) are a separate product, sold separately at https://theappdiscipline.gumroad.com/l/tad, and are **not** included in this repository.

## Prerequisites

- **Node.js** >= 22
- **Rust** toolchain (`rustc`, `cargo`) — [install from rustup.rs](https://rustup.rs/)
- **Platform build tools:**
  - **Windows:** MSVC Build Tools (Visual Studio)
  - **macOS:** Xcode Command Line Tools
  - **Linux:** `libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf`

## Getting Started

```bash
# 1. Use this template / clone
gh repo create my-app --template TheAppDiscipline/tad-template-desktop
# or: git clone <this-repo> my-app

# 2. Install frontend dependencies
cd my-app
npm install

# 3. Configure environment
cp .env.example .env

# 4. Run the full Desktop gate
npm run gate:full

# 5. Launch desktop app in dev mode
npm run tauri:dev
```

## Recommended Operating Mode

```bash
# Initialize Discipline Loop pipeline structure
npm run discipline:hydrate -- --lane DESKTOP --profile LITE --backend LOCAL_ONLY --auth NONE

# Start the pipeline watcher (recommended)
npm run discipline:watch
```

## Key Files

| File | Purpose |
|---|---|
| `discipline.md` | Project constitution with switches, contracts and Definition of Done |
| `task_plan.md` | Slice plan with statuses |
| `findings.md` | Decisions, risks and assumptions |
| `progress.md` | Current state, recent slices and open errors |
| `AGENTS.md` | Canonical agent instructions (Codex, Cursor, Copilot, Claude Code) |
| `CLAUDE.md` | Stub that imports `AGENTS.md` for Claude Code |
| `.discipline/` | Pipeline packets, patches, paste-ready files and run log |
| `src-tauri/tauri.conf.json` | App config (identifier, window title, bundle) |
| `.mcp.json.example` | Safe MCP starting point with minimal examples |

## Backend Selection

Set `VITE_BACKEND_PROVIDER` in `.env`:

| Value | SDK to install | Smoke test |
|-------|---------------|------------|
| `SUPABASE` (default) | `npm i @supabase/supabase-js` | `npm run db:smoke` |
| `FIREBASE` | `npm i firebase` | `npm run firebase:smoke` |
| `LOCAL_ONLY` | — | `npm run backend:smoke` |

### Firebase Production Setup

When `VITE_BACKEND_PROVIDER=FIREBASE`, install the Firebase SDK, configure `.env` from `.env.example.firebase`, and deploy the checked-in Firestore artifacts before running launch/prod smoke tests:

```bash
firebase deploy --only firestore:rules,firestore:indexes
npm run firebase:smoke
```

- Rules: `firebase/firestore.rules`
- Indexes: `firebase/firestore.indexes.json`
- Email-link auth requires an HTTPS app URL that is authorized in Firebase Auth settings.

## Quality Gates

```bash
npm run gate        # frontend gate: lint + typecheck + tests + token/secrets/migration checks
npm run gate:full   # Desktop lane gate: gate + cargo clippy (Rust lint)
```

## Tauri Commands

```bash
npm run tauri:dev          # Dev server with hot reload + native window
npm run tauri:build        # Production build (.exe / .dmg / .AppImage)
npm run tauri:icon <png>   # Generate platform icons from 1024x1024 PNG
```

Before launch/prod packaging, replace `identifier`, `productName`, and window title in `src-tauri/tauri.conf.json`, generate final icons, install Rust/Cargo, and run `npm run gate:strict` plus `npm run gate:full`. Commit `src-tauri/Cargo.lock` after the first native dependency resolution.

## IPC Pattern

Frontend calls Rust commands through typed wrappers:

```rust
// src-tauri/src/lib.rs
#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(path).map_err(|e| e.to_string())
}
```

```typescript
// src/lib/native.ts
import { invoke } from '@tauri-apps/api/core'

export async function readFile(path: string): Promise<string> {
    return invoke<string>('read_file', { path })
}
```

Every IPC command must be documented in `discipline.md` under `## 4) API / IO Shapes`.

## Pipeline Automation (`discipline:*` scripts)

```bash
npm run discipline:status       # show pipeline dashboard
npm run discipline:patch        # apply pending patches
npm run discipline:assemble     # assemble paste-ready file for next step
npm run discipline:progress     # update progress.md
npm run discipline:log          # append to run log
npm run discipline:validate     # check pipeline integrity
npm run discipline:watch        # auto-run plumbing on new packets
```

## Optional Repo Hardening

| Tool | Config file | Purpose |
|------|-------------|---------|
| Markdownlint | `.markdownlint-cli2.jsonc` | Markdown structure |
| Vale | `.vale.ini` + `.vale/styles/DisciplineLoop/` | Editorial consistency |
| Pre-commit | `.pre-commit-config.yaml` | Local checks |
| MCP | `.mcp.json.example` | MCP baseline |
| Docs CI | `.github/workflows/docs.yml` | Validate docs on PR |
| Security CI | `.github/workflows/security-review.yml` | AI security review |

## AI Features (Optional)

```bash
# Install an LLM SDK
npm i -D openai           # or @google/genai or @anthropic-ai/sdk

# Smoke test
npm run ai:smoke

# Run evaluations
npm run ai:eval
```

## MCP Setup (Optional)

Start from `.mcp.json.example` and enable only the servers the project really needs.

Recommended order:
- GitHub in read-only mode when you need PRs, Actions or issues in context
- Stitch only during Step 3; it can modify design assets, so use a dedicated key and disable it after the approved handoff
- Supabase only when the backend provider is Supabase

Do not add write-heavy MCPs by default.

## Project Structure

```
src/                          # React frontend (runs in Tauri WebView)
  lib/backend/                # Modular backend adapters (Supabase/Firebase/Local)
  lib/native.ts               # Typed IPC wrappers for Tauri commands
  config/                     # Runtime config + env validation
  styles/tokens.css           # Semantic design tokens
src-tauri/                    # Tauri / Rust backend
  src/lib.rs                  # IPC command handlers
  tauri.conf.json             # App config (identifier, window, bundle)
  capabilities/default.json   # Security permissions (minimum privilege)
tools/discipline/                  # Pipeline automation (hydrate, patch, assemble, validate)
tools/*.js                    # Quality gates (hex colors, secrets, migrations)
.discipline/                       # Packets, patches, paste-ready handoffs, run log
discipline.md                      # Project constitution (switches, contracts, DoD)
task_plan.md                  # Slice plan with statuses
findings.md                   # Decisions, risks, assumptions
progress.md                   # Current state + logs
```

## Methodology

- **Data-first:** contracts in `discipline.md` before code
- **One writer per slice:** never have two agents editing the same slice
- **Semantic tokens:** no hex colors outside `tokens.css` (enforced by gate)
- **Gates before merge:** `npm run gate:full` must pass before any commit
- **Anchor rules:** never rename headings in canonical files — scripts depend on them
- **IPC contract:** every Rust command documented in `discipline.md` with typed wrapper in `native.ts`
- **Minimum privilege:** only request OS capabilities the app actually uses

<!--
  This is the project constitution. It will be populated by /discipline-step1
  with your app's contracts, switches, data model and Definition of Done.
  Do NOT rename the H2 anchor headings (## 0) Profile, ## 1) Non-Negotiables,
  etc.); the discipline:patch scripts depend on the exact heading text.
-->

# discipline.md — Project Constitution

## 0) Profile
- PROJECT_NAME:
- PRIMARY_GOAL:
- NORTH_STAR_METRIC:
- PROFILE:
- BACKEND_PROVIDER:
- AUTH_MODE:
- COLLAB_MODE:
- STACK:
  - Frontend: React + Vite (Tauri WebView)
  - Native: Tauri (Rust)
  - Hosting: N/A (desktop distribution)
  - Backend:
- SYNC_MODE:
- PUSH_PLUGIN:
- AI_FEATURES:
- LANE: DESKTOP

## Env Configuration
- VITE_BACKEND_PROVIDER: Provider selection.
- VITE_AUTH_MODE: Authentication strategy.

### Supabase Env
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
Rule: ANON_KEY only in frontend. Service role key never in frontend.

### Firebase Env
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_APP_ID

## 1) Non-Negotiables
- (inherited from Discipline Loop)
- Every IPC command documented in this file under API / IO Shapes
- No OS permissions requested beyond what the app actually uses (minimum privilege)
- Long-lived production secrets must use OS keychain or an equivalent encrypted native store; the template base must not persist service-role/API secrets in the WebView.

## 2) Tenancy & Permissions
- N/A

## 3) Data Model
- N/A

## 4) API / IO Shapes
### IPC Commands (Frontend ↔ Rust)
- `greet(name: string) → string` — Example command (remove in Slice 1)

## 5) Sync Rules
- N/A

## 6) UI State Model
- N/A

## 7) Event / Notifications Model
- PUSH_PLUGIN=false

## 8) Design Tokens Contract
- N/A

## 9) Testing / Gates Contract
- N/A

## 10) LLM Contracts
- AI_FEATURES=none

## 11) Universal Definition of Done
- N/A

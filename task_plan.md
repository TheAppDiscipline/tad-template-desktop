# task_plan.md — Plan by Phases + Slices

## 1) Current Goal
- N/A

## 2) Definition of Ready
- clear contracts
- clear states
- clear acceptance criteria

## 3) Definition of Done
- gate passes
- docs updated
- packet emitted

## 4) Ready Slices

## Slice 0 - Backend Choice & Bootstrap
#### Goal
Verify backend connectivity, Tauri dev server, and base project setup.
#### Scope IN
- Choose BACKEND_PROVIDER
- Install SDK if needed
- Run `npm run backend:smoke`
- Confirm gate passes
- Verify `npm run tauri:dev` opens the desktop window
- Configure identifier and productName in tauri.conf.json
#### Scope OUT
- Business logic
- UI beyond template shell
- IPC commands beyond example greet
#### Contracts
- Backend adapter returns valid User and Space objects
- IPC greet command responds correctly
#### UI States
- Template shell with 4 states (loading, empty, error, normal)
#### Acceptance Criteria
- [ ] `npm run gate` passes
- [ ] `npm run backend:smoke` passes
- [ ] `npm run tauri:dev` opens desktop window < 2s
- [ ] discipline.md updated with project switches
- [ ] tauri.conf.json has real identifier and productName
#### Notes
- If BACKEND_PROVIDER=LOCAL_ONLY, no SDK install needed
- Rust and Tauri CLI must be installed before starting

## 5) Deferred / Later
- N/A

## 6) Risks and Dependencies
- Rust toolchain must be installed (rustc, cargo)
- Platform-specific build tools required (Xcode on Mac, MSVC on Windows)

import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const ROOT = process.cwd()
const configPath = path.join(ROOT, 'src-tauri', 'tauri.conf.json')
const lockPath = path.join(ROOT, 'src-tauri', 'Cargo.lock')

function fail(message) {
    console.error(`[FAIL] ${message}`)
    process.exitCode = 1
}

function hasPlaceholder(value) {
    return typeof value === 'string' && /desktop-template|discipline\.desktop-template|example|placeholder/i.test(value)
}

if (!fs.existsSync(configPath)) {
    fail('Missing src-tauri/tauri.conf.json.')
} else {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    const title = config?.app?.windows?.[0]?.title
    const productName = config?.productName
    const identifier = config?.identifier

    if (hasPlaceholder(identifier)) {
        fail(`Replace Tauri identifier before launch/prod packaging: ${identifier}`)
    }

    if (hasPlaceholder(productName)) {
        fail(`Replace Tauri productName before launch/prod packaging: ${productName}`)
    }

    if (hasPlaceholder(title)) {
        fail(`Replace Tauri window title before launch/prod packaging: ${title}`)
    }
}

if (!fs.existsSync(lockPath)) {
    fail('Missing src-tauri/Cargo.lock. Install Rust/Cargo, resolve native deps, and commit the lockfile before launch/prod packaging.')
} else {
    // A file named Cargo.lock is not a resolved dependency tree. `cargo metadata --locked` is the
    // resolver's own answer: it reads the manifest, refuses to update anything, and fails when the
    // lockfile is missing entries, stale against Cargo.toml, or simply not a lockfile. It does not
    // compile, so it needs no C++ linker, which keeps this check runnable wherever cargo is.
    // One string with `shell: true`, on purpose: on Windows `spawn` does not resolve PATHEXT, so
    // spawning "cargo" as argv fails with ENOENT even when cargo is installed and on PATH. Passing
    // args alongside `shell: true` would concatenate them unescaped (Node DEP0190), so the whole
    // command is one string and the only interpolation is a path this script built itself.
    const run = (command, stdout = 'pipe') =>
        spawnSync(command, { cwd: ROOT, encoding: 'utf8', shell: true, stdio: ['ignore', stdout, 'pipe'] })
    const manifest = path.join('src-tauri', 'Cargo.toml')

    if (run('cargo --version').status !== 0) {
        fail('cargo is not available, so src-tauri/Cargo.lock cannot be verified. Packaging a Tauri app needs the Rust toolchain: install it (https://rustup.rs) and rerun.')
    } else {
        // stdout is DISCARDED, not captured: a resolved Tauri tree prints megabytes of JSON and
        // spawnSync kills anything past its 1 MB default buffer, which turned a passing check into
        // a permanent failure. Only the exit code and stderr matter here.
        const cargo = run(`cargo metadata --locked --format-version 1 --manifest-path "${manifest}"`, 'ignore')
        if (cargo.status !== 0) {
            const detail = `${cargo.stderr || ''}`.trim().split(/\r?\n/).filter(Boolean).slice(0, 3)
            fail('src-tauri/Cargo.lock is not a resolved dependency tree (cargo metadata --locked refused it):')
            for (const line of detail) console.error(`         ${line}`)
        }
    }
}

if (process.exitCode) {
    console.error('Fix: update src-tauri/tauri.conf.json, generate final icons, run the native build once, then rerun npm run gate:strict.')
} else {
    console.log('[PASS] Desktop native release readiness checks passed.')
}

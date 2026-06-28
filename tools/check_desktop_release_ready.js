import fs from 'node:fs'
import path from 'node:path'

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
}

if (process.exitCode) {
    console.error('Fix: update src-tauri/tauri.conf.json, generate final icons, run the native build once, then rerun npm run gate:strict.')
} else {
    console.log('[PASS] Desktop native release readiness checks passed.')
}

/**
 * Discipline Loop IPC wrapper — typed interface for Tauri commands.
 *
 * Every Rust command exposed via #[tauri::command] in src-tauri/src/lib.rs
 * should have a typed wrapper here. Document each command in discipline.md
 * under "## 4) API / IO Shapes" as part of the data contract.
 *
 * Usage:
 *   import { greet } from '@/lib/native'
 *   const message = await greet('World')
 */
import { invoke } from '@tauri-apps/api/core'

/** Example IPC command — replace with your app's native commands in Slice 1+ */
export async function greet(name: string): Promise<string> {
    return invoke<string>('greet', { name })
}

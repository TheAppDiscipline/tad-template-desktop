# App icons

These are **placeholder** icons (a neutral two-tone mark) so `npm run tauri:build`
works out of the box — Tauri fails the build if the files referenced in
`tauri.conf.json > bundle.icon` are missing.

Replace them with your own before shipping:

```bash
# Source must be a square PNG, ideally 1024x1024 with transparency.
npm run tauri:icon path/to/your-icon.png
```

That regenerates the full set (`32x32.png`, `128x128.png`, `128x128@2x.png`,
`icon.ico`, `icon.icns`, the Windows `Square*Logo.png`/`StoreLogo.png`, etc.)
in this folder. Commit the regenerated files.

export const TEMPLATE_CHECKS = [
    'Define PROJECT_NAME, PRIMARY_GOAL y contratos base en discipline.md.',
    'Cierra Slice 0: instala el SDK del provider elegido y pasa backend:smoke.',
    'Configura identifier, productName y window title en src-tauri/tauri.conf.json.',
    'Genera iconos con npm run tauri icon antes del primer build.',
]

export const TEMPLATE_STRENGTHS = [
    {
        title: 'Contracts First',
        description:
            'La shell ya está alineada para empezar por datos, estados y DoD antes de escribir lógica de negocio.',
    },
    {
        title: 'Backend Factory',
        description:
            'El adapter común te deja cambiar de provider sin reescribir la superficie principal de la app.',
    },
    {
        title: 'Native via Tauri',
        description:
            'Acceso al OS (filesystem, procesos, ventanas) a través de IPC tipado en Rust — sin Electron ni Node en runtime.',
    },
]

export const TEMPLATE_STATE_CARDS = [
    {
        state: 'loading',
        title: 'Loading',
        description: 'Usa skeleton, copy breve y evita parpadeo mientras el source of truth responde.',
    },
    {
        state: 'empty',
        title: 'Empty',
        description: 'El primer uso explica qué falta crear y cuál es la siguiente acción segura.',
    },
    {
        state: 'error',
        title: 'Error',
        description: 'Todo fallo debe tener recovery claro, retry manual y mensaje accionable.',
    },
    {
        state: 'normal',
        title: 'Normal',
        description: 'El flujo principal solo aparece cuando contratos, provider y estados base ya están listos.',
    },
]

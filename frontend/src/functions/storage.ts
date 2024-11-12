const storageDisplayIdKey = 'ARDUINO_MINIGAME_BOMBA_DISPLAY_ID'

export function storageGetDisplayId() {
    return localStorage.getItem(storageDisplayIdKey)
}

export function storageSetDisplayId(displayId: string) {
    localStorage.setItem(storageDisplayIdKey, displayId)
}
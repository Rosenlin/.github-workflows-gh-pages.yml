import { Capacitor } from '@capacitor/core'
import { Preferences } from '@capacitor/preferences'

// 於原生（iOS/Android）使用 Capacitor Preferences（底層 NSUserDefaults / SharedPreferences），
// 於網頁退回 localStorage。兩者皆非同步介面，呼叫端統一 await。
const isNative = Capacitor.isNativePlatform()

export async function getItem(key: string): Promise<string | null> {
  if (isNative) {
    const { value } = await Preferences.get({ key })
    return value ?? null
  }
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export async function setItem(key: string, value: string): Promise<void> {
  if (isNative) {
    await Preferences.set({ key, value })
    return
  }
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* quota exceeded / private mode — swallow */
  }
}

export async function removeItem(key: string): Promise<void> {
  if (isNative) {
    await Preferences.remove({ key })
    return
  }
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

export async function getJSON<T>(key: string, fallback: T): Promise<T> {
  const raw = await getItem(key)
  if (raw == null) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export async function setJSON<T>(key: string, value: T): Promise<void> {
  await setItem(key, JSON.stringify(value))
}

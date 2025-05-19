import { OS } from '../../types'

/**
 * Generates a random hex color
 */
export function randomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

/**
 * Detects the operating system of the device
 */
export function detectOS(): OS {
  if (/Android/i.test(navigator.userAgent)) return 'android'
  if (/iPhone|iPad/i.test(navigator.userAgent)) return 'ios'
  return 'web'
}

/**
 * Checks if a value exists (not null, undefined, or empty string)
 */
export function isExist(data: any): boolean {
  if (data === null || data === undefined) return false
  if (data === '') return false
  return true
}

/**
 * Checks if a value is empty (null, undefined, or empty string)
 */
export function isEmpty(data: any): boolean {
  if (!data) return true
  if (data === '') return true
  return false
}

/**
 * Checks if user is logged in
 */
export function isLoggedIn(): boolean {
  return isExist(localStorage.getItem('auth'))
}

/**
 * Returns a random item from an array
 */
export function getRandomItem<T>(items: T[] | undefined): T | undefined {
  if (!items || items.length === 0) return undefined
  const length = items.length
  const index = Math.floor(Math.random() * length)
  return items[index]
}

/**
 * Copies current URL for sharing, replacing 'master' with 'guest'
 */
export function copyShareableUrl(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const dummy = document.createElement('input')
      document.body.appendChild(dummy)

      // Create a shareable URL by replacing 'master' with 'guest'
      const url = document.location.href.replace('master', 'guest')

      dummy.value = url
      dummy.select()

      const success = document.execCommand('copy')
      document.body.removeChild(dummy)

      if (!success) return reject('Copy operation failed')
      resolve('URL copied successfully')
    } catch (error) {
      reject(`Error copying URL: ${error}`)
    }
  })
}

/**
 * Creates a debounced function
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300): (...args: Parameters<T>) => void {
  let timeoutId: number

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay) as unknown as number
  }
}

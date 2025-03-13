import { AUTH } from './constants'
import { OS, Struct } from './type'

export function RandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function osCheck(): OS {
  if (/Android/i.test(navigator.userAgent)) return 'android'
  if (/iPhone|iPad/i.test(navigator.userAgent)) return 'ios'
  return 'web'
}

export function isExist(data: any): boolean {
  if (data === null || data === undefined) return false
  if (data === '') return false
  return true
}

export function isEmpty(data: any): boolean {
  if (!data) return true
  if (data === '') return true
  return false
}

export interface IResponse {
  data: Struct<any> | null
  status: number
  message: string | null
}

export function isLogined(): boolean {
  return isExist(localStorage.getItem(AUTH)!)
}

export function randomItem<T>(items: T[] | undefined): T {
  if (!items) return '' as T
  const length = items.length
  const index = Math.round(Math.random() * length)
  return items[index]
}

export function copyCurrentUrl(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      var dummy = document.createElement('input')
      document.body.appendChild(dummy)

      // 현재 URL을 대체하거나 변형하려면 이 줄을 변경하세요.
      var url = document.location.href.replace('master', 'guest')

      dummy.value = url
      dummy.select()

      var success = document.execCommand('copy')
      document.body.removeChild(dummy)
      if (!success) return reject('error')
      resolve('good')
    } catch (err: any) {
      reject('error')
    }
  })
}

export function debounce(fn: Function, timer = 1500): Function {
  let timeoutId: any
  return () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn()
    }, timer)
  }
}

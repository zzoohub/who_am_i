import { AUTH } from '../../utils/constants'
import { isExist } from '../../utils/functions'
import { Struct } from '../../utils/type'

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IHeaders {
  'Content-Type': string
  Authorization?: string
  [key: string]: any
}
export interface IFetch {
  baseURL: string
  timeout: number
  headers: IHeaders
}

export interface IRequsetOption {}

export type OnSuccess = (response: Response) => Response
export type OnFail = (response: Response) => Response

export interface IResponseInterceptor {
  onSuccess: OnSuccess
  onFail: OnFail
}
export type IRequestInterceptor = (header: IHeaders) => any

export class Fetch {
  private requestInterceptor: null | IRequestInterceptor = null
  private responseInterceptor: null | IResponseInterceptor = null

  constructor(private options: IFetch) {}

  static create(options: IFetch) {
    return new Fetch(options)
  }

  interceptor = {
    request: {
      use: (fn: IRequestInterceptor) => {
        this.requestInterceptor = fn
      },
    },
    response: {
      use: (onSuccess: OnSuccess, onFail: OnFail) => {
        this.responseInterceptor = {
          onSuccess,
          onFail,
        }
      },
    },
  }

  private getAuth() {
    const AUTH_TOKEN = localStorage.getItem(AUTH)!
    if (isExist(AUTH_TOKEN)) {
      this.options.headers = {
        ...this.options.headers,
        Authorization: `Bearer ${AUTH_TOKEN}`,
      }
    }
  }

  private makeRequestOption(method: Method, payload?: any): IRequsetOption {
    this.getAuth()
    return {
      method,
      headers: {
        ...this.options.headers,
      },
      ...(payload && { body: JSON.stringify(payload) }),
    }
  }

  async get(url: string): Promise<Response> {
    if (this.requestInterceptor) this.requestInterceptor(this.options.headers)
    const response = await fetch(url, this.makeRequestOption(Method.GET))
    if (this.responseInterceptor) {
      if (response.status !== 200) return this.responseInterceptor.onFail(response)
      if (response.status === 200) return this.responseInterceptor.onSuccess(response)
    }
    return response
  }

  async post(url: string, payload: Struct<any>): Promise<Response> {
    if (this.requestInterceptor) this.requestInterceptor(this.options.headers)
    const response = await fetch(url, this.makeRequestOption(Method.POST, payload))

    if (this.responseInterceptor) {
      if (response.status !== 200) return this.responseInterceptor.onFail(response)
      if (response.status === 200) return this.responseInterceptor.onSuccess(response)
    }
    return response
  }
}

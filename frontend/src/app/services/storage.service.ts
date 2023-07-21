import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageKeys: any = {
    session: "maternidad?data"
  }
  constructor() { }

  storageExists(
    storageKey: string,
    token:      boolean = false
  ): boolean {
    const key = this.storageKeys[storageKey]
    const storage = localStorage.getItem(key)
    if(storage) {
      const data = JSON.parse(storage)
      if(token){
        if(data.token) return true
        return false
      }
      return true
    }
    return false
  }

  getStorage(storageKey: string) {
    const key = this.storageKeys[storageKey]
    const storage = localStorage.getItem(key)
    if(storage) {
      return JSON.parse(storage)
    } else {
      return undefined
    }
  }

  setStorage(storageKey: string, data: any) {
    const key = this.storageKeys[storageKey]
    if(key) {
      const dataToString = JSON.stringify(data)
      localStorage.setItem(key, dataToString)
    }
  }

  cleanStorage() {
    const keys = Object.keys(this.storageKeys)
    keys.forEach(key => {
      localStorage.removeItem(this.storageKeys[key])
    })
  }
}

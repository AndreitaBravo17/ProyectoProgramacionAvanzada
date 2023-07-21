import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService{

  private registroData: any;

  currentUser: any = {
    data: {
      nombre: "",
      email: "",
    },
    token: ""
  }

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {
  }

  private loadDataRequest() {
    if(this.storageService.storageExists('session')){
      const session = this.storageService.getStorage('session')
      if(session) {
        try {
          this.currentUser = session
        } catch (error) {
          console.log("Loaded data is not valid");
        }
      }
    }
  }

  public doPost(url: string, data: any) {
    this.loadDataRequest()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.currentUser.token
    });
    return this.http.post(url, data, {headers});
  }

  public doGet(url: string) {
    this.loadDataRequest()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.currentUser.token
    });
    return this.http.get(url, {headers});
  }

  public doPut(url: string, data: any){
    this.loadDataRequest()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.currentUser.token
    });
    return this.http.put(url, data,{headers});
  }

  public doDelete(url: string){
    this.loadDataRequest()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.currentUser.token
    });
    return this.http.delete(url, {headers});
  }

}

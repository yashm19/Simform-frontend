import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private httpClient: HttpClient) {
  }

  baseUrl: String = 'http://localhost:3000';

  get(url: string) {
    return this.httpClient.get(`${this.baseUrl}/${url}`)
  }


  post(url: string, data: any) {
    return this.httpClient.post(`${this.baseUrl}/${url}`, data)
  }

  put(url: string, data: any) {
    return this.httpClient.put(`${this.baseUrl}/${url}`, data)
  }

  setToken(token: any) {
    localStorage.setItem('token', token)
  }

  getToken(key: string) {
    return localStorage.getItem(key)
  }

  get isAuthenticated() {
    return !!this.getToken('token')
  }

}

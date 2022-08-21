import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asset } from '../_models/asset';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAssets() {
    return this.http.get<Asset[]>(this.baseUrl + 'assets', httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public url: any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listar_slides(token: any, id_sucursal: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    let params = new HttpParams().set('id_sucursal', id_sucursal); // Agregar id_sucursal como parámetro de consulta
    return this._http.get(this.url + 'listar_slides', { headers, params });
  };

  listar_slides2(token: any, id_sucursal: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    let params = new HttpParams().set('id_sucursal', id_sucursal); // Agregar id_sucursal como parámetro de consulta
    return this._http.get(this.url + 'listar_slides2', { headers, params });
  };

  cargar_imagne(data: FormData, token: any, id_sucursal: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token });
    let params = new HttpParams().set('id_sucursal', id_sucursal); // Agregar id_sucursal como parámetro de consulta
    return this._http.post(this.url + 'upload', data, { headers, params });
  };

  eliminar_imagen(id: any, token: any, id_sucursal: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    let params = new HttpParams().set('id_sucursal', id_sucursal); // Agregar id_sucursal como parámetro de consulta
    return this._http.delete(this.url + 'delete/' + id, { headers, params });
  }
}

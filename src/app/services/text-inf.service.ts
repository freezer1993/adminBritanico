import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class TextInfService {
  public url: any;

  constructor(private _http: HttpClient,) { 
   
   this.url=GLOBAL.url;
  }

  listar_text_inf_suc(id_sucursal:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_textInf/'+id_sucursal,{headers});
    }

  //registro de texto informativo
  registro_text_inf_suc(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_textInf', data, {headers: headers});
  } 

  //modificacion de texto informativo
  update_text_inf_suc(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'modificar_textInf', data, {headers: headers});
  } 
}

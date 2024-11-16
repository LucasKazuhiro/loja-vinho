import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vinho } from '../model/vinho';

@Injectable({
  providedIn: 'root'
})
export class VinhoService {

  constructor(private http: HttpClient) { }

  gravar(obj:Vinho):Observable<any> {
    return this.http.post("http://localhost:8080/api/vinhos", obj); 
  }
  alterar(obj:Vinho):Observable<any> {
    return this.http.put("http://localhost:8080/api/vinhos", obj); 
  }
  carregar(codigo:number):Observable<any> {
    return this.http.get("http://localhost:8080/api/vinhos/"+codigo); 
  }
  remover(codigo:number):Observable<any> {
    return this.http.delete("http://localhost:8080/api/vinhos/"+codigo); 
  }
  listar(): Observable<Vinho[]> {
    return this.http.get<Vinho[]>("http://localhost:8080/api/vinhos");
  }
  
  pesquisar(termo:string):Observable<any> {
    return this.http.get("http://localhost:8080/api/vinhos/busca/"+termo); 
  }

}

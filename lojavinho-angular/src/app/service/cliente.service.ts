import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http : HttpClient) { }

  inserir(obj: Cliente) : Observable<Object>{
    return this.http.post("http://localhost:8080/api/cliente", obj);
  }


  alterar(obj: Cliente) : Observable<Object> {
    return this.http.put("http://localhost:8080/api/cliente", obj);
  }

  pesquisar(codigo: number) : Observable<any> {
    return this.http.get("http://localhost:8080/api/cliente/"+ codigo);
  }

  remover(codigo: number) : Observable<any> {
    return this.http.delete("http://localhost:8080/api/cliente/"+ codigo);
  }
}

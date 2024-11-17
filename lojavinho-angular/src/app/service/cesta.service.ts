import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
    constructor(private http : HttpClient){
      this.cestaSalva.next(this.carregarCestaSession());

      this.cestaSalva.subscribe(cesta => {
        this.salvarCestaSession(cesta);
      })
    }

    private cestaSalva = new BehaviorSubject<Cesta>(new Cesta());
    cestaSalva$ = this.cestaSalva.asObservable();


    public carregarCestaSession(){
      const cestaSession = sessionStorage.getItem('cesta');
      return cestaSession ? JSON.parse(cestaSession) : new Cesta();
    }

    public salvarCestaSession(cesta:Cesta){
      sessionStorage.setItem('cesta', JSON.stringify(cesta));
    }

    public adicionarItem(item : Item){
      let itensSalvos = this.cestaSalva.value.itens;
      let itemExiste = false;
      let compraTotal = 0;

      // Verifica se o item já não existe na Cesta
      for(let i=0; i<itensSalvos.length; i++){
        if(item.vinho.codigo === itensSalvos[i].vinho.codigo){
          // Se existir, atualizar as informações daquele item na cesta
          itensSalvos[i] = item;
          itemExiste = true;
        }

        // Calcula novo valor total da cesta
        compraTotal += itensSalvos[i].valorTotal;
      }
      
      // Se ele não existir, adicionar no fim da cesta
      if(!itemExiste){
        itensSalvos = [...this.cestaSalva.value.itens, item];
        // Soma o valorTotal do item que não existia no array de itens
        compraTotal += item.valorTotal;
      }

      // Salva os valores
      this.salvarItensTotal(itensSalvos, compraTotal);
    }

    public removerItem(item : Item){
      let itensSalvos = this.cestaSalva.value.itens;
      let compraTotal = 0;

      // Remove o item do array usando o filter
      itensSalvos = itensSalvos.filter((itemSalvo) => item !== itemSalvo);

      // Calcula novo valor total da cesta
      itensSalvos.forEach(item => {
        compraTotal += item.valorTotal;
      })

      // Salva os valores
      this.salvarItensTotal(itensSalvos, compraTotal);
    }

    public limparCesta(){
      // Zera tudo e salva os valores
      this.cestaSalva.next({
        ...this.cestaSalva.value,
        itens: [],
        total: 0,
        desconto: 0
      });
    }

    public alterarQuantidade(item:Item, qtd:number){
      let itensSalvos = this.cestaSalva.value.itens;
      let compraTotal = 0;
      
      // Calcula novo valor de 'quantidade' e 'valorTotal' do item
      for(let i=0; i<itensSalvos.length; i++){
        if(item.vinho.codigo === itensSalvos[i].vinho.codigo){
          itensSalvos[i].quantidade += qtd;
          itensSalvos[i].valorTotal = (item.vinho.preco - (item.vinho.preco * item.vinho.desconto)) * itensSalvos[i].quantidade;
          break;
        }
      }

      // Calcula novo valor total da cesta
      itensSalvos.forEach(item => {
        compraTotal += item.valorTotal;
      })

      // Salva os valores
      this.salvarItensTotal(itensSalvos, compraTotal);
    }

    public salvarItensTotal(itensSalvos:Item[], compraTotal:number){
      // Salva os valores
      this.cestaSalva.next({
        ...this.cestaSalva.value,
        itens: itensSalvos,
        total: compraTotal
      })

    }

    salvarCesta(){
      return this.http.post("http://localhost:8080/api/cesta", this.cestaSalva.value);
    }
}
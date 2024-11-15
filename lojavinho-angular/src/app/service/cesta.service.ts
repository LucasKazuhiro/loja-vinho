import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
    private cestaSalva = new BehaviorSubject<Cesta>(new Cesta());
    cestaSalva$ = this.cestaSalva.asObservable();

    adicionarItem(item : Item){
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
      this.cestaSalva.next({
        ...this.cestaSalva.value, 
        itens: itensSalvos,
        total: compraTotal
      });
    }
}
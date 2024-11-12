import { Component } from '@angular/core';
import { Vinho } from '../model/vinho';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { Cesta } from '../model/cesta';
import { Item } from '../model/item';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent {
  public vinho:Vinho = new Vinho();
  public precoComDesconto:number = 0;
  public quantidadeItemsAtual:number = 1;

  constructor(){
    let vinhoJSON:any = localStorage.getItem('vinho');

    if(vinhoJSON!=null){
      this.vinho = JSON.parse(vinhoJSON);
      this.precoComDesconto = Number(this.vinho.preco - (this.vinho.preco * this.vinho.desconto));
    }
    else{
      // error ==> produto não encontrado
    }
  }

  quantidadeAumentar(){
    if(this.quantidadeItemsAtual < this.vinho.estoque){
      this.quantidadeItemsAtual = this.quantidadeItemsAtual + 1;
    }
  }
  quantidadeDiminuir(){
    if(this.quantidadeItemsAtual > 1){
      this.quantidadeItemsAtual = this.quantidadeItemsAtual - 1;
    }
  }

  public adicionarItem(vinho:Vinho){
    let cestaJSON = localStorage.getItem("cestaCompra");
    let clienteJSON = localStorage.getItem("cliente");
    let cestaCompra:Cesta = new Cesta();
    let item:Item = new Item();

    if(cestaJSON == null){
      item = this.criarNovoItem(vinho);

      cestaCompra.codigo = 1;
      cestaCompra.total = item.valorTotal;
      cestaCompra.itens.push(item);

      if(clienteJSON != null){
        cestaCompra.cliente = JSON.parse(clienteJSON);
      }
    }
    else{
      let itemJaExiste = false;
      cestaCompra = JSON.parse(cestaJSON);

      for(let i=0; i<cestaCompra.itens.length; i++){
        if(cestaCompra.itens[i].codigo == vinho.codigo){
          cestaCompra.itens[i].quantidade = this.quantidadeItemsAtual;
          cestaCompra.itens[i].valorTotal = (vinho.preco - (vinho.preco * vinho.desconto)) * this.quantidadeItemsAtual;
          itemJaExiste = true;
          break;
        }
      }

      if(!itemJaExiste){
        item = this.criarNovoItem(vinho);
        cestaCompra.itens.push(item);
      }
    }

    cestaCompra.total = 0;
    for(let i=0; i<cestaCompra.itens.length; i++){
      cestaCompra.total = cestaCompra.total + cestaCompra.itens[i].valorTotal;
    }

    localStorage.setItem("cestaCompra", JSON.stringify(cestaCompra));
    window.location.href="/cesta";
  }

  public criarNovoItem(vinho:Vinho){
    let criarItem = new Item();

    criarItem.codigo = vinho.codigo;
    criarItem.vinho = vinho;
    criarItem.quantidade = this.quantidadeItemsAtual;
    criarItem.valorTotal = (vinho.preco - (vinho.preco * vinho.desconto)) * this.quantidadeItemsAtual;

    return criarItem;
  }
}

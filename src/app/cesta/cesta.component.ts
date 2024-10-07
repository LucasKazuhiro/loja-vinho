import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Item } from '../model/item';
import { CommonModule, JsonPipe } from '@angular/common';
import { Vinho } from '../model/vinho';
import { Cesta } from '../model/cesta';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})


export class CestaComponent {
  public cestaCompra:Cesta = new Cesta();
  public mensagem:string = "";
  public valorTotalFinal:number = 0;
  public codigoDesconto:string = "";
  public valorDesconto:number = 0;

  constructor(){
    let cestaJSON = localStorage.getItem("cestaCompra");

    this.verificarCestaVazia(cestaJSON);
  }


  public verificarCestaVazia(cestaJSON:string | null){
    if(cestaJSON !== null){
      this.cestaCompra = JSON.parse(cestaJSON);
      if(this.cestaCompra.itens.length != 0){
        this.valorTotalFinal = this.cestaCompra.total;
        this.mensagem = "";
      }
      else{
        this.mensagem = "Cesta vazia, adicione novos itens!";
      }
    }
    else{
      this.mensagem = "Cesta vazia, adicione novos itens!";
    }
  }

  public removerItem(itemRemover: Item){
    this.cestaCompra.itens = this.cestaCompra.itens.filter(item => item != itemRemover);
    
    this.cestaCompra.total = 0;
    for(let i=0; i<this.cestaCompra.itens.length; i++){
      this.cestaCompra.total = this.cestaCompra.total + this.cestaCompra.itens[i].valorTotal;
    }

    this.aplicarDesconto();

    localStorage.setItem("cestaCompra", JSON.stringify(this.cestaCompra));

    let cestaJSON = localStorage.getItem("cestaCompra");
    this.verificarCestaVazia(cestaJSON);
  }

  public limparCesta(){
    localStorage.removeItem("cestaCompra");
    this.cestaCompra = new Cesta();
    this.mensagem = "Cesta vazia, adicione novos itens!";
    this.valorTotalFinal = 0;
    this.valorDesconto = 0;
    this.codigoDesconto = "";
  }

  public aplicarDesconto(){
    this.codigoDesconto = this.codigoDesconto.toUpperCase();
    if(this.codigoDesconto == "PRIMEIROVINHO"){
      this.valorDesconto = this.cestaCompra.total * 0.2;
      this.valorTotalFinal = this.cestaCompra.total - this.valorDesconto;
    }
    else{
      this.valorTotalFinal = this.cestaCompra.total;
      this.valorDesconto = 0;
    }
  }

  public quantidadeAumentar(item:Item){
    if(item.quantidade < item.vinho.estoque){
      this.atualizarDados(item, 1);
    }
  }

  public quantidadeDiminuir(item:Item){
    if(item.quantidade > 1){
      this.atualizarDados(item, -1);
    }
  }

  public atualizarDados(item:Item, qtd:number){
    for(let i=0; i<this.cestaCompra.itens.length; i++){
      if(this.cestaCompra.itens[i].codigo == item.vinho.codigo){
        this.cestaCompra.itens[i].quantidade = item.quantidade + qtd;

        this.cestaCompra.total = this.cestaCompra.total - this.cestaCompra.itens[i].valorTotal;
        this.cestaCompra.itens[i].valorTotal = (item.vinho.preco - (item.vinho.preco * item.vinho.desconto)) * (item.quantidade + qtd);
        this.cestaCompra.total = this.cestaCompra.total + this.cestaCompra.itens[i].valorTotal;        
        
        localStorage.setItem("cestaCompra", JSON.stringify(this.cestaCompra));
        this.aplicarDesconto();
        break;
      }
    }
  }

}
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Item } from '../model/item';
import { CommonModule } from '@angular/common';
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
  // public carrinhoDeItems:Item[] = [
  //   {codigo: 1, 
  //   vinho: {codigo:17, nome:"Miolo Lote 43 ",                                tipo:"Tinto",   uva:"Cabernet Sauvignon, Merlot",       volume:750, teorAlcoolico:14,   marca:"Salentein",                  cdPais:"1",  pais:"Argentina", regiao:"Mendoza",   preco:109.00,  estoque:10, desconto:0.13},
  //   quantidade: 5},
  //   {codigo: 2,
  //   vinho: {codigo:18, nome:"Baron Philippe de Rothschild Escudo Rojo Reserva", tipo:"Tinto",uva:"Cabernet Sauvignon, Carmenere",    volume:750, teorAlcoolico:14,   marca:"Escudo Rojo",                cdPais:"2",  pais:"Chile",     regiao:"Valle Central", preco:95.00,  estoque:10, desconto:0.17},
  //   quantidade: 7},
  //   {codigo: 3,
  //   vinho: {codigo:19, nome:"Herdade de São Miguel Colheita Selecionada",    tipo:"Tinto",   uva:"Syrah, Touriga Nacional",          volume:750, teorAlcoolico:14,   marca:"Herdade de São Miguel",      cdPais:"7",  pais:"Portugal",  regiao:"Alentejano", preco:87.00,  estoque:10, desconto:0.42},
  //   quantidade: 3},
  //   {codigo: 4,
  //   vinho: {codigo:20, nome:"Quinta do Crasto Superior ",                    tipo:"Tinto",   uva:"Touriga Nacional",   volume:750, teorAlcoolico:14.5, marca:"Quinta do Crast",      cdPais:"7",    pais:"Portugal",  regiao:"Douro",             preco:215.00, estoque:10, desconto:0.19},
  //   quantidade: 5
  //   },
  //   {codigo: 1, 
  //   vinho: {codigo:17, nome:"Miolo Lote 43 ",                                tipo:"Tinto",   uva:"Cabernet Sauvignon, Merlot",       volume:750, teorAlcoolico:14,   marca:"Salentein",                  cdPais:"1",  pais:"Argentina", regiao:"Mendoza",   preco:109.00,  estoque:10, desconto:0.13},
  //   quantidade: 5},
  //   {codigo: 2,
  //   vinho: {codigo:18, nome:"Baron Philippe de Rothschild Escudo Rojo Reserva", tipo:"Tinto",uva:"Cabernet Sauvignon, Carmenere",    volume:750, teorAlcoolico:14,   marca:"Escudo Rojo",                cdPais:"2",  pais:"Chile",     regiao:"Valle Central", preco:95.00,  estoque:10, desconto:0.17},
  //   quantidade: 7},
  //   {codigo: 3,
  //   vinho: {codigo:19, nome:"Herdade de São Miguel Colheita Selecionada",    tipo:"Tinto",   uva:"Syrah, Touriga Nacional",          volume:750, teorAlcoolico:14,   marca:"Herdade de São Miguel",      cdPais:"7",  pais:"Portugal",  regiao:"Alentejano", preco:87.00,  estoque:10, desconto:0.42},
  //   quantidade: 3}
  // ]; 
  
  public cestaCompra:Cesta = new Cesta();
  public mensagem:string = "";
  public valorTotalFinal:number = 0;
  public codigoDesconto:string = "";
  public valorDesconto:number = 0;

  constructor(){
    let cestaJSON= localStorage.getItem("cestaCompra");

    if(cestaJSON != null){
      this.cestaCompra = JSON.parse(cestaJSON);

      this.valorTotalFinal = this.cestaCompra.total;
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
    }
  }
}
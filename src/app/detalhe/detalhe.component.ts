import { Component } from '@angular/core';
import { Vinho } from '../model/vinho';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

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
    if(this.quantidadeItemsAtual < this.vinho.quantidade){
      this.quantidadeItemsAtual = this.quantidadeItemsAtual + 1;
    }
  }
  quantidadeDiminuir(){
    if(this.quantidadeItemsAtual > 1){
      this.quantidadeItemsAtual = this.quantidadeItemsAtual - 1;
    }
  }
}

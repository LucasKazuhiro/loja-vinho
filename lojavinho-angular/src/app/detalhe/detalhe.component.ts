import { Component } from '@angular/core';
import { Vinho } from '../model/vinho';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { Item } from '../model/item';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CestaService } from '../service/cesta.service';
import { VinhoService } from '../service/vinho.service';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})

export class DetalheComponent{
  public clienteLogado:boolean = false;
  public vinhoId:number | null = null;
  public vinho:Vinho = new Vinho();
  public precoComDesconto:number = 0;
  public quantidadeItemsAtual:number = 1;

  constructor(private route:ActivatedRoute, private vinhoService:VinhoService, private cestaService:CestaService){
    this.vinhoId = Number(this.route.snapshot.paramMap.get('id'));

    this.vinhoService.carregar(this.vinhoId).subscribe({
      next: (vinhoJSON : Vinho) => {
        this.vinho = vinhoJSON;
        this.precoComDesconto = Number(this.vinho.preco - (this.vinho.preco * this.vinho.desconto));
      },
      error:(err : HttpErrorResponse) => {
        console.log(err.message);
      }
    })

    let clienteJSON = localStorage.getItem('cliente');
    if(clienteJSON != null){
      this.clienteLogado = true;
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
    let novoItem:Item = new Item();

    novoItem = this.criarNovoItem(vinho);
    this.cestaService.adicionarItem(novoItem);

    window.location.href="/cesta";
  }

  public criarNovoItem(vinho:Vinho){
    let criarItem = new Item();

    criarItem.vinho = vinho;
    criarItem.quantidade = this.quantidadeItemsAtual;
    criarItem.valorTotal = (vinho.preco - (vinho.preco * vinho.desconto)) * this.quantidadeItemsAtual;

    return criarItem;
  }
}
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
  public vinhoId:number | null = null;
  public vinho:Vinho = new Vinho();
  public precoComDesconto:number = 0;
  public quantidadeItemsAtual:number = 1;

  constructor(private route:ActivatedRoute, private vinhoService:VinhoService, private cestaService:CestaService){
    // Extrai o valor no campo "id" da url e converte para Number
    this.vinhoId = Number(this.route.snapshot.paramMap.get('id'));

    // Se inscreve na função "carregar()" do VinhoService
    this.vinhoService.carregar(this.vinhoId).subscribe({
      next: (vinhoJSON : Vinho) => {
        // Salva o vinho retornado em uma variável local
        this.vinho = vinhoJSON;
        // Calcula o preço do vinho já com o desconto aplicado
        this.precoComDesconto = Number(this.vinho.preco - (this.vinho.preco * this.vinho.desconto));
      },
      error:(err : HttpErrorResponse) => {
        console.log(err.message);
      }
    })
  }

  // Aumenta a quantidade de itens
  quantidadeAumentar(){
    if(this.quantidadeItemsAtual < this.vinho.estoque){
      this.quantidadeItemsAtual = this.quantidadeItemsAtual + 1;
    }
  }

  // Diminui a quantidade de itens
  quantidadeDiminuir(){
    if(this.quantidadeItemsAtual > 1){
      this.quantidadeItemsAtual = this.quantidadeItemsAtual - 1;
    }
  }

  // Adiciona o item à cesta
  public adicionarItem(vinho:Vinho){
    let novoItem:Item = new Item();

    // Cria um novo item contendo "vinho"
    novoItem = this.criarNovoItem(vinho);
    // Chama a função "adicionarItem()" da CestaService
    this.cestaService.adicionarItem(novoItem);

    // Encaminha o usuário para a página da cesta
    window.location.href="/cesta";
  }

  // Cria um novo item contendo "vinho"
  public criarNovoItem(vinho:Vinho){
    let criarItem = new Item();

    criarItem.vinho = vinho;
    criarItem.quantidade = this.quantidadeItemsAtual;
    criarItem.valorTotal = (vinho.preco - (vinho.preco * vinho.desconto)) * this.quantidadeItemsAtual;

    return criarItem;
  }
}
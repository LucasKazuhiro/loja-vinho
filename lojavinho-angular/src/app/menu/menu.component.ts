import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CestaService } from '../service/cesta.service';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent{
  public estaAtivoMenuLateral = false;
  public pesquisaValorVinho:string = "";
  public itemPesquisado:string = "";
  public qtdItensCarrinho:number = 0;

  constructor(private cestaService:CestaService){
    this.cestaService.cestaSalva$.subscribe(cesta => {
      this.qtdItensCarrinho = cesta.itens.length
    });

    let pesquisaValorVinhoJSON = localStorage.getItem("pesquisaValorVinho");

    if(pesquisaValorVinhoJSON != null){
      this.itemPesquisado = pesquisaValorVinhoJSON.replace(/"/g, '');
    }
    else{
      this.itemPesquisado = "Encontre o seu vinho...";
    }
  }


  public toggleMenuLateral(){
    this.estaAtivoMenuLateral = !this.estaAtivoMenuLateral;
  }

  public pesquisarVinho(){
    localStorage.setItem("pesquisaValorVinho", JSON.stringify(this.pesquisaValorVinho));
    window.location.href="./pesquisa";
  }
}

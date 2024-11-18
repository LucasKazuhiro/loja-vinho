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
  public clienteLogado:Cliente = new Cliente();
  public estaAtivoMenuLateral = false;
  public pesquisaValorVinho:string = "";
  public qtdItensCarrinho:number = 0;

  constructor(private cestaService:CestaService){
    this.cestaService.cestaSalva$.subscribe(cesta => {
      this.qtdItensCarrinho = cesta.itens.length
    });

    let pesquisaValorVinhoJSON = localStorage.getItem("pesquisaValorVinho");

    if(pesquisaValorVinhoJSON != null){
      this.pesquisaValorVinho =  pesquisaValorVinhoJSON.replace(/"/g, '');
    }

    let clienteJSON = localStorage.getItem('cliente');
    if(clienteJSON != null){
      this.clienteLogado = JSON.parse(clienteJSON);
    }
    else{
      this.clienteLogado = new Cliente();
    }
  }


  public toggleMenuLateral(){
    this.estaAtivoMenuLateral = !this.estaAtivoMenuLateral;
  }

  public pesquisarVinho(){
    if(this.pesquisaValorVinho){
      localStorage.setItem("pesquisaValorVinho", JSON.stringify(this.pesquisaValorVinho));
      window.location.href="./pesquisa";
    }
  }
}

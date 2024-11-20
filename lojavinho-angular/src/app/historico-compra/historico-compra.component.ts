import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CestaService } from '../service/cesta.service';
import { Cesta } from '../model/cesta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico-compra',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './historico-compra.component.html',
  styleUrl: './historico-compra.component.css'
})
export class HistoricoCompraComponent {
  public comprasCliente: Cesta[] = [];
  public mensagem:String = "";
  public idClienteLogado:number = 0;

  constructor(cestaService:CestaService){
    // Identifica o cliente logado
    let clienteJSON = localStorage.getItem('cliente');
    if(clienteJSON === null){
      // Se não houver login, exibe mensagem de aviso
      this.mensagem = "Cadastre-se no site para efetuar uma compra";
    }
    else{
      // Salva o ID do cliente logado em uma variável local
      this.idClienteLogado = JSON.parse(clienteJSON).codigo;
    }

    // Se inscreve na função "carregarComprasCliente()" do CestaService
    cestaService.carregarComprasCliente(this.idClienteLogado).subscribe({
      next:(response) =>{
        // Salva a lista de cesta retornada em uma variável local
        this.comprasCliente = response;
     
        // Exibe mensagem de aviso caso não haja nenhuma compra
        if(this.comprasCliente.length === 0){
          this.mensagem = "Você não possui nenhuma compra efetuada!";
        }
      },
      error:(err) =>{
        // Exibe mensagem de erro
        this.mensagem = "Parece que houve um erro! Tente novamente mais tarde.";
      }
    })
  }
}
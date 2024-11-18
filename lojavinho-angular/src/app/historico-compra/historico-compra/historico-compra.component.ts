import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { CestaService } from '../../service/cesta.service';
import { Cesta } from '../../model/cesta';

@Component({
  selector: 'app-historico-compra',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './historico-compra.component.html',
  styleUrl: './historico-compra.component.css'
})
export class HistoricoCompraComponent {
  public comprasCliente: Cesta[] = [];
  public mensagem:String = "";
  public idClienteLogado:number = 0;

  constructor(cestaService:CestaService){
    let clienteJSON = localStorage.getItem('cliente');
    if(clienteJSON === null){
      this.mensagem = "Cadastre-se no site para efetuar uma compra";
    }
    else{
      this.idClienteLogado = JSON.parse(clienteJSON).codigo;
    }

    cestaService.carregarComprasCliente(this.idClienteLogado).subscribe({
      next:(response) =>{
        this.comprasCliente = response;
     
        if(this.comprasCliente.length === 0){
          this.mensagem = "Você não possui nenhuma compra efetuada!";
        }
      },
      error:(err) =>{
        this.mensagem = "Parece que houve um erro! Tente novamente mais tarde.";
      }
    })
  }
}
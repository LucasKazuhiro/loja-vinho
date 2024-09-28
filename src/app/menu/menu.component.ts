import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent{
  constructor(){
    this.puxarClienteLogado();
  }

  public cliente:Cliente = new Cliente();
  public mensagemBemVindo:string = "";
  public estaLogado:boolean=false;


  puxarClienteLogado(){
    let clienteJSON:any = localStorage.getItem("cliente");
    console.log(clienteJSON);
    console.log(this.cliente)
    if(clienteJSON!=null){
      this.cliente = JSON.parse(clienteJSON);
      this.estaLogado=true;
    }
    else{
      this.estaLogado=false;  
    }
  }

}

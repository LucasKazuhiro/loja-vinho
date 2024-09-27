import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(){
    this.puxarClienteMemoria();
  }

  public cliente:Cliente = new Cliente();
  public clienteMemoria:Cliente = new Cliente();
  public mensagem:String = "";

  
  puxarClienteMemoria(){
    let clienteJSON:any = localStorage.getItem("clienteMemoria");

    if(clienteJSON!=null){
      this.clienteMemoria = JSON.parse(clienteJSON);
    }
    else{
      this.clienteMemoria.email = "admin@root.com";
      this.clienteMemoria.senha = "root123";
    }
  }

  public fazerLogin(){
    if(this.cliente.email == this.clienteMemoria.email && 
       this.cliente.senha == this.clienteMemoria.senha){
      localStorage.setItem('cliente', JSON.stringify(this.cliente));
      this.mensagem="logado!!";
    } 
    else{
      this.mensagem="Usuario ou senha invalido!!";
    }
  }

  public logout(){
    localStorage.removeItem("cliente");
    window.location.href="./login";
  }
}

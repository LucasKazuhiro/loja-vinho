import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  constructor(){
    this.puxarClienteMemoria();
  }

  ngOnInit(){
    this.verificarEstaLogado();
  }


  public cliente:Cliente = new Cliente();
  public clienteMemoria:Cliente = new Cliente();
  public mensagem:String = "";
  public estaLogado:boolean = false;
  public emailCliente:string = "";  
  public senhaCliente:string = "";

  
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
    if(this.emailCliente == '' || this.senhaCliente == ''){
      this.mensagem="Email e Senha são obrigatórios!"
    }
    else{
      if(this.emailCliente == this.clienteMemoria.email && 
         this.senhaCliente == this.clienteMemoria.senha){
        localStorage.setItem('cliente', JSON.stringify(this.clienteMemoria));
        window.location.href="./vitrine"
      } 
      else{
        this.mensagem="Usuario ou senha inválido!";
      }
    }
  }

  public logout(){
    localStorage.removeItem("cliente");
    localStorage.removeItem("clienteMemoria")     // Remover quando for impossivel cadastrar usuario vazio
    window.location.href="./login";
  }

  public verificarEstaLogado(){
    this.estaLogado = localStorage.getItem('cliente') !== null;
  }
}

import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  constructor(){
    this.carregar();
  }


  public cliente:Cliente = new Cliente();
  public mensagem:String = "";
  public cadastrarBtnText:String = "";

  public carregar(){
    let json:any = localStorage.getItem("cliente");

    if(json!=null){
      this.cliente = JSON.parse(json);
      this.cadastrarBtnText = "Atualizar dados";
    }
    else{
      this.mensagem = "Insira os dados para um novo cadastro";
      this.cadastrarBtnText = "Criar uma nova conta";
    }
  }

  public salvarCadastro(){
    localStorage.setItem("clienteMemoria", JSON.stringify(this.cliente));
    this.mensagem = "Cadastro atualizado com sucesso!";
    window.location.href="./login";
  }
}

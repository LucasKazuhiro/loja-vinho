import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [MenuComponent, FormsModule, FontAwesomeModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  constructor(){
    this.carregar();
  }

  faEye = faEye;
  faEyeSlash = faEyeSlash;


  public cliente:Cliente = new Cliente();
  public mensagem:String = "";
  public mensagemErro:String = "";
  public cadastrarBtnText:String = "";
  public confirmarSenhaValor:String = ""
  public mostraSenha: boolean = false;
  public mostraConfirmSenha: boolean = false;

  public carregar(){
    let json:any = localStorage.getItem("cliente");

    if(json!=null){
      this.cliente = JSON.parse(json);
      this.cadastrarBtnText = "Atualizar dados";
    }
    else{
      this.mensagem = "Criar uma nova conta";
      this.cadastrarBtnText = "Criar conta";
    }
  }

  public salvarCadastro(){
    if(this.cliente.senha == this.confirmarSenhaValor){
      localStorage.setItem("clienteMemoria", JSON.stringify(this.cliente));
      this.mensagem = "Cadastro atualizado com sucesso!";
      window.location.href="./login";
    }
    else{
      this.mensagemErro = "As senhas informadas são diferentes!";
    }
  }


  public alternaSenha() {
    this.mostraSenha = !this.mostraSenha;
  }

  public alternaConfirmSenha() {
    this.mostraConfirmSenha = !this.mostraConfirmSenha;
  }
}
  



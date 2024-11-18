import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ClienteService } from '../service/cliente.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [MenuComponent, FormsModule, FontAwesomeModule, CommonModule ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  cliente: Cliente = new Cliente();
  confirmarSenhaValor: string = "";
  mensagem: string = "";
  mostraSenha: boolean = false;
  mostraConfirmaSenha: boolean = false;
  cadastrarBtnText: string = "Criar conta";
  mensagemTitulo: string = "Criar uma nova conta";

  constructor(private service: ClienteService) {}
 
  carregar() {
    if (this.cliente.codigo) {
      this.mensagemTitulo = "Atualizar os dados da conta";
      this.cadastrarBtnText = "Atualizar dados";
    } else {
      this.mensagemTitulo = "Criar uma nova conta";
      this.cadastrarBtnText = "Criar conta";
    }
  }

 
  gravar() {
    const todosValoresPreenchidos = Object.values(this.cliente).every(dado => dado !== null && dado !== '');

    if (todosValoresPreenchidos) {
      if (this.cliente.senha === this.confirmarSenhaValor) {
        this.service.inserir(this.cliente).subscribe({
          next: (data) => {
            this.mensagem = "Cadastro realizado com sucesso!";
            window.location.href = "/login";
          },
          error: (err) => {
            this.mensagem = "Ocorreu um problema, tente novamente mais tarde!";
          }
        });
      } else {
        this.mensagem = "As senhas informadas são diferentes!";
      }
    } else {
      this.mensagem = "Todos os campos devem estar preenchidos!";
    }
  }

   
  alternaSenha() {
    this.mostraSenha = !this.mostraSenha;
  }
 
  alternaConfirmaSenha() {
    this.mostraConfirmaSenha = !this.mostraConfirmaSenha;
  }
}
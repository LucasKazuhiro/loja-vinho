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
  // Icones da Senha (FontAwesomeModule)
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
 
  gravar() {
    // Verifica se todos os valores de "cliente" estão preenchidos
    const todosValoresPreenchidos = Object.values(this.cliente).every(dado => dado !== null && dado !== '');
  
    if (todosValoresPreenchidos) {
      // Verifica se as senhas digitadas são iguais
      if (this.cliente.senha === this.confirmarSenhaValor) {
        // Se inscreve na função "inserir()" do ClienteService
        this.service.inserir(this.cliente).subscribe({
          next: (data) => {
            this.mensagem = "Cadastro realizado com sucesso!";

            // Delay para mudar de página
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000); 
          },
          error: (err) => {
            // Tratamento de erros
            if (err.status === 400 && err.error === "Este email já está cadastrado.") {
              this.mensagem = "Este email já está cadastrado. Por favor, faça login ou novo cadastro.";
            } else {
              this.mensagem = "Ocorreu um problema, tente novamente mais tarde!";
            }
          }
        });
      } else {
        this.mensagem = "As senhas informadas são diferentes!";
      }
    } else {
      this.mensagem = "Todos os campos devem estar preenchidos!";
    }
  }
  
  // Verifica se a senha deve estar oculta ou não
  alternaSenha() {
    this.mostraSenha = !this.mostraSenha;
  }
 
  // Verifica se a senha deve estar oculta ou não
  alternaConfirmaSenha() {
    this.mostraConfirmaSenha = !this.mostraConfirmaSenha;
  }
}
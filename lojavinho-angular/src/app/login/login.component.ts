import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ClienteService } from '../service/cliente.service'; 
import { CestaService } from '../service/cesta.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // Icones da Senha (FontAwesomeModule)
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  public cliente: Cliente = new Cliente();
  public mensagem: string = '';
  public estaLogado: boolean = false;
  public emailCliente: string = '';
  public senhaCliente: string = '';
  public mostraSenha: boolean = false;

  constructor(private clienteService: ClienteService, private cestaService:CestaService) {} // 

  ngOnInit() {
    // Executa a função "verificarEstaLogado()"
    this.verificarEstaLogado();
  }

  // Permite o login do usuário
  public fazerLogin() {
    // Verifica se os campos de Email e Senha estão vazios (remove os espaços em branco no começo e fim da string para comparar)
    if (this.emailCliente.trim() === '' || this.senhaCliente.trim() === '') {
      this.mensagem = 'Email e Senha são obrigatórios!';
    } else {
      // Cria uma instância de Cliente contenado o email e senha digitados
      const clienteLogin = new Cliente();
      clienteLogin.email = this.emailCliente;
      clienteLogin.senha = this.senhaCliente;

      // Se inscreve na função "fazerLogin()" do ClienteService
      this.clienteService.fazerLogin(clienteLogin).subscribe({
        next: (clienteRetornado: Cliente) => {
          if (clienteRetornado) {
            // Salva o cliente retornado no localStorage
            localStorage.setItem('cliente', JSON.stringify(clienteRetornado));
            // Encaminha o usuário para a Vitrine
            window.location.href = './vitrine';
          } else {
            // Exibe mensagem de erro
            this.mensagem = 'Usuário ou senha inválido!';
          }
        },
        error: (err) => {
          // Exibe mensagem de erro
          this.mensagem = 'Parece que houve um erro no Servidor! Tente novamente.';
        },
      });
    }
  }

  // Verifica se o usuário está logado
  public verificarEstaLogado() {
    this.estaLogado = localStorage.getItem('cliente') !== null;
  }

  
  public logout() {
    localStorage.removeItem('cliente');
    this.cestaService.logoutRemoverCesta();
    window.location.href = './login';
  }

  // Verifica se a senha deve estar oculta ou não
  public alternaSenha() {
    this.mostraSenha = !this.mostraSenha;
  }
}

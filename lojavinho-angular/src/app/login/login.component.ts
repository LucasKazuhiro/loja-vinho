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
    this.verificarEstaLogado();
  }

  
  public fazerLogin() {
    if (this.emailCliente.trim() === '' || this.senhaCliente.trim() === '') {
      this.mensagem = 'Email e Senha são obrigatórios!';
    } else {
      const clienteLogin = new Cliente();
      clienteLogin.email = this.emailCliente;
      clienteLogin.senha = this.senhaCliente;

      this.clienteService.fazerLogin(clienteLogin).subscribe({
        next: (clienteRetornado: Cliente) => {
          if (clienteRetornado) {
            this.cestaService.salvarClienteNaCesta(clienteRetornado);
            localStorage.setItem('cliente', JSON.stringify(clienteRetornado));
            window.location.href = './vitrine';
          } else {
            this.mensagem = 'Usuário ou senha inválido!';
          }
        },
        error: (err) => {
          this.mensagem = 'Parece que houve um erro no Servidor! Tente novamente.';
        },
      });
    }
  }

  public verificarEstaLogado() {
    this.estaLogado = localStorage.getItem('cliente') !== null;
  }

  public logout() {
    localStorage.removeItem('cliente');
    this.cestaService.logoutRemoverCesta();
    window.location.href = './login';
  }

  public alternaSenha() {
    this.mostraSenha = !this.mostraSenha;
  }
}

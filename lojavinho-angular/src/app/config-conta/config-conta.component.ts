import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { MenuComponent } from '../menu/menu.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';   
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config-conta',
  standalone: true,
  imports: [MenuComponent, FormsModule, FontAwesomeModule, CommonModule],   
  templateUrl: './config-conta.component.html',
  styleUrls: ['./config-conta.component.css']
})
export class ConfigContaComponent implements OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  confirmarSenhaValor: string = "";
  mostraSenha: boolean = false;
  mostraConfirmaSenha: boolean = false;

  cliente: Cliente = new Cliente();
  mensagem: string = "Atualize seus dados abaixo";
  estaLogado: boolean = false;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.verificarEstaLogado();
    if (this.estaLogado) {
      const clienteId = JSON.parse(localStorage.getItem('cliente') || '{}').codigo;
      this.clienteService.pesquisar(clienteId).subscribe({
        next: (data) => {
          this.cliente = data;
        },
        error: (err) => {
          this.mensagem = "Erro ao carregar dados do cliente!";
        }
      });
    } else {
      this.router.navigate(['/login']); 
    }
  }

  verificarEstaLogado(): void {
    this.estaLogado = localStorage.getItem('cliente') !== null;
  }

  gravar() {
    const todosValoresPreenchidos = Object.values(this.cliente).every(dado => dado !== null && dado !== '');
  
    if (todosValoresPreenchidos) {
      if (this.cliente.senha === this.confirmarSenhaValor) {
        this.clienteService.alterar(this.cliente).subscribe({
          next: (data) => {
            this.mensagem = "Dados atualizados com sucesso!";
            this.router.navigate(['/vitrine']);
          },
          error: (err) => {
            this.mensagem = "Erro ao atualizar dados!";
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

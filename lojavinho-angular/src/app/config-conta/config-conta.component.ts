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
import { CestaService } from '../service/cesta.service';


@Component({
  selector: 'app-config-conta',
  standalone: true,
  imports: [MenuComponent, FormsModule, FontAwesomeModule, CommonModule],   
  templateUrl: './config-conta.component.html',
  styleUrls: ['./config-conta.component.css']
})
export class ConfigContaComponent implements OnInit {
  // Icones da Senha (FontAwesomeModule)
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  confirmarSenhaValor: string = "";
  mostraSenha: boolean = false;
  mostraConfirmaSenha: boolean = false;

  cliente: Cliente = new Cliente();
  mensagem: string = "Atualize seus dados abaixo";
  estaLogado: boolean = false;

  constructor(private clienteService: ClienteService, private router: Router, private cestaService:CestaService) {}

  ngOnInit(): void {
    // Verifica se o usuário está logado
    this.verificarEstaLogado();
    if (this.estaLogado) {
      const clienteId = JSON.parse(localStorage.getItem('cliente') || '{}').codigo;
      // Se inscreve na função "pesquisar()" de ClientService procurando o cliente pelo seu ID
      this.clienteService.pesquisar(clienteId).subscribe({
        next: (data) => {
          // Armazena o cliente encontrado em uma var local
          this.cliente = data;
        },
        error: (err) => {
          this.mensagem = "Erro ao carregar dados do cliente!";
        }
      });
    } else {
      // Encaminha para a página de login
      this.router.navigate(['/login']); 
    }
  }

  // Verifica se o cliente está logado
  verificarEstaLogado(): void {
    this.estaLogado = localStorage.getItem('cliente') !== null;
  }

  // Salva os dados alterados no banco de dados
  gravar() {
    // Verifica se todos os valores de "cliente" estão preenchidos
    const todosValoresPreenchidos = Object.values(this.cliente).every(dado => dado !== null && dado !== '');
  
    if (todosValoresPreenchidos) {
      // Verifica se as senhas digitadas são iguais
      if (this.cliente.senha === this.confirmarSenhaValor) {
         // Se inscreve na função "inserir()" do ClienteService
        this.clienteService.alterar(this.cliente).subscribe({
          next: (data) => {
            this.mensagem = "Dados atualizados com sucesso!";
            // Encaminha para a pagina Vitrine
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

  // Remove a conta do usuário do banco de dados
  removerConta() {
    // Mostra uma caixa de diálogo pedindo a confirmação de exclusão
    if (confirm("Tem certeza de que deseja deletar sua conta? Essa ação não pode ser desfeita.")) {
      const clienteId = JSON.parse(localStorage.getItem('cliente') || '{}').codigo;
      // Se inscreve na função "remover()" de ClientService
      this.clienteService.remover(clienteId).subscribe({
        next: (response) => {
          this.mensagem = "Sua conta foi deletada com sucesso!"; 
          
          // Desloga o cliente do sistema
          setTimeout(() => {
            this.logout();  
          }, 2000); 
          
        },
        error: (err) => {
          this.mensagem = err.error;
        }
      });
    }
  }
  
  // Desloga o cliente do sistema
  logout() {
    // Exclui as informações salvas no localStorage
    localStorage.removeItem('cliente');
    this.estaLogado = false;
    // Encaminha o cliente para a página de Login
    window.location.href = './login';   
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

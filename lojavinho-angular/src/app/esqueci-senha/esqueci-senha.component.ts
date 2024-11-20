import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';


@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.css'
})
export class EsqueciSenhaComponent {

  public mensagemExecucao:string = "";
  public emailCliente:string = "";

  constructor(private clienteService: ClienteService) {}

  // Simula o envio de código para o email
  enviarCodigo() {
    // Verifica se os campos não são vazios
    if (this.emailCliente !== "" && this.emailCliente !== null) {

      // Cria uma instância de Cliente para armazenar o email coletado
      const cliente = new Cliente();
      cliente.email = this.emailCliente;
  
      // Se inscreve na função "recuperarSenha()" do ClienteService
      this.clienteService.recuperarSenha(cliente).subscribe({
        next: (clienteRetornado: Cliente) => {
          if (clienteRetornado) {
            this.mensagemExecucao = "Um código foi enviado para seu email!";
          } else {
            this.mensagemExecucao = "Email não encontrado.";
          }
        },
        error: (err) => {
          this.mensagemExecucao = "Erro no servidor: " + err.message;
        }
      });
    } else {
      this.mensagemExecucao = "Informe um email válido!";
    }
  }   
}

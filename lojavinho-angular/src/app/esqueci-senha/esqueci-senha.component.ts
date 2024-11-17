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

  enviarCodigo() {
    if (this.emailCliente !== "" && this.emailCliente !== null) {

      const cliente = new Cliente();
      cliente.email = this.emailCliente;
  
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

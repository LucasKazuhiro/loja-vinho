import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';


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

  enviarCodigo(){
    if(this.emailCliente !== "" && this.emailCliente !== null){
      this.mensagemExecucao="Um código foi enviado para seu email!";
    }
    else{
      this.mensagemExecucao="Informe um email válido!"
    }
  }
}

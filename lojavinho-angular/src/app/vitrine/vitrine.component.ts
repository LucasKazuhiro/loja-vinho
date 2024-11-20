import { Component } from '@angular/core';
import { Vinho } from '../model/vinho';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { VinhoService } from '../service/vinho.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [MenuComponent, CommonModule, FontAwesomeModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})

export class VitrineComponent {
  // Icone de Localização (FontAwesomeModule)
  faLocationDot = faLocationDot;

  public mensagem: string = "";

  public vinhos:Vinho[] = []

    
  constructor(private service : VinhoService, private router: Router){
    // Chama a função "carregarVitrine()"
    this.carregarVitrine();
  }

  // Carrega os Itens da vitrine com base no banco de dados
  carregarVitrine(){
    // Se inscreve na função "listar()" de VinhoService
    this.service.listar().subscribe({
      // Salva a array de vinho retornado em uma var local
      next:(data) =>{this.vinhos = data},
      // Mensagem de erro
      error:() =>{this.mensagem="ocorreu um erro, volte mais tarde"}
    });
  }

  // Função para encaminhar o usuário para a página de Detalhe enviando o código do vinho
  public verMais(vinho: Vinho) {
    this.router.navigate([`/detalhe`, vinho.codigo]);
  }
}
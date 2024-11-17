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
  faLocationDot = faLocationDot;

  public mensagem: string = "";

  public vinhos:Vinho[] = []

    
  constructor(private service : VinhoService, private router: Router){
    this.carregarVitrine();
  }
    carregarVitrine(){
      this.service.listar().subscribe({
        next:(data) =>{this.vinhos = data},
        error:() =>{this.mensagem="ocorreu um erro, volte mais tarde"}
      });
    }

    public verMais(vinho: Vinho) {
      this.router.navigate([`/detalhe`, vinho.codigo]);
    }
  }

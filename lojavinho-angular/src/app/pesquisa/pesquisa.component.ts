import { Component } from '@angular/core';
import { Vinho } from '../model/vinho';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { VinhoService } from '../service/vinho.service';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, MenuComponent],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {
  faLocationDot = faLocationDot;
  public itens: Vinho[] = [];  
  public mensagem: string = "";
  public termo: string = "";

  constructor(private service : VinhoService){}

  ngOnInit(): void {
    const termoSalvo = localStorage.getItem("pesquisaValorVinho");
    if (termoSalvo) {
      this.termo = JSON.parse(termoSalvo); 
      this.pesquisar();
    }
  }

  pesquisar() {
    this.service.pesquisar(this.termo).subscribe({
      next: (data: Vinho[]) => {
        this.itens = data;
        if (this.itens.length === 0) {
          this.mensagem = "Nenhum produto encontrado!";
        } else {
          this.mensagem = `${this.itens.length} produto(s) encontrados com a palavra "${this.termo}".`;
        }
      },
      error: () => {
        this.mensagem = "Ocorreu um erro, tente novamente mais tarde.";
      }
    });
  }
  


  public verMais(vinho:Vinho){
    localStorage.setItem("vinho", JSON.stringify(vinho));
    window.location.href="./detalhe";
  }
}

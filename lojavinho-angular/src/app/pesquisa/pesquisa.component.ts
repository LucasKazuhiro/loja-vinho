import { Component } from '@angular/core';
import { Vinho } from '../model/vinho';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { VinhoService } from '../service/vinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, MenuComponent],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {
  // Icone de Localização (FontAwesomeModule)
  faLocationDot = faLocationDot;

  public itens: Vinho[] = [];  
  public mensagem: string = "";
  public termo: string = "";

  constructor(private service : VinhoService, private router: Router){}

  ngOnInit(): void {
    // Puxa o termo pesquisado do localStorage e salva em uma var local
    const termoSalvo = localStorage.getItem("pesquisaValorVinho");
    if (termoSalvo) {
      this.termo = JSON.parse(termoSalvo);
      // Chama a função "pesquisar()"
      this.pesquisar();
    }
  }

  // Pesquisa o termo inserido
  pesquisar() {
    // Se inscreve na função "pesquisar()" do VinhoService
    this.service.pesquisar(this.termo).subscribe({
      next: (data: Vinho[]) => {
        // Salva a array de Vinho retornado em uma var local
        this.itens = data;
        if (this.itens.length === 0) {
          // Mensagem de Aviso
          this.mensagem = "Nenhum produto encontrado!";
        } else {
          // Mensagem mostrando a quantidade de vinhos encontrados com aquele termo
          this.mensagem = `${this.itens.length} produto(s) encontrados com a palavra "${this.termo}".`;
        }
      },
      error: () => {
        // Mensagem de erro
        this.mensagem = "Ocorreu um erro, tente novamente mais tarde.";
      }
    });
  }

  // Função para ver mais detalhes de um determinado vinho
  public verMais(vinho:Vinho){
    this.router.navigate([`/detalhe`, vinho.codigo]);
  }
}
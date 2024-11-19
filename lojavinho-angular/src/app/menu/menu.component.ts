import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CestaService } from '../service/cesta.service';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent{
  public clienteLogado:Cliente = new Cliente();
  public estaAtivoMenuLateral = false;
  public estaAtivoMenuUsuario = false;
  public pesquisaValorVinho:string = "";
  public qtdItensCarrinho:number = 0;

  constructor(private cestaService:CestaService){
    this.detectClickOutside = this.detectClickOutside.bind(this);

    this.cestaService.cestaSalva$.subscribe(cesta => {
      this.qtdItensCarrinho = cesta.itens.length
    });

    let pesquisaValorVinhoJSON = localStorage.getItem("pesquisaValorVinho");

    if(pesquisaValorVinhoJSON != null){
      this.pesquisaValorVinho =  pesquisaValorVinhoJSON.replace(/"/g, '');
    }

    let clienteJSON = localStorage.getItem('cliente');
    if(clienteJSON != null){
      this.clienteLogado = JSON.parse(clienteJSON);
    }
    else{
      this.clienteLogado = new Cliente();
    }
  }


  public toggleMenuLateral(){
    this.estaAtivoMenuLateral = !this.estaAtivoMenuLateral;
  }

  public toggleUserMenu(){
    this.estaAtivoMenuUsuario = !this.estaAtivoMenuUsuario;

    const userMenu = document.getElementById('menu-user-box');

    if(userMenu){
      if(this.estaAtivoMenuUsuario){
        userMenu.classList.add('showUserMenu');

        if(this.clienteLogado.codigo === 0){
          userMenu.setAttribute('style', 'width:130px') 
        }
        else{
          userMenu.setAttribute('style', 'width:205px')
        }

        document.addEventListener('click', this.detectClickOutside);
      }
      else{
        userMenu.classList.remove('showUserMenu');
        document.removeEventListener('click', this.detectClickOutside);
      }
    }
  }
  
  private detectClickOutside(clickEvent: MouseEvent){
    const cadastroLoginBox = document.getElementById('cadastro-login-box');
    const userMenu = document.getElementById('menu-user-box');
    
    if(userMenu && cadastroLoginBox && !cadastroLoginBox.contains(clickEvent.target as Node)){
      this.estaAtivoMenuUsuario = false;
      userMenu.classList.remove('showUserMenu');
      document.removeEventListener('click', this.detectClickOutside);
    }
  }

  public pesquisarVinho(){
    if(this.pesquisaValorVinho){
      localStorage.setItem("pesquisaValorVinho", JSON.stringify(this.pesquisaValorVinho));
      window.location.href="./pesquisa";
    }
  }


  public logout() {
    localStorage.removeItem('cliente');
    this.cestaService.logoutRemoverCesta();
  }
}

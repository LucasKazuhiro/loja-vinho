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
    // Cria a função "detectClickOutside" bindada ao component (class) representado por "this"
    this.detectClickOutside = this.detectClickOutside.bind(this);

    // Se inscreve no BehaviorSubject (observable) "cestaSalva" usando o "cestaSalva$" do CestaService
    this.cestaService.cestaSalva$.subscribe(cesta => {
      // Salve a quantidade de itens na cesta em uma var local
      this.qtdItensCarrinho = cesta.itens.length
    });

    // Pega o termo pesquisa (guardado no localStorage) e armazena em uma var local
    let pesquisaValorVinhoJSON = localStorage.getItem("pesquisaValorVinho");

    if(pesquisaValorVinhoJSON != null){
      // Atribui o termo pesquisado ao valor da input box (caixa de pesquisa)
      this.pesquisaValorVinho =  pesquisaValorVinhoJSON.replace(/"/g, '');
    }

    let clienteJSON = localStorage.getItem('cliente');
    if(clienteJSON != null){
      // Salva o cliente logado em uma var local
      this.clienteLogado = JSON.parse(clienteJSON);
    }
    else{
      // Cria uma instância de cliente
      this.clienteLogado = new Cliente();
    }
  }


  public toggleMenuLateral(){
    // Ativa ou desativa o menu lateral
    this.estaAtivoMenuLateral = !this.estaAtivoMenuLateral;
  }

  public toggleUserMenu(){
    // Ativa ou desativa o menu de usuário
    this.estaAtivoMenuUsuario = !this.estaAtivoMenuUsuario;

    // Salva o elemento que contém o id "menu-user-box"
    const userMenu = document.getElementById('menu-user-box');

    if(userMenu){
      if(this.estaAtivoMenuUsuario){
        // Atribui a classe "showUserMenu" à userMenu
        userMenu.classList.add('showUserMenu');

        // Calcula tamanho do menu de usuário levando em consideração o tamanho dos itens linkados
        if(this.clienteLogado.codigo === 0){
          userMenu.setAttribute('style', 'width:130px') 
        }
        else{
          userMenu.setAttribute('style', 'width:205px')
        }

        // Inicia um EventListener para escutar e executar "detectClickOutside" caso haja um click
        document.addEventListener('click', this.detectClickOutside);
      }
      else{
        // Remove a classe "showUserMenu" do userMenu
        userMenu.classList.remove('showUserMenu');
        // Mata o EventListener
        document.removeEventListener('click', this.detectClickOutside);
      }
    }
  }
  
  // Captura o valor retornado pelo EventListener (clickEvent)
  private detectClickOutside(clickEvent: MouseEvent){
    // Salva o elemento que contém o id "cadastro-login-box"
    const cadastroLoginBox = document.getElementById('cadastro-login-box');
    // Salva o elemento que contém o id "menu-user-box"
    const userMenu = document.getElementById('menu-user-box');
    
    // Verifica se ambos elementos existem E se o local clicado está contido em cadastroLoginBox
    if(userMenu && cadastroLoginBox && !cadastroLoginBox.contains(clickEvent.target as Node)){
      // Desativa o menu de usuário
      this.estaAtivoMenuUsuario = false;
      // Remove a classe "showUserMenu" do userMenu
      userMenu.classList.remove('showUserMenu');
      // Mata o EventListener
      document.removeEventListener('click', this.detectClickOutside);
    }
  }

  // Pesquisa um vinho
  public pesquisarVinho(){
    if(this.pesquisaValorVinho){
      // Salva o vinho pesquisado (termo) no localStorage
      localStorage.setItem("pesquisaValorVinho", JSON.stringify(this.pesquisaValorVinho));
      // Encaminha o usuário para a página de Pesquisa
      window.location.href="./pesquisa";
    }
  }

  // Efetua logout do usuário
  public logout() {
    // Remove usuário logado do localStorage
    localStorage.removeItem('cliente');
    // Reseta a cesta por completo
    this.cestaService.logoutRemoverCesta();
  }
}
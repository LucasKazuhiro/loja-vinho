import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Item } from '../model/item';
import { CommonModule, JsonPipe } from '@angular/common';
import { Vinho } from '../model/vinho';
import { Cesta } from '../model/cesta';
import { FormsModule } from '@angular/forms';
import { CestaService } from '../service/cesta.service';



@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})


export class CestaComponent {
  public cestaCompra:Cesta = new Cesta();
  public mensagem:string = "";
  public valorTotalFinal:number = 0;
  public codigoDesconto:string = "";
  public valorDesconto:number = 0;
  public porcentagemDesconto:number = 0;

  constructor(private cestaService:CestaService){
    this.cestaService.cestaSalva$.subscribe(cesta => {
      this.cestaCompra = cesta
      this.verificarCestaVazia(this.cestaCompra);
    });

    if(!this.verificarLogin()){
      this.mensagem = "Cadastre-se no site para efetuar uma compra";
    }    
  }

  public verificarLogin(){
    return localStorage.getItem('cliente') ? true : false;
  }


  public verificarCestaVazia(cestaCompra : Cesta){
    if(cestaCompra.itens.length > 0){
      this.valorTotalFinal = this.cestaCompra.total;
      this.aplicarDesconto();
      this.mensagem = "";
    }
    else{
      this.aplicarDesconto();
      this.mensagem = "Cesta vazia, adicione novos itens!";
    }
  }

  public removerItem(item: Item){
    this.cestaService.removerItem(item);
  }

  public limparCesta(){
    this.cestaService.limparCesta();
    this.valorTotalFinal = 0;
    this.valorDesconto = 0;
    this.codigoDesconto = "";
  }

  public aplicarDesconto(){
    this.codigoDesconto = this.codigoDesconto.toUpperCase();
    if(this.codigoDesconto == "PRIMEIROVINHO"){
      this.porcentagemDesconto = 20.0;
      this.valorDesconto = this.cestaCompra.total * 0.2;
      this.valorTotalFinal = this.cestaCompra.total - this.valorDesconto;
    }
    else{
      this.porcentagemDesconto = 0;
      this.valorDesconto = 0;
      this.valorTotalFinal = this.cestaCompra.total;
    }
  }

  public quantidadeAumentar(item:Item){
    if(item.quantidade < item.vinho.estoque){
      this.cestaService.alterarQuantidade(item, 1);
    }
  }

  public quantidadeDiminuir(item:Item){
    if(item.quantidade > 1){
      this.cestaService.alterarQuantidade(item, -1);
    }
  }


  public salvarCesta(){
    if(this.verificarLogin()){
      if(this.cestaCompra.itens.length > 0){
        const clienteLogado = localStorage.getItem('cliente');
        if(clienteLogado != null){
          const clienteLogadoJSON = JSON.parse(clienteLogado)
          this.cestaService.salvarCesta(clienteLogadoJSON.codigo, this.valorTotalFinal, this.porcentagemDesconto).subscribe({
            next: (response) => {
              this.mensagem = "Cesta salva com sucesso!";
              this.cestaService.limparCesta();
              window.location.href = '/vitrine';
            },
            error: (err) => {
                console.log(err)
                this.mensagem = "Erro ao salvar a cesta. Tente novamente!";
            }
          });
        }
      }
      else{
        this.mensagem = "É necessário pelo menos um produto para efetuar uma compra"
      }
    }
    else{
      alert("Cadastre-se no site para efetuar uma compra");
    }
  }

}
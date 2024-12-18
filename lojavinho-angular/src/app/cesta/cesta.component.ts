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
    // Se inscreve no BehaviorSubject (observable) "cestaSalva" usando o "cestaSalva$" do CestaService
    this.cestaService.cestaSalva$.subscribe(cesta => {
      this.cestaCompra = cesta
      // Chama uma função para verificar se a cesta está vazia
      this.verificarCestaVazia(this.cestaCompra);
    });

    if(!this.verificarLogin()){
      this.mensagem = "Cadastre-se no site para efetuar uma compra";
    }    
  }

  // Verifica se o usuário está logado
  public verificarLogin(){
    return localStorage.getItem('cliente') ? true : false;
  }

  // Verifica se a cesta está vazia
  public verificarCestaVazia(cestaCompra : Cesta){
    if(cestaCompra.itens.length > 0){
      // Salvar o valor total da cesta em uma var local
      this.valorTotalFinal = this.cestaCompra.total;
      // Chama uma função para aplicar desconto se possível
      this.aplicarDesconto();
      this.mensagem = "";
    }
    else{
      // Mensagem de erro
      this.aplicarDesconto();
      this.mensagem = "Cesta vazia, adicione novos itens!";
    }
  }

  // Remove item da cesta
  public removerItem(item: Item){
    this.cestaService.removerItem(item);
  }

  // Reseta a cesta
  public limparCesta(){
    this.cestaService.limparCesta();
    this.valorTotalFinal = 0;
    this.valorDesconto = 0;
    this.codigoDesconto = "";
  }

  // Aplica desconto se possivel
  public aplicarDesconto(){
    // Passa o codigo de desconto para UPPERCASE
    this.codigoDesconto = this.codigoDesconto.toUpperCase();
    if(this.codigoDesconto == "PRIMEIROVINHO"){
      this.porcentagemDesconto = 20.0;
      // Valor do desconto
      this.valorDesconto = this.cestaCompra.total * 0.2;
      // Valor total final já com desconto aplicado
      this.valorTotalFinal = this.cestaCompra.total - this.valorDesconto;
    }
    else{
      this.porcentagemDesconto = 0;
      this.valorDesconto = 0;
      // Valor final definido como o valor da compra (não há desconto)
      this.valorTotalFinal = this.cestaCompra.total;
    }
  }

  // Aumenta a quantidade de um determiando Item
  public quantidadeAumentar(item:Item){
    // Impede de adicionar valores maiores que o disponivel em estoque
    if(item.quantidade < item.vinho.estoque){
      this.cestaService.alterarQuantidade(item, 1);
    }
  }

  // Diminui a quantidade de um determiando Item
  public quantidadeDiminuir(item:Item){
    // Impede adicionar valores negativos
    if(item.quantidade > 1){
      this.cestaService.alterarQuantidade(item, -1);
    }
  }

  // Salva a cesta no Banco de Dados
  public salvarCesta(){
    // Verifica se o usuário está logado
    if(this.verificarLogin()){
      // Verifica se há pelo menos um item na cesta
      if(this.cestaCompra.itens.length > 0){
        const clienteLogado = localStorage.getItem('cliente');
        if(clienteLogado != null){
          const clienteLogadoJSON = JSON.parse(clienteLogado)
          // Chama a função "salvarCesta()" da CestaService enviando o ID do cliente, valor total da Cesta e a porcentagem de desconto
          this.cestaService.salvarCesta(clienteLogadoJSON.codigo, this.valorTotalFinal, this.porcentagemDesconto).subscribe({
            next: (response) => {
              this.mensagem = "Cesta salva com sucesso!";
              // Limpa a cesta
              this.cestaService.limparCesta();
              // Encaminha para a vitrine
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
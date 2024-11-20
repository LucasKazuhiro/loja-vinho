import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
    constructor(private http : HttpClient){
      // Ao iniciar a Service, executa a função "carregarCestaSession()" e salva o valor no cestaSalva
      this.cestaSalva.next(this.carregarCestaSession());

      // Se inscreve no BehaviorSubject (observable) "cestaSalva" do CestaService
      this.cestaSalva.subscribe(cesta => {
        // Chama a função "salvarCestaSession()" enviando a cestaSalva
        this.salvarCestaSession(cesta);
      })
    }

    // Cria um Observable to tipo BehaviorSubject que guadará uma cesta
    private cestaSalva = new BehaviorSubject<Cesta>(new Cesta());
    // Cria um Observable para cestaSalva (apenas efetua leituras)
    cestaSalva$ = this.cestaSalva.asObservable();


    // Puxa a cesta armazenada em sessionStorage
    public carregarCestaSession(){
      const cestaSession = sessionStorage.getItem('cesta');
      return cestaSession ? JSON.parse(cestaSession) : new Cesta();
    }

    // Salva a cestaSalva no sessionStorage
    public salvarCestaSession(cesta:Cesta){
      sessionStorage.setItem('cesta', JSON.stringify(cesta));
    }

    // Remove todos os dados da cesta
    public logoutRemoverCesta(){
      this.cestaSalva.next(new Cesta);
      sessionStorage.removeItem('cesta');
    }

    // Adiciona um item na cesta
    public adicionarItem(item : Item){
      let itensSalvos = this.cestaSalva.value.itens;
      let itemExiste = false;
      let compraTotal = 0;
      
      // Verifica se o item já não existe na cesta
      itensSalvos.forEach(itemSalvoBD => {
        if(item.vinho.codigo === itemSalvoBD.vinho.codigo){
          // Se existir, atualizar as informações daquele item na cesta
          itemSalvoBD = item;
          itemExiste = true;
        }

        // Calcula novo valor total da cesta
        compraTotal += itemSalvoBD.valorTotal;
      })
      
      // Se ele não existir, adicionar no fim da cesta
      if(!itemExiste){
        itensSalvos = [...this.cestaSalva.value.itens, item];
        // Soma o valorTotal do item que não existia no array de itens
        compraTotal += item.valorTotal;
      }

      // Salva os valores
      this.salvarItensTotal(itensSalvos, compraTotal);
    }

    // Remove um item da cesta
    public removerItem(item : Item){
      let itensSalvos = this.cestaSalva.value.itens;
      let compraTotal = 0;

      // Remove o item do array usando o filter
      itensSalvos = itensSalvos.filter((itemSalvo) => item !== itemSalvo);

      // Calcula novo valor total da cesta
      itensSalvos.forEach(item => {
        compraTotal += item.valorTotal;
      })

      // Salva os valores
      this.salvarItensTotal(itensSalvos, compraTotal);
    }

    // Limpa a cesta zerandos todos seus valores
    public limparCesta(){
      // Zera tudo e salva os valores
      this.cestaSalva.next({
        ...this.cestaSalva.value,
        itens: [],
        total: 0,
        desconto: 0
      });
    }

    // Altera a quantidade de um item
    public alterarQuantidade(item:Item, qtd:number){
      let itensSalvos = this.cestaSalva.value.itens;
      let compraTotal = 0;
      
      // Calcula novo valor de 'quantidade' e 'valorTotal' do item
      for(let i=0; i<itensSalvos.length; i++){
        if(item.vinho.codigo === itensSalvos[i].vinho.codigo){
          itensSalvos[i].quantidade += qtd;
          itensSalvos[i].valorTotal = (item.vinho.preco - (item.vinho.preco * item.vinho.desconto)) * itensSalvos[i].quantidade;
          break;
        }
      }

      // Calcula novo valor total da cesta
      itensSalvos.forEach(item => {
        compraTotal += item.valorTotal;
      })

      // Salva os valores
      this.salvarItensTotal(itensSalvos, compraTotal);
    }

    // Salva os valores no observable da cesta (cestaSalva)
    public salvarItensTotal(itensSalvos:Item[], compraTotal:number){
      this.cestaSalva.next({
        ...this.cestaSalva.value,
        itens: itensSalvos,
        total: compraTotal
      })

    }

    // Altera os valores "total" e "desconto" da cesta
    public salvarTotalComDesconto(valorTotalFinal:number, porcentagemDesconto:number){
      this.cestaSalva.next({
        ...this.cestaSalva.value,
        total: valorTotalFinal,
        desconto: porcentagemDesconto
      })
    }

    // Salva a cesta no Banco de Dados
    public salvarCesta(idCliente: number, valorTotalFinal:number, porcentagemDesconto:number){
      // Chama a função "salvarCestaComDesconto()" para calcular alguns valores
      this.salvarTotalComDesconto(valorTotalFinal, porcentagemDesconto);

      // Cria a variavel para ser enviada no BodyRequest contendo o ID do cliente e uma instancia da cesta
      const body = {
        idCliente : idCliente,
        cesta : this.cestaSalva.value
      }

      // Efetua uma requisição POST para a URL enviando o "body"
      return this.http.post("http://localhost:8080/api/cliente/cesta", body);
    }

    // Carrega as compras de um determinado cliente
    public carregarComprasCliente(clienteCod:number): Observable<Cesta[]>{
      // Efetua uma requisição GET para a URL enviando como parametro o codigo do cliente
      return this.http.get<Cesta[]>("http://localhost:8080/api/cesta/cliente", { params: {clienteCod: clienteCod.toString()} });
    }
}
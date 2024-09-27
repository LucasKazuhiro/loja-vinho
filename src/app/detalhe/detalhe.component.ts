import { Component } from '@angular/core';
import { Vinho } from '../model/vinho';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent {
  public vinho:Vinho = new Vinho()

  constructor(){
    let vinhoJSON:any = localStorage.getItem('vinho')

    if(vinhoJSON!=null){
      this.vinho = JSON.parse(vinhoJSON)
    }
    else{
      // error ==> produto não encontrado
    }
  }
}

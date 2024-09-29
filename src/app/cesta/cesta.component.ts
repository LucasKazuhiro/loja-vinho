import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Item } from '../model/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})


export class CestaComponent {
  public carrinhoDeItems:Item[] = [
    {codigo: 1, 
    vinho: {codigo:17, nome:"Miolo Lote 43 ",                                tipo:"Tinto",   uva:"Cabernet Sauvignon, Merlot",       volume:750, teorAlcoolico:14,   marca:"Salentein",                  cdPais:"1",  pais:"Argentina", regiao:"Mendoza",   preco:109.00,  estoque:10, desconto:0.13},
    quantidade: 5},
    {codigo: 2,
    vinho: {codigo:18, nome:"Baron Philippe de Rothschild Escudo Rojo Reserva", tipo:"Tinto",uva:"Cabernet Sauvignon, Carmenere",    volume:750, teorAlcoolico:14,   marca:"Escudo Rojo",                cdPais:"2",  pais:"Chile",     regiao:"Valle Central", preco:95.00,  estoque:10, desconto:0.17},
    quantidade: 7},
    {codigo: 3,
    vinho: {codigo:19, nome:"Herdade de São Miguel Colheita Selecionada",    tipo:"Tinto",   uva:"Syrah, Touriga Nacional",          volume:750, teorAlcoolico:14,   marca:"Herdade de São Miguel",      cdPais:"7",  pais:"Portugal",  regiao:"Alentejano", preco:87.00,  estoque:10, desconto:0.42},
    quantidade: 3},
    {codigo: 4,
    vinho: {codigo:20, nome:"Quinta do Crasto Superior ",                    tipo:"Tinto",   uva:"Touriga Nacional",   volume:750, teorAlcoolico:14.5, marca:"Quinta do Crast",      cdPais:"7",    pais:"Portugal",  regiao:"Douro",             preco:215.00, estoque:10, desconto:0.19},
    quantidade: 5
    },
    {codigo: 1, 
    vinho: {codigo:17, nome:"Miolo Lote 43 ",                                tipo:"Tinto",   uva:"Cabernet Sauvignon, Merlot",       volume:750, teorAlcoolico:14,   marca:"Salentein",                  cdPais:"1",  pais:"Argentina", regiao:"Mendoza",   preco:109.00,  estoque:10, desconto:0.13},
    quantidade: 5},
    {codigo: 2,
    vinho: {codigo:18, nome:"Baron Philippe de Rothschild Escudo Rojo Reserva", tipo:"Tinto",uva:"Cabernet Sauvignon, Carmenere",    volume:750, teorAlcoolico:14,   marca:"Escudo Rojo",                cdPais:"2",  pais:"Chile",     regiao:"Valle Central", preco:95.00,  estoque:10, desconto:0.17},
    quantidade: 7},
    {codigo: 3,
    vinho: {codigo:19, nome:"Herdade de São Miguel Colheita Selecionada",    tipo:"Tinto",   uva:"Syrah, Touriga Nacional",          volume:750, teorAlcoolico:14,   marca:"Herdade de São Miguel",      cdPais:"7",  pais:"Portugal",  regiao:"Alentejano", preco:87.00,  estoque:10, desconto:0.42},
    quantidade: 3}
  ];  
}
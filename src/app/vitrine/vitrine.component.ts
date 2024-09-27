import { Component } from '@angular/core';
import { Vinho } from '../model/vinho';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public vinhos:Vinho[] = [
    {codigo:1, nome:"Trapiche Vineyards Cabernet Sauvignon",          tipo:"Tinto",   uva:"Cabernet Sauvignon", volume:750, teorAlcoolico:12.5, marca:"Trapiche",             pais:"Argentina", regiao:"Mendoza",           preco:48.90},
    {codigo:2, nome:"Vinho Trapiche Alaris Malbec",                   tipo:"Tinto",   uva:"Malbec",             volume:750, teorAlcoolico:12.5, marca:"Trapiche",             pais:"Argentina", regiao:"Mendoza",           preco:42.90},
    {codigo:3, nome:"Concha y Toro Casillero Del Diablo Carmenere",   tipo:"Tinto",   uva:"Carmenere",          volume:750, teorAlcoolico:13.5, marca:"Casillero del Diablo", pais:"Chile",     regiao:"Vale Central",      preco:59.90},
    {codigo:4, nome:"Concha y Toro Gran reserva Cabernet Sauvignon",  tipo:"Tinto",   uva:"Cabernet Sauvignon", volume:750, teorAlcoolico:13.5, marca:"Casillero del Diablo", pais:"Chile",     regiao:"Vale de Colchagua", preco:59.90},
    {codigo:5, nome:"Angélica Zapata Cabernet Franc Alta",            tipo:"Tinto",   uva:"Cabernet Franc",     volume:750, teorAlcoolico:13.5, marca:"Angélica Zapata",      pais:"Argentina", regiao:"Mendoza",           preco:289.90},
    {codigo:6, nome:"Trapiche Vineyards Merlot",                      tipo:"Tinto",   uva:"Merlot",             volume:750, teorAlcoolico:14,   marca:"Trapiche",             pais:"Argentina", regiao:"Mendoza",           preco:48.90},
    {codigo:7, nome:"Codici Masserie Fiano",                          tipo:"Branco",  uva:"Fiano",              volume:750, teorAlcoolico:12.5, marca:"Codici Masserie",      pais:"Itália",    regiao:"Puglia",            preco:94.72},
    {codigo:8, nome:"San Valentín Tempranillo",                       tipo:"Tinto",   uva:"Tempranillo",        volume:750, teorAlcoolico:14.5, marca:"San Valentín",         pais:"Espanha",   regiao:"La Mancha",         preco:75.00},      
    {codigo:9, nome:"Marqués de Cáceres Rioja Crianza",               tipo:"Tinto",   uva:"Tempranillo, Garnacha, Graciano",  volume:750, teorAlcoolico:13.5, marca:"Marqués de Cáceres",         pais:"Espanha",   regiao:"Rioja",     preco:89.00},      
    {codigo:10,nome:"Luigi Bosca Malbec",                             tipo:"Tinto",   uva:"Malbec",                           volume:750, teorAlcoolico:14,   marca:"Luigi Bosca",                pais:"Argentina", regiao:"Mendoza",   preco:145.00},      
    {codigo:11,nome:"Château Lafite Rothschild Pauillac",             tipo:"Tinto",   uva:"Cabernet Sauvignon, Merlot ",      volume:750, teorAlcoolico:13,   marca:"Château Lafite Rothschild",  pais:"França",    regiao:"Pauillac",  preco:8000},      
    {codigo:12,nome:"Antinori Tignanello",                            tipo:"Tinto",   uva:"Sangiovese, Cabernet Sauvignon",   volume:750, teorAlcoolico:13.5, marca:"Antinori",                   pais:"Itália",    regiao:"Toscana",   preco:1900},      
    {codigo:13,nome:"Ramón Bilbao Crianza",                           tipo:"Tinto",   uva:"Tempranillo",        volume:750, teorAlcoolico:14,   marca:"Ramón Bilbao",         pais:"Espanha",   regiao:"Rioja",             preco:123.00},      
    {codigo:14,nome:"Torres Celeste Verdejo Branco",                  tipo:"Branco",  uva:"Verdejo",            volume:750, teorAlcoolico:13,   marca:"Torres Celeste",       pais:"Espanha",   regiao:"Rueda",             preco:100.00},      
    {codigo:15,nome:"Miolo Seleção Rosé",                             tipo:"Rosé",    uva:"Merlot, Cabernet Sauvignon",       volume:750, teorAlcoolico:12,   marca:"Miolo",  pais:"Brasil",    regiao:"Vale dos Vinhedos", preco:39.90},      
    {codigo:16, nome:"Salentein Reserva Malbec",                      tipo:"Tinto",   uva:"Malbec",             volume:750, teorAlcoolico:14,   marca:"Salentein",            pais:"Argentina", regiao:"Mendoza",           preco:109.00},
    {codigo:17, nome:"Miolo Lote 43 ",                                tipo:"Tinto",   uva:"Cabernet Sauvignon, Merlot",       volume:750, teorAlcoolico:14,   marca:"Salentein",                  pais:"Argentina", regiao:"Mendoza",   preco:109.00},
    {codigo:18, nome:"Baron Philippe de Rothschild Escudo Rojo Reserva", tipo:"Tinto",uva:"Cabernet Sauvignon, Carmenere",    volume:750, teorAlcoolico:14,   marca:"Escudo Rojo",                pais:"Chile",     regiao:"Valle Central", preco:95.00},
    {codigo:19, nome:"Herdade de São Miguel Colheita Selecionada",    tipo:"Tinto",   uva:"Syrah, Touriga Nacional",          volume:750, teorAlcoolico:14,   marca:"Herdade de São Miguel",                pais:"Portugal",     regiao:"Alentejano", preco:87.00},
    {codigo:20, nome:"Quinta do Crasto Superior ",                    tipo:"Tinto",   uva:"Touriga Nacional",   volume:750, teorAlcoolico:14.5, marca:"Quinta do Crast",      pais:"Portugal",  regiao:"Douro",             preco:215.00},
    ]
  }

import { Item } from "./item";
import { Cliente } from "./cliente";

export class Cesta {
  public codigo: number = 0;
  public cliente: Cliente = new Cliente();
  public itens: Item[] = [];
  public total: number = 0;
  public data: Date | null = null;
  public desconto: number = 0;
}
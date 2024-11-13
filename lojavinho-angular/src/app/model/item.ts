import { Cesta } from "./cesta";
import { Vinho } from "./vinho";

export class Item {
  public codigo: number = 0;
  public cesta: Cesta = new Cesta();
  public vinho: Vinho = new Vinho();
  public quantidade: number = 0;
  public valorTotal: number = 0;
}

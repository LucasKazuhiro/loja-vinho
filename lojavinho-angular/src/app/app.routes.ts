import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CestaComponent } from './cesta/cesta.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { LoginComponent } from './login/login.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { ConfigContaComponent } from './config-conta/config-conta.component';

export const routes: Routes = [
  { path: "cadastro", component: CadastroComponent },
  { path: "cesta", component: CestaComponent },
  { path: "detalhe/:id", component: DetalheComponent },
  { path: "esqueci-senha", component: EsqueciSenhaComponent },
  { path: "login", component: LoginComponent },
  { path: "pesquisa", component: PesquisaComponent },
  { path: "vitrine", component: VitrineComponent },
  { path: "config-conta", component: ConfigContaComponent },
  { path: "", component: VitrineComponent }
];
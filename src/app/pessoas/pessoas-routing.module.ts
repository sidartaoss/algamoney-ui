import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";    


const routes: Routes = [
    { 
        /** Aula Carregamento tardio de modulos (Lazy loading) */
        /** path: 'pessoas', **/
        path: '', 
        component: PessoasPesquisaComponent,
        canActivate: [AuthGuard],
        data: { roles: [ 'ROLE_PESQUISAR_PESSOA' ] }        
    },
    { 
        /** Aula Carregamento tardio de modulos (Lazy loading) */
        /** path: 'pessoas/novo', **/
        path: 'novo', 
        component: PessoaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [ 'ROLE_PESQUISAR_PESSOA' ] }
    },
    { 
        /** Aula Carregamento tardio de modulos (Lazy loading) */
        /** path: 'pessoas/:codigo', **/
        path: ':codigo', 
        component: PessoaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [ 'ROLE_PESQUISAR_PESSOA' ] }         
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
  })
  export class PessoasRoutingModule { }
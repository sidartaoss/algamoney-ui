import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LancamentosPesquisaComponent } from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";

/** Criar um modulo de rota para um modulo de funcionalidade. */

/** Modulo de rotas para o Modulo de Lancamentos 
 * Deixar apenas as rotas que sao especificas, contextualizadas para o Modulo de Lancamentos
 * 
*/
/** 
 * Nos criamos a nossa Guarda de Rotas aqui (em auth.guard.ts). Como que a gente vai 
 * usar essa Guarda de Rotas?
 * Primeiramente, a gente tem que acessar as nossas rotas (em lancamentos-routing.module.ts),
 * as configuracoes de rotas, e adicionar essa Guarda nessa Rota.
 * 
 * Usar a propriedade canActivate e colocar, em um array, AuthGuard.
 * Entao, agora, nos adicionamos essa Guarda nessa Rota (/lancamentos, por exemplo).
 * 
 * Agora, definimos a propriedade canActivate para todas as Rotas, ou seja,
 * quando o Usuario tentar acessar a Rota /lancamentos, /lancamentos/novo,
 * /lancamentos/:codigo, antes, a Guarda vai ter que confirmar se pode ou nao ativar
 * aquela Rota ou nao.
 * Ver auth.guard.ts.
 * 
 * Primeiramente, como que sabemos quais Permissoes sao necessarias para 
 * determinadas URLs? Nao temos essa informacao ainda aqui na nossa Aplicacao.
 * Entao, vamos adicionar isso agora na configuracao de Rotas, abaixo do 
 * canActivate, nos vamos adicionar outra propriedade chamada data,
 * onde a gente pode definir os dados que quiser, objetos Javascript, qualquer valor
 * que a gente quiser. Vamos definir um objeto, dentro desse objeto, vamos definir a 
 * propriedade roles, que eh um array.
 * Ou seja, para um Usuario poder acessar /lancamentos, ele tem que ter as permissoes
 * definidas na propriedade roles.
 * Agora, temos vinculado a cada rota qual que eh a permissao necessaria para acessar
 * a Rota. 
 * Voltar para auth.guard.ts.
 */

const routes: Routes = [
    /**
     * Aula Carregamento tardio de modulos (Lazy loading)
     * 
     * Aqui, nos temos um Path que esta para Pesquisar, Cadastrar, Editar.
     * 
     * Como ja foi mapeado /lancamentos em app-routing, se deixarmos o path
     * /lancamentos aqui, vai acontecer que, para acessar a Pagina de Pesquisa, o Usuario vai ter que
     * acessar dessa forma: /lancamentos/lancamentos, porque esta definido duas vezes em
     * app-routing.module.ts e em lancamentos-routing.module.ts.
     * 
     * Para mantermos o comportamento de antes, vamos remover /lancamentos do Path de 
     * lancamentos-routing.module.ts.
     * Pelo mesmo motivo, vamos, tambem, remover /lancamentos do Path para Cadastrar e Editar.
     * 
     * Fazer o mesmo em pessoas-routing.module.ts. Para nao precisar repetir /pessoas/pessoas
     * na URL, remover /pessoas do atributo Path das rotas especificas do Modulo de Pessoas.
     * 
     * Essa eh a configuracao que precisamos para fazermos o Lazy Loading funcionar. So que,
     * como o app.module.ts, a gente esta carregando esses dois modulos, LancamentosModule e
     * PessoasModule, nos vamos precisar remove-los da Secao imports de app.module.ts, porque,
     * independentemente da configuracao que acabamos de fazer, se eles estiverem la, eles serao
     * carregados no inicio da Aplicacao, quer dizer, quando o Usuario acessar a Aplicacao na
     * primeira vez. Entao, para isso nao acontecer e para nos termos, de fato, o Lazy Loading
     * Module implementado, vamos remove-los de la, assim como as importacoes.
     * 
     * Voltar para app-routing.module.ts.
     * 
     */


    /** PESQUISAR */
    { 
        /** path: 'lancamentos', **/
        path: '', 
        component: LancamentosPesquisaComponent ,
        canActivate: [AuthGuard],
        data: { roles: [ 'ROLE_PESQUISAR_LANCAMENTO' ] }
    },
    /** CADASTRAR */
    { 
        /** path: 'lancamentos/novo', **/
        path: 'novo', 
        component: LancamentoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [ 'ROLE_CADASTRAR_LANCAMENTO' ] }        
    },
    /** EDITAR */
    { 
        /** path: 'lancamentos/:codigo', **/
        path: ':codigo',
        component: LancamentoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [ 'ROLE_CADASTRAR_LANCAMENTO' ] }        
    }
  ];

@NgModule({
    imports: [
        /** Importar RouterModule, chamando o metodo forChild(), passando, como parametro,
         * o routes.
         * forRoot(): sera chamado apenas quando a gente estiver importando o RouterModule no 
         * AppModule.
         * Quando estiver configurando rotas no modulo raiz, chama-se o forRoot.
         * Quando estiver configurando rotas em modulos que nao sao o modulo raiz (AppModule),
         * usar o forChild().
         */
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
  })
  export class LancamentosRoutingModule { }
  
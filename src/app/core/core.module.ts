import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

/** import { ToastyModule } from 'ng2-toasty'; **/
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GrowlModule } from 'primeng/growl';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
/** import { JwtHelper } from 'angular2-jwt'; **/
import { JwtHelperService } from '@auth0/angular-jwt';

import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { CategoriaService } from '../categorias/categoria.service';
import { AuthService } from '../seguranca/auth.service';
/** Aula 23.03. Criando o Servico da Dashboard
 * Vamos importar o Servico de Dashboard
 * Na Secao Providers, logo abaixo de CategoriaService, definimos DashboardService.
 */
import { DashboardService } from '../dashboard/dashboard.service';
import { RelatoriosService } from '../relatorios/relatorios.service';

import { PaginaNaoEncontraComponent } from './pagina-nao-encontra.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

import { MessageService } from 'primeng/components/common/messageservice';
import { MoneyHttp } from '../seguranca/money-http';

/**
 * Aula 25.09. Usando a Classe MoneyHttp
 * 
 * 6. Agora que a gente ja configurou o JWT, que a gente alterou a nossa Classe MoneyHttp, 
  * vamos passar aqui pelos nossos arquivos, pelas nossas classes para que a gente utilize a nossa classe 
  * MoneyHttp ao inves da classe AuthHttp e, tambem, para que a gente remova todas as classes do modulo 
  * angular/http e passe a utilizar somente as classes do modulo angular/com/http.
  * 
  * 7. Primeiramente, vamos remover o import, 
  * import { JwtHelper } from 'angular2-jwt';
  * , pois, agora, nao temos mais a Classe JwtHelper, mas temos a Classe
  * JwtHelperService. Vamos substituir pelo import,
  * import { JwtHelperService } from '@auth0/angular-jwt';
  *
  * 8. Na Secao de Providers, vamos substituir JwtHelper por JwtHelperService. 
  * 
  * 9. Na Secao de Providers, iremos adicionar, tambem, a nossa Classe MoneyHttp.
  * 
  * 10. Agora, vamos corrigir a Classe error-handler.service.ts. Ver error-handler.service.ts.
  * 
  * 69.1. Importar HttpClientModule em core.module.ts,
  * import { HttpClientModule } from '@angular/common/http';
  * 
  * 70. Adicionar HttpClientModule na Secao de Imports.
  * 
  * 71. Agora, vamos testar novamente.
  * 
  * 72. Houve problema na geracao do relatorio. Vamos voltar na pagina relatorio-service.ts.
  * Ver relatorio-service.ts.
 */

registerLocaleData(localePt);

/**
  * Aula 25.06. Usando o Growl

  * Quando o nosso Curso foi lancado, a gente ainda nao tinha componentes de mensagem no PrimeNG, que eh o Growl. A gente ainda 
  * nao tinha esse componente de mensagens. A gente acabou utilizando o Toasty e, nesta aula aqui, a gente vai fazer essa alteracao, 
  * a gente vai tirar o Componente de mensagens atual e vamos utilizar o componente de mensagens do PrimeNG, simplemente para que a 
  * gente nao tenha que ficar adicionando um pacote, um modulo extra por causa de um componente de mensagens que a gente tem no 
  * PrimeNG e que, como no PrimeNG a gente utiliza varios componentes dele, entao faz mais sentido utilizarmos o componente de 
  * mensagens do PrimeNG tambem. Vamos fazer aqui essa alteracao, entao.

  * 1. Entao, vamos abrir, aqui, o nosso Projeto no VS Code, no core.module.ts, porque eh aqui que a gente vai precisar comecar a 
  * fazer essa alteracao. 

  * 2. Vamos, entao, substituir, na Secoes de Imports, Exports, o modulo ToastyModule por GrowlModule.
  * 
  * 3. Agora, vamos abrir app.component.html e vamos trocar a tag <ng2-toasty> por <p-growl>.
  * Ver app.component.html.
  * 
  * 31. Ao testar, http://localhost:4200/pessoas, ocorreu o erro,
  * AppComponent.html:1 ERROR Error: StaticInjectorError(AppModule)[Growl -> MessageService]: 
  * StaticInjectorError(Platform: core)[Growl -> MessageService]: 
  *  NullInjectorError: No provider for MessageService!
  *  at NullInjector.push../node_modules/@angular/core/fesm5/core.js.NullInjector.get
  * 
  * 32. Sem provedor para MessageService. Em CoreModule, core-module.ts, esta faltando definir, na Secao Providers, MessageService.
  * 
  * 33. Okay, agora podemos testar novamente, http://localhost:4200/pessoas. Clicar no link Ativo da Coluna Status. Okya, a mensagem
  * esta sendo exibida corretamente, antes a mensagem aparecia no canto inferior direito, agora, aparece no canto superior direito.
  * 
  * 34. Vamos clicar no icone de Editar e mandar salvar um Registro. Okay, a mensagem de sucesso foi exibida corretamente.
  * 
 */
@NgModule({
  imports: [
    CommonModule,
    /**
     * Aula 25.09. Usando a Classe MoneyHttp
     * 
     * 70.1. Adicionar HttpClientModule na Secao de Imports.
     */
    HttpClientModule,
    RouterModule,
    /** Soh chamar o metodo forRoot() se estiver no modulo raiz. Como AppModule eh
     * o modulo raiz, pode chamar o metodo forRoot().
     */
    /** ToastyModule.forRoot(), **/
    GrowlModule,
    /** Adicionar o modulo do ConfirmDialog do PrimeNG. */
    ConfirmDialogModule,    
  ],
  declarations: [NavbarComponent, PaginaNaoEncontraComponent, NaoAutorizadoComponent],
  /** Tem que exportar os modulos. Porque, no app-component, eh utilizado o Toasty,
   * assim como o ConfirmDialog.
   * O CoreModule tem que exportar os modulos ToastyModule e ConfirmationDialog para 
   * ter-se acesso a esses modulos a partir do AppModule.
   */
  exports: [
    NavbarComponent,
    /** ToastyModule, **/
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    AuthService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    MessageService,
    Title,
    CategoriaService,
    /** Aula 23.03. Criando o Servico da Dashboard
     * Na Secao Providers, logo abaixo de CategoriaService, definimos DashboardService.
     * Agora, o nosso Servico do Dashboard esta pronto para ser utilizado.
     * Fim da Aula 23.03. Criando o serviço da Dashboard.
    */
    DashboardService,
    /**
     * Aula 23.09. Exibindo o PDF para o Usuario
     * 3. Adicionar RelatoriosService no CoreModule para podermos injeta-lo,
     * da mesma forma que foi feito com o DashboardService.
     * Voltar para relatorios.service.ts.
     */
    RelatoriosService,

    /**
     * Aula 25.09. Usando a Classe MoneyHttp
     * 
     * 8.1. Na Secao de Providers, vamos substituir JwtHelper por JwtHelperService.
     * 
     * 9. Na Secao de Providers, iremos adicionar, tambem, a nossa Classe MoneyHttp.
     */
    /** JwtHelper, **/
    JwtHelperService,
    MoneyHttp,
    /** Adicionar um Provider para configurar o Locale padrao da Aplicacao.
     * Adicionar um Provider Por Valor: { provide: [TOKEN], useValue: [VALOR] }
     * Estah fornecendo o Valor 'pt-BR' atraves do token LOCALE_ID e o Angular
     * jah vai usar isso na hora de fazer a transformacao dos valores monetarios.
     */
    /**
     * Aula Corrigindo Problemas com Locale

     * Vamos la, entao, corrigir esse erro:

     * 'Missing locale data for the locale "pt-BR".' for pipe 'DatePipe'
     * do locale. O que que acontece? Por que que deu esse erro?

     * Acontece que a gente nao tem mais o Locale pt-BR. Inclusive, para vermos a lista de Locales 
     * disponiveis, nos podemos ir no site:

     * https://github.com/angular/angular

     * , no repositorio do angular no Github, 

     * vai em /packages/common/locales/

     * Nesse ponto, vamos ver a lista dos Locales disponiveis e nos nao temos pt-BR. Nos temos o 
     * Locale pt apenas. Nos vamos fazer essa correcao agora.

     * Vamos abrir o modulo Core, core.module.ts, porque eh nele que esta essa configuacao.
     * A gente nao tem mais o pt-BR, nos temos apenas o pt.
     * 
     * So que, para essa nosso caso especifico, nao adianta muito a gente somente atualizar aqui 
     * Locale, porque a gente precisa fazer algumas configuracoes a mais para que os Pipes funcionem
     * corretamente (em lancamentos-pesquisa.component.html), s Pipes que a gente usa para formatar 
     * data, moeda, esse tipo de coisa.
     * <p-column field="valor" header="Valor" styleClass="col-valor">
          <ng-template let-lanc="rowData" pTemplate="body">
            <span [style.color]="lanc.tipo === 'DESPESA' ? 'red' : 'blue'">{{ lanc.valor | number:'1.2-2' }}</span>
          </ng-template>
       </p-column>
     * 
     * Entao, a gente precisa de uma configuracao a mais, que eh importar esses dados no Locale para
     * dentro da Aplicacao, quando a gente levantar a Aplicacao.
     * 
     * A gente tem dois modos de fazer isso. Vamos so voltar no browser, antes de mostrar esses dois
     * modos para vermos que o problema ainda nao foi corrigido:
     * 
     * ERROR Error: InvalidPipeArgument: 'Missing locale data for the locale "pt".' 
     * for pipe 'DatePipe'
     * 
     * , porque, na verdade, apesar do "pt" existir, o problema que deu para a gente eh que a gente precisa
     * carregar os dados desse Locale, para que ele seja usado pela nossa Aplicacao, mais especificamente
     * para que ele seja usado pelos nossos Pipes, que formatam as datas, etc.
     * 
     * Como que a gente faz isso? Existem dois modos. O primeiro modo eh configurando o package.json.
     * No comando "ng serve", pode-se adicionar ao lado --locale=pt:
     * 
     *     "start": "ng serve --locale=pt",
     * 
     * Isso vai corrigir tambem. So que nao vamos fazer assim. Vamos fazer de uma outra forma para a 
     * gente nao depender de lembrar de passar esse parametro para o nosso comando de inicializacao.
     * 
     * Estamos apenas explicando, porque acreditamos que seja uma forma legal tambem de corrigir 
     * esse problema.
     * 
     * Mas vamos corrigir da seguinte forma. Em CoreModule, nos vamos importar um metodo, tambem do 
     * pacote common:
     * 
     * import { CommonModule, registerLocaleData} from '@angular/common';
     * 
     * E tambem tem que importar:
     * 
     * import localePt from '@angular/common/locales/pt';
     * 
     * E, agora, nos vamos invocar o metodo registerLocaleData(), passando, como parametro,
     * localePt.
     * 
     * Com isso, a gente so precisa, agora reiniciar a Aplicacao.
     * 
     */
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})

/**
 * O CoreModule eh parte do AppModule, ou seja, do modulo raiz. 
 * A convencao definida na documentacao do Angular (Style Guide) diz que somente o AppModule
 * poderah importar o CoreModule.
 */

export class CoreModule { }

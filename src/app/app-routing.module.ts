import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PaginaNaoEncontraComponent } from "./core/pagina-nao-encontra.component";
import { NaoAutorizadoComponent } from "./core/nao-autorizado.component";

/**
 * A medida que a aplicacao vai crescendo, o numero de rotas configuradas vai ficando 
 * ainda maior. Colocar todo esse codigo mo AppModule parece nao ser muito legal.
 * Isso vai deixar o codigo do AppModule dominado pelas configuracoes de rotas. 
 * Por isso a configuracao de rotas sera refatorada no AppModule. 
 * Vai ser criado um modulo apenas para configuracao de rotas:
 * RoutingModule (app-routing.module.ts). Essa eh uma convencao em aplicacoes Angular.
 * Criar um arquivo na pasta app.

Modulo de Roteamento do modulo AppModule.

Convencao:
[nome_do_modulo]-routing

 * 
 * Sistema de Rotas para o Usuario: trocar as Views do Cadastro de Lancamento para 
 * ir para o Cadastro de Pessoa, etc. Essa navegacao, para ela ser feita, precisa fazer 
 * uma configuracao, uma implementacao que o Angular suporta utilizando o roteamento.

NavBarComponent eh a barrinha azul em cima nas telas.
app-component.html eh o nosso template.

Para alternar de uma view para outra, comenta o seletor que a gente nao quer e 
sobe outro seletor, intercalando as views manualmente. 

Ao inves de colocar o seletor do nosso componente, como estava fazendo em tempo de 
desenvolvimento, vamos colocar uma diretiva chamada <router-outlet> e, 
atraves do caminho da URL (http://localhost:4200/pessoas/nova), o nosso projeto, 
atraves de um modulo chamado de RouterModule, vai selecionar, incluir dinamicamente o 
componente vinculado a esse caminho http://localhost:4200/pessoas/nova.

Para configurar o Roteamento, configurar em AppModule. Primeiramente, acima do decorator
AppModule, definir uma variavel chamada routes.
routes representa um array de Configuracoes de Rotas.

Os elementos do array routes sao objetos com propriedades que representam as 
configuracoes de cada roteamento que a gente quer adicionar na nossa aplicacao.

Configurar na propriedade path qual que eh o caminho que vai corresponder a um componente que
a gente vai carregar, sem a barra.

A propriedade component define qual que eh o componente que vai carregar quando digitar no path
/lancamentos.

Segundo, importar o RouterModule.
Chamar o metodo forRoot que recebe, como parametro, as configuracoes de rotas (variavel routes).
 */
const routes: Routes = [
    /** Quando acessar http://localhost:4200/ */
    /** Nao vai usar a propriedade component. Vai redirecionar para um outro Path.
     * Usar a propriedade redirectTo.
     * Nao colocar a /, a barra eh implicita.
     * Adicionar tambem a propriedade pathMatch. O valor padrao eh prefix.
     * Por padrao, o roteador vai olhar o que tem a esquerda da URL que estamos acessando
     * e vai checar se comeca com o Path especificado na rota.
     * O Path que queremos especificar eh exatamente o valor http://localhost:4200,
     * sem os prefixos de lancamentos, lancamentos/novo, etc.
     * Para tanto, especificar pathMatch: 'full', que eh exatamente a URL completa,
     * sem mais nada que seja um prefixo, ou seja, o Path completo, definido por:
     * path: ''.
     */

    /**
     * Aula Carregamento tardio de modulos (Lazy loading)

     * Nesta aula, a gente vai implementar o Lazy Loading Module, que eh o Carregamento Tardio dos 
     * Modulos. O que a gente vai fazer eh postergar o Carregamento de determinado Modulo. Hoje, 
     * na nossa Aplicacao, tudo o que precisa para ela funcionar, mais especificamente no nosso caso, 
     * o Modulo de Lancamento e o Modulo de Pessoas, eles sao carregados no inicio da Aplicacao, junto 
     * com o bundle, com o Javascript, com o bundle geral. Entao, vamos abrir o browser para ver isso, 
     * os Javascripts que sao carregados no inicio da Aplicacao.

     * Vamos acessar localhost:4200 e abrir o Web Developer no Chrome, na aba Network. Agora, vamos 
     * fazer um filtro pelo Javascript que eh carregado (botoes Filter e JS). E veja so, nos temos ali 
     * alguns Javascripts. O principal eh o main.js, ate o proprio nome dele ja indica isso, que contem 
     * os modulos da nossa Aplicacao. O que que acontece? Talvez venhamos a participar da construcao de 
     * uma Aplicacao em que tenhamos modulos muito grandes e pouco utilizados. E qual que eh a sacada 
     * aqui entao? Eh postergar o Carregamento desse modulo grande que eh pouco utilizado para o momento 
     * em que ele for necessario. Por exemplo, vamos supor que, na nossa Aplicacao, o modulo de Pessoas 
     * seja um Modulo muito grande e pouco utilizado. Ai o que que a gente faz? A gente faz o 
     * Carregamento tardio dele, porque, assim, so na hora que o Usuario final acessar a tela de Pessoas 
     * eh que os Javascripts ali e todo o necessario de/para o Modulo de Pessoas, nao todo o necessario 
     * para o Modulo de Pessoas, porque, talvez, ele dependa de Modulos que ja foram carregados em algum 
     * outro momento da Aplicacao, mas tudo aquilo que eh especifico do Modulo de Pessoas, vai ser 
     * carregado quando o Usuario final acessar a tela de Pessoas. E eh isso que a gente vai implementar 
     * agora. Inclusive, vamos deixar a aba do Web Developer aberta para a gente poder comparar o 
     * antes com o depois de a gente implementar o Lazy Loading.

     * Vamos abrir outra Aba do Chrome e tambem parar o Servidor NodeJS, porque, senao, quando 
     * alterarmos, ele vai se reiniciar sozinho.

     * Os arquivos que deverao ser alterados para aplicar-se o Lazy Loading sao:
     * app-routing.module.js
     * lancamentos-routing.module.js
     * pessoas-routing.module.js
     * app.module.js

     * A gente, para fazer o Carregamento tardio dos modulos de Lancamento e de Pessoas, a 
     * gente vai precisar alterar quatro arquivos ao todo, que eh o arquivo de rotas raiz, que eh 
     * esse app-routing.module.ts, o arquivo de rotas de Lancamento, lancamentos-routing.module.ts, 
     * o arquivo de rotas de Pessoas, pessoas-routing.module.ts, e a gente vai fazer uma pequena 
     * alteracao no app.module.ts ao final dessas tres primeiras alteracoes.

     * Entao, vamos comecar com o arquivo de rotas raiz, app-routing.module.ts. 
     * Vamos definir aqui mais dois objetos na nossa raiz de rotas. O primeiro vai ser o mapeamento
     * que vamos fazer para Lancamentos. Ao inves de usar os atributos component ou redirectTo ou
     * pathMatch, nos vamos utilizar um que se chama loadChildren(). No valor desse atributo, vamos
     * definir o Caminho ate o Modulo de Lancamentos e, entao, nos vamos definir um sharp (#) e o nome da
     * Classe do Modulo de Lancamentos.
     * Definir de forma similar para Pessoas.
     * Aqui, nesse arquivo de rotas raiz, eh o que a gente precisa alterar.
     * Agora, vamos precisar alterar o arquivo de rotas de Lancamentos e de Pessoas.
     * Ver lancamentos-routing.module.ts.
     * 
     * Alterados os arquivos lancamentos-routing.module.ts, pessoas-routing.module.ts,
     * app.module.ts.
     * 
     * Agora, podemos testar naquela outra aba que ja deixamos preparada no Browser.
     * 
     * Reparando no que tem de diferente, podemos ver que, no carregamento anterior, 
     * em http://localhost:4200/lancamentos, temos o 
     * main.js, que contem todos os nossos modulos que a gente desenvolve dentro da nossa Aplicacao
     * e contem mais uma outras coisas tambem. No novo carregamento, em http://localhost:4200/lancamentos,
     * temos o main.js porque precisamos, ainda, fazer um carregamento inicial para a Aplicacao 
     * disparar. So que o modulo de Lancamentos nao esta mais fazendo parte de main.js. Ele foi carregado
     * separadamente em app-lancamentos-lancamentos-module.js. Entao, agora, o que nos fizemos foi 
     * postergar o carregamento do Javascript necessario do modulo de Lancamento para quando o Usuario
     * acessar o nosso modulo de Lancamento. E a mesma coisa vai funcionar para Pessoas. 
     * 
     * Vamos abrir uma terceira aba e vamos acessar a Pagina de Lancamentos de novo. Vamos abrir o 
     * Web Developer. Esta filtrado apenas para aparecer os arquivos Javascripts. Repare-se que os todos 
     * os arquivos Javascript da Aplicacao ja foram carregados. O que nao foi carregado eh o modulo de
     * Pessoas. Entao, o que que temos que ver no Web Developer quando clicarmos na Pagina de Pessoas?
     * Temos que ver, agora, os arquivos Javascript referentes aos modulos, aquilo que a gente precisa
     * para fazer o modulo de Pessoas funcionar.
     * 
     * Antes de clicarmos na Pagina de Pessoas, devemos reparar que, independentemente de estarmos
     * com o Servico sendo rodado na maquina local ou, ate, remotamente, vamos ver que esse primeiro
     * carregamento eh um pouquinho mais demorado, pouca coisa, mas eh um pouco mais demorado, porque
     * a gente tem que baixar os arquivos especificos do modulo de Pessoas.
     * 
     * Ao clicarmos na Pagina de Pessoas, entao, foi carregado o arquivo de Pessoas
     * app-pessoas-pessoas-module.js
     * 
     * Entao, agora, nos temos o nosso modulo de Lancamentos e o nosso modulo de Pessoas sendo
     * carregados, cada um, quando o Usuario acessa a respectiva Pagina. Agora, repare-se que,
     * se continuarmos clicando em Lancamentos e Pessoas (na Aba Administrador), o carregamento
     * vai ser como antes, porque, ja que nos temos o arquivo Javascript de Pessoas com as coisas
     * referentes ao que precisamos para fazer funcionar o modulo de Pessoas. Reparamos que ele
     * volta a ter um tempo normal de carregamento, porque ja esta tudo no Browser. Entao, eh so
     * na primeira vez que demora mais, ele deixa para carregar aquelas coisas especificas do modulo
     * de Pessoas na hora que acessamos a Pagina de Pessoas, mas, depois que acessamos na primeira
     * vez, ja esta ali no Browser do Usuario, entao, obviamente, nao precisa baixar de novo e as
     * coisas ficam rapidas como antes.
     * 
     * Como vimos, antes nos tinhamos somente o main.js e, agora, nos temos os arquivos *-module.js
     * de cada Pagina, os *-module.js de cada modulo sendo carregados quando o usuario final acessa
     * a respectiva pagina referente aquele modulo.
     * 
     */

    { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
    { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },

    /**
    * Aula 23.01. Criando o Modulo Dashboard
    * 
    * 5. O path dashboard vai ficar configurado aqui, por isso que la em dashboard-routing.module.ts
    * vai ficar um path vazio para a raiz do dashboard.
    * Mapeada a rota aqui, voltar para dashboard-routing.module.ts.
    * **/
    { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },

    /**
    * Aula 23.01. Criando o Modulo Dashboard
    * 7. Aqui, quando o Path estiver vazio, a gente vai nao mais para /lancamentos, mas para 
    * /dashboard. Voltar para dashboard-routing.module.ts.
    * **/
    /**{ path: '', redirectTo: 'lancamentos', pathMatch: 'full' }, **/
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    /**
     * Aula 23.07. Criando Modulo de Relatorios
     * 6. Mapear o path relatorios
     * Temos o path 'relatorios' apontando para o Modulo de Relatorio.
     * Voltar para relatorios-routing.module.ts.
     */
    { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },

    /** Adicionado em LancamentosRoutingModule */
    /** { path: 'lancamentos', component: LancamentosPesquisaComponent }, */
    /** Adicionado em LancamentosRoutingModule */
    /** { path: 'lancamentos/novo', component: LancamentoCadastroComponent }, */
    /** Criar uma rota parametrizavel. Entao, adicionar um placeholder, chamado de Token, 
     * no formato :[nomeDoToken] */
    /** Adicionado em LancamentosRoutingModule */
    /** { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent }, */
    /** Adicionado em PessoasRoutingModule */
    /** { path: 'pessoas', component: PessoasPesquisaComponent }, **/
    /** Adicionado em PessoasRoutingModule */
    /** { path: 'pessoas/novo', component: PessoaCadastroComponent }, **/
    /** Adicionado em PessoasRoutingModule */    
    /** { path: 'pessoas/:codigo', component: PessoaCadastroComponent }, **/
    /**
     * O que acontece se a gente digitar qualquer Path que nao existe uma rota configurada?
     * O sistema de roteamento do Angular tenta encontrar uma rota, nao encontra e 
     * mostra um erro na Console do navegador, falando que nao encontrou nenhuma rota, 
     * nao coincidiu nenhuma rota com o segmento informado: Error: Cannot match any routes. 
     * URL Segment: 'KHHHHHHHHHHL'
  
     * Como fazer para criar um pagina Nao Encontrada para mostrar para o Usuario e ficar
     *  mais interessante o sistema?
  
     * Primeiro de tudo, criar um Componente em que a gente vai exibir uma mensagem de que a 
     * pagina nao foi encontrada, para representar a nossa View de Pagina Nao Encontrada.
  
     * ng g c core/pagina-nao-encontra --inline-style --inline-template 
     * --flat --spec=false
  
     * --inline-style: definir o estilo CSS como inline, ou seja,
     *   definido em uma linha somente dentro do arquivo component.ts. Nao ira criar 
     *   arquivo de estilo CSS.
     *    
     * --inline-template: definir o template como inline, ou seja,
     *   definido em uma linha somente dentro do arquivo component.ts. Nao ira criar 
     *   arquivo html.
     *    
     * --flat: para nao criar uma pasta para esse Componente
     * 
     * --spec-false: para nao criar uma Classe de teste.
  
     * --inline-style, --inline-template gerou em pagina-nao-encontra.component.ts:
     * @Component({
        selector: 'app-pagina-nao-encontra',
        template: `
          <p>
            pagina-nao-encontra works!
          </p>
        `,
        styles: []
      })
  
    * Ja foi registrado em core.module.ts, na Secao declarations.
    * Nao eh necessario exportar esse Componente.
  
    * Agora vamos configurar a rota. Redirecionar, capturar qualquer tentativa de
    * acesso a URLs que nao coincidam com uma rota configurada; redirecionar isso para
    * pagina-nao-encontrada. Para isso, configurar mais uma rota.
  
     */
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontraComponent },
    { path: 'nao-autorizado', component: NaoAutorizadoComponent },
    /** path: '**', ** significa qualquer coisa diferente que nao foi encontrado.
     * Definir por ultimo, porque primeiro vai procurar por uma rota ja definida. Se nao
     * encontrar, cai nesse path ** (dois asteriscos). */
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
  ];
  
  /** Decorator @NgModule */
  @NgModule({
    imports: [
      /** Registrar o modulo de rotas do Angular dentro do AppModule, que eh o 
       * modulo raiz. E dizemos a ele quais sao as configuracoes de rotas.
       * Agora eh necessario mudar o app-component.html, o template, removendo 
       * os seletores que estavam definidos manualmente e usar a diretiva
       * <router-outlet>
       */
      RouterModule.forRoot(routes)
    ],
    /** Eh bom exportar o RouterModule, porque o RouterModule, por exemplo, tem a diretiva
     * routerLink, que eh usado na View (.html).
     * Para ter acesso a diretiva routerLink, as diretivas do modulo de roteamento,
     * eh necessario exportar o RouterModule.
     */
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
/** Imports do Angular */
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
/** import { NgModule, LOCALE_ID } from '@angular/core'; **/
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

/** Imports de terceiros */
/** import { ToastyModule } from 'ng2-toasty'; **/
/** import {ConfirmDialogModule} from 'primeng/confirmdialog'; **/
/** import {ConfirmationService} from 'primeng/api'; **/

/** Nossos imports */
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

/** import { PessoasModule } from './pessoas/pessoas.module'; **/
/** import { LancamentosModule } from './lancamentos/lancamentos.module'; **/
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontraComponent } from './core/pagina-nao-encontra.component';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';
/** import { LancamentoService } from './lancamentos/lancamento.service'; **/
/** import { PessoaService } from './pessoas/pessoa.service'; **/

/**
 * npm install -g @angular/cli

 * -g = parametro para dizer que vai instalar globalmente na sua maquina.

 * ng - Eh o comando do Angular/CLI

 * ng -v: Para ver a versão do Angular/CLI

 * Criar um novo projeto:
 * ng new [meuprojeto]

 */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    /** Transferir imports para o CoreModule.
     * 
    /** Soh chamar o metodo forRoot() se estiver no modulo raiz. Como AppModule eh
     * o modulo raiz, pode chamar o metodo forRoot().
    ToastyModule.forRoot(),
    /** Adicionar o modulo do ConfirmDialog do PrimeNG.
    ConfirmDialogModule,
    */

    CoreModule,
    /** Aula Carregamento tardio de modulos (Lazy loading) */
    /** LancamentosModule, **/
    /** PessoasModule, **/
    SegurancaModule,
    /** Ao inves de importar o RouterModule, vamos importar o AppRoutingModule, que eh
     * o modulo que acabamos de criar.
     */
    AppRoutingModule
  ],
  /** Adicionar no Providers um Servico que a gente vai precisar para se comunicar com
   * o Componente ConfirmDialog: o ConfirmationService.
   * ConfirmationService eh um Servico que a gente usa para se comunicar com o Componente
   * de Confirmacao.
   */
  providers: [
    /** Transferir Providers para o CoreModule.
     * 
    LancamentoService,
    PessoaService,
    ConfirmationService,
    /** Adicionar um Provider para configurar o Locale padrao da Aplicacao.
     * Adicionar um Provider Por Valor: { provide: [TOKEN], useValue: [VALOR] }
     * Estah fornecendo o Valor 'pt-BR' atraves do token LOCALE_ID e o Angular
     * jah vai usar isso na hora de fazer a transformacao dos valores monetarios.
    { provide: LOCALE_ID, useValue: 'en-US' }
    */

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * Aula Atualizando para o Angular 5 - Atualizacoes e Recursos Avancados

Nesta aula, vamos atualizar a versao do nosso Projeto para o Angular 5 e tambem implementar algumas 
outras funcionalidades. Vamos atualizar para o Angular 5, a mais estavel nesse momento, mais 
especificamente, a versao 5.2.8.

Antes de colocar a mao na massa, nos vamos comentar algumas coisas. Primeira pergunta: como atualizar?
Sera que eh so mudar a versao do Angular? E as outras dependencias? Sera que eh preciso mudar essas 
outras dependencias? Quando falamos outras dependencias, sao aquelas dependencias que, quando a gente 
cria o Projeto com o Angular/CLI, ele, alem das dependencias do Angular, ele coloca algumas outras 
dependencias. Essas outras dependencias, nos perguntamos: sera que precisamos atualiza-las tambem? 
Sera que, ao atualiza-las, elas continuarao compativeis com a versao do Angular que nos definirmos 
que, no caso, sera a 5.2.8? Como que a gente verifica isso tudo, essa compatibilidade, para fazer 
uma atualizacao segura?

Comecamos a fazer pesquisas, aleatoriamente, na Internet, como sempre fazemos, e a melhor forma 
que encontramos, para atualizarmos o nosso Projeto e termos seguranca nessa atualizacao eh se basear 
em um Projeto Angular criado com Angular/CLI, ou seja, a gente atualiza o Angular/CLI na nossa maquina, 
cria um projeto novo, da uma olhada la e pega aquelas versoes e atualiza o nosso Projeto, que a gente 
garante, assim, compatibilidade, atualizacao e a compatibilidade entre o Angular e as outras bibliotecas 
ali que o Angular/CLI inclui no nosso package.json.

Tem tambem o site https://angular-update-guide.firebaseapp.com, que eh uma aplicacao criada pelo 
proprio time do Angular, onde ele auxilia na atualizacao de um projeto Angular. Aqui (no site), no 
caso do exemplo, eh da versao 4 para a versao 5. Aqui (no site), escolhe-se a complexidade do Projeto, 
obviamente, isso eh uma estimativa de complexidade. Clica-se, no site, em Show me how to update! e 
ele mostra algumas coisas que podemos fazer para atualizar. Recomenda-se dar uma olhada nesse site, 
mas preferimos fazer da primeira forma que comentamos aqui.

Primeiramente, vamos abrir o terminal, ja atualizamos o Angular/CLI de modo global, digitando o comando:

npm install @angular/cli -g 

Realmente, esse eh o mesmo comando que a gente utilizou para instalar. Entao, esse mesmo comando 
vamos utilizar para atualizar o Angular/CLI. Simplesmente, vamos sobrescrever a versao para a 
versao mais recente. Vamos rodar esse comando.

Para vermos a versao atual do Angular/CLI, eh so rodar o comando:

ng -v

Criamos um projeto de teste:

ng new teste

. Eh um projeto normal, como o que criamos la no comeco desse curso.

O que vamos fazer agora? Vamos visualizar o package.json desse projeto teste.

Em seguida, vamos abrir o package.json do Projeto algamoney-ui.

A primeira coisa que vamos fazer eh alterar as linhas:

    "start": "node server.js",
	"build": "ng build --prod",

para:

    "start": "ng serve",
	"build": "ng build",
	
Remover tambem a linha:

    "postinstall": "ng build --prod"
	

Em seguida, vamos pegar as dependencias de desenvolvimento e passar para desenvolvimento novamente, 
de dependencies para devDependencies (tudo abaixo de "zone.js").

Agora, vamos nos basear em teste/package.json para poder fazer a atualizacao em algamoney-ui/package.json.

Em teste/package.json"dependencies", podemos observar que o Angular esta na versao 5.2.0 e, 
como esta especificado, com circunflexo, e.g., "^5.2.0", para ser qualquer versao acima que seja 
compativel com essa, entao, para esse caso, ele vai baixar a versao mais atual, por exemplo, a 
versao 5.2.8. Pode-se definir como "^5.2.0", que o Angular/CLI vai baixar a versao mais atual, 
por exemplo, 5.2.8. Se, por acaso, ja tivermos baixado a versao 5.2.8 e a versao atual for maior, 
por exemplo, 6.0.3, entao, precisaremos ou: 1. Deletar a pasta node_modules e baixar de novo, com 
o comando "npm install", ou definimos no package.json como 6.0.3 que, entao, o Angular/CLI vai 
baixar a 6.0.3 ou qualquer outra versao acima que seja compativel.

Agora, vamos, no algamoney-ui/package.json, alterar a versao do Angular para 6.0.3. Para tanto, 
selecionar o ^5.2.0, CTRL+H e substituir por ^6.0.3.

Deve-se observar que somente as bibliotecas do Angular estejam com o valor da versao ^5.2.0 para 
nao atulizar outra biblioteca com um valor errado.

Agora, vamos voltar para o teste/package.json para verificarmos a versao do "core-js", que 
eh "^2.5.4". Vamos atualizar em algamoney-ui/package.json"core-js", porque esta com valor de 
versao inferior: "^2.4.1".

Vamos atualizar algamoney-ui/package.json"rxjs", que esta com valor de versao "^5.5.6", porque, 
em teste/package.json"rxjs", temos o valor de versao "^6.0.0".

Obs.: O site https://angular-update-guide.firebaseapp.com informa as bibliotecas que precisam ser 
atualizadas.

Vamos atualizar algamoney-ui/package.json"zone.js", que esta com valor de versao "^0.8.19", 
porque, em teste/package.json"zone.js", temos o valor de versao "^0.8.26".

Dessa forma, tudo o que esta relacionado ao Angular, nos ja atualizamos.

Com relacao as dependencias de desenvolvimento, ou seja, "devDependencies". Como a gente nao adicionou 
explicitamente nenhuma dependencia de desenvolvimento, durante o curso, no Projeto algamoney-ui, nos 
vamos simplesmente copiar tudo que esta em teste/package.json"devDependencies" e vamos substituir 
por tudo que estiver em algamoney-ui/package.json"devDependencies".

N.T.: Para copiar no Terminal: Selecionar e CTRL+SHIFT+C

Agora, vamos abrir o Terminal dentro do Projeto algamoney-ui e vamos digitar o comando:

npm install

para poder baixar as versoes, as bibliotecas referentes as versoes novas que a gente acabou 
de configurar. 

===================================================================================================
The Angular CLI
configuration format has been changed, and your existing configuration can be updated automatically 
by running the following command: 
ng update @angular/cli 
=================================================================================================== 


Agora, vamos rodar o comando para inicializar o nosso Projeto:

npm start

ou ng serve, como definido em package.json"start":

"start": "ng serve",

Eh possivel utilizar o npm start que, para o caso do nosso Projeto, esta equivalente ao ng serve.





--- Solucao: ---
1. Atualizar todas as dependencias de "dependencies" conforme teste/package.json"dependencies".

2. Copiar todas as dependencias de teste/package.json"devDependencies" e sobrescrever em 
angular-ui/package.json"dependencies"

3. Ajustar imports das dependencias de terceiros, como angular2-jwt, ng2-toasty, conforme definido 
em https://auth0.com/blog/whats-new-in-rxjs-6/
 * 
 * 
 */

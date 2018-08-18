import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
/** import { AuthHttp, AuthConfig } from 'angular2-jwt'; **/
import { JwtModule } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { environment } from '../../environments/environment';

/**
 * Aula 25.07. Atualizando o modulo JWT
 *
 * A partir desta aula, o que a gente vai fazer eh alterar do modulo HttpModule para o modulo HttpClientModule, que eh o mais recente, 
 * que eh o que a gente precisa atualizar no nosso Projeto. E, de quebra, a gente vai atualizar, tambem, o pacote, o modulo que a gente 
 * esta utilizando do JWT, que eh o angular2-jwt. A gente vai fazer essa atualizacao, ate porque a gente quer, obviamente, utilizar o 
 * mais recente e, tambem, porque o novo pacote do JWT utiliza um recurso do modulo do HttpClientModule, que eh um recurso de 
 * Interceptadores, para poder incluir o Token. Entao, a gente vai precisar fazer algumas alteracoes aqui no nosso Projeto quanto a 
 * essa questao, tanto de atualizar para o HttpClientModule quanto tambem atualizar o nosso pacote do JWT.
 *
 * Para isso, nos vamos abrir aqui o VS Code. Ja estamos aqui com a Classe seguranca.module.ts aberta. Eh o arquivo que nos mais vamos 
 * alterar nesta aula. Vamos abrir, tambem, o arquivo package.json, porque vamos fazer algumas alteracoes nele tambem, mas vai ser 
 * por linha de comando.
 * 
 * 1. Primeiramente, nos vamos rodar o comando para desinstalar o angular2-jwt, que sera removido, tambem, do package.json.
 * 
 * npm uninstall angular2-jwt --save
 * 
 * 2. E, agora, o que a gente vai fazer eh rodar o comando:
 * 
 * npm install @auth0/angular-jwt --save
 * 
 * 3. Agora, a gente pode ir em seguranca.module.ts e fazer as alteracoes necessarias.
 * 
 * 4. A primeira coisa a fazer eh importar JwtModule,
 * import { JwtModule } from '@auth/angular-jwt'
 * 
 * 5. Nao precisamos mais do metodo authHttpServiceFactory(), porque a gente nao vai mais utilizar a Classe
 * AuthHttp do pacote angular2-jwt.
 * 
 * 6. Remover, tambem, da Secao Providers, a classe AuthHtt, que estava sendo provida, com a ajuda do metodo authHttpServiceFactory.
 * Nao sera mais necessario.
 * 
 * 7. No lugar disso, a gente vai definir, na Secao Imports, JwtModule.forRoot(), passando um objeto 
  * {} com a propriedade config, que tambem eh um objeto, que tera as propriedades tokenGetter, passando um metodo que tambem
  * vamos chamar de tokenGetter, o qual iremos definir mais acima, simplesmente para retornar o token,
  * 
  * export function tokenGetter() {
    return localStorage.getItem('token');
  }
  *
  * E tambem vamos definir outras duas propriedades que iremos utilizar aqui, que sao: whitelistedDomains, que eh uma lista de 
  * dominios que o pacote Auth0/angular-jwt vai enviar o nosso token, ele nao envia para qualquer lugar, ele envia somente para onde
  * a gente permitir. E o valor dessa propriedade nos vamos pegar de um parametro que nos vamos guardar no arquivo environment.ts.
  * Ver environment.ts.
  * 
  * 17. Agora podemos definir, para a propriedade whitelistedDomains, o valor environment.tokenWhitelistedDomains e, para a 
  * propriedade blacklistedDomains, o valor environment.tokenBlacklistedDomains.
  * 
  * 18. Nos iremos precisar definir mais algumas coisas, alem disso aqui, porque aquela Classe AuthHttp estava sendo utilizada
  * nas nossas Classes de Servico, como, por exemplo, pessoa.service.ts, pode-se ver AuthHttp sendo injetada no Construtor.
  * Nos iremos fazer essas alteracoes, iremos fazer uma alteracao na Classe MoneyHttp tambem, porque, ao inves de importar 
  * AuthHttp, a gente vai importar MoneyHttp.
  * 
  * 19. Antes de finalizar a aula, vamos fazer uma correcao. Deve-se importar enviroment de desenvolvimento e nao de producao,
  * import { environment } from '../../environments/environment';
  * 
  * 20. Fim da Aula 25.07. Atualizando o modulo JWT.
 */

/**
 * Depois que comecamos a usar a API que usa OAuth2 para a Seguranca dela, comecamos 
 *    a ter problemas todas as chamadas HTTP que tinhamos implementado.
      Tudo que a gente tinha que faz requisicoes parou de funcionar. Comeca a dar erros, 
      retornando o Status 401, que eh o Status de Nao-Autorizado.
      Realmente nao estamos autorizados a usar a API, porque agora precisamos passar 
      o Access Token no Authorization em todas as chamadas.

      Para corrigir isso, vamos usar a biblioteca angular2-jwt. Essa biblioteca tem um
      Servico HTTP chamado AuthHttp, que eh, basicamente, um Wrapper do Servico de HTTP, 
      ou seja, eh um Servico que tem tudo o que o Servico HTTP tem, porem, tem uma camada a 
      mais que adiciona para a gente, automaticamente, de forma muito transparente, adiciona o
      Authorization, o Access Token em todas as chamadas HTTP que vamos fazer.

      1. Vamos comecar na Classe SegurancaModule. Aqui vamos adicionar um Provider, 
      um objeto com a propriedade provide e o valor AuthHttp. E vamos utilizar um Fabrica
      para fornecer esse AuthHttp.

 * 
 */

/** Vamos criar uma funcao que vai receber, 
 *  como parametro, um objeto do tipo HTTP e tambem outro do tipo RequestOptions.
 *  O que esta funcao tem que fazer? Esta funcao tem que construir um AuthHttp e retornar para a gente.
 */
/**
 * Erro HTTP 415 - Unsupported Media Type
 * Esse eh o problema que a gente tinha resolvido quando definimos o Content-Type:application/json.
 * Como foi removido, o erro voltou a ocorrer. No entanto, esse cabecalho application/json 
 * pode ser definido globalmente, nao eh necessario definir em cada chamada e o codigo nao fica 
 * repetitivo em varios lugares.
 *
 * Onde isso eh passado? Na Funcao de Fabrica do AuthHttp.
 * 
 */
/** Precisamos, agora, usar a Classe MoneyHttp, eh uma Classe que a gente criou para 
 * interceptar as coisas. Como usa-la?
 * Na Classe SegurancaModule, nesta Funcao de Fabrica, ao inves de 
 * instanciar um AuthHttp, vamos instanciar um MoneyHttp.
 */
/**
 * * Aula 25.07. Atualizando o modulo JWT
 * 
 * 5.1. Nao precisamos mais do metodo authHttpServiceFactory(), porque a gente nao vai mais utilizar a Classe
 * AuthHttp do pacote angular2-jwt.
 */
/**
 export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  /** No Construtor do AuthConfig, passar um objeto com a propriedade globalHeaders. No array,
   * definir quais sao os cabecalhos globais que quero adicionar em todas as requisicoes.
  *
  const config = new AuthConfig({
    /** Todas as requisicoes que fizermos usando o AuthHttp, ja vai ser adicionado, por padrao,
     * o Content-Type:application/json.
     *
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });

  /** Retornar uma nova instancia de AuthHttp.  *
  return new MoneyHttp(auth, config, http, options);
}
*/

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedDomains
      }
    }),

    InputTextModule,
    ButtonModule,  

    SegurancaRoutingModule
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    /**
     * Aula 25.07. Atualizando o modulo JWT
     * 
     * 6.1. Remover, tambem, da Secao Providers, a classe AuthHtt, que estava sendo provida, com a ajuda do metodo 
     * authHttpServiceFactory. Nao sera mais necessario.
     * 
     * 7.1. No lugar disso, a gente vai definir, na Secao Imports, JwtModule.forRoot(), passando um objeto 
     * {} com a propriedade config, que tambem eh um objeto, que tera as propriedades tokenGetter, passando um metodo que tambem
     * vamos chamar de tokenGetter, o qual iremos definir mais acima, simplesmente para retornar o token,
     * 
     * export function tokenGetter() {
        return localStorage.getItem('token');
      }
     *
     * E tambem vamos definir outras duas propriedades que iremos utilizar aqui, que sao: whitelistedDomains, que eh uma lista de 
     * dominios que o pacote Auth0/angular-jwt vai enviar o nosso token, ele nao envia para qualquer lugar, ele envia somente para onde
     * a gente permitir. E o valor dessa propriedade nos vamos pegar de um parametro que nos vamos guardar no arquivo environment.ts.
     * Ver environment.ts.
     * 
     * 17.1. Agora podemos definir, para a propriedade whitelistedDomains, o valor environment.tokenWhitelistedDomains e, para a 
     * propriedade blacklistedDomains, o valor environment.tokenBlacklistedDomains.
     * 
     * 18. Nos iremos precisar definir mais algumas coisas, alem disso aqui, porque aquela Classe AuthHttp estava sendo utilizada
     * nas nossas Classes de Servico, como, por exemplo, pessoa.service.ts, pode-se ver AuthHttp sendo injetada no Construtor.
     * Nos iremos fazer essas alteracoes, iremos fazer uma alteracao na Classe MoneyHttp tambem, porque, ao inves de importar 
     * AuthHttp, a gente vai importar MoneyHttp.
     * 
     * 19. Antes de finalizar a aula, vamos fazer uma correcao. Deve-se importar enviroment de desenvolvimento e nao de producao,
     * import { environment } from '../../environments/environment';
     * 
     * 20. Fim da Aula 25.07. Atualizando o modulo JWT.
     *
    {
      /** Vamos fornecer o Servico AuthHttp *
      provide: AuthHttp,
      /** E vamos utilizar uma Fabrica para fornecer o Servico AuthHttp.
       * O valor do atributo eh o metodo authHttpServiceFactory().
       *
      /** Como a Funcao Construtora, Funcao de Fabrica recebe dois parametros, 
       *  a gente precisa injetar, passar esses parametros como dependencia para essa funcao.
       * Entao define uma nova propriedade chamada deps (dependencias):
       * deps: [Http, RequestOptions]. Dessa forma, eh passado uma instancia de
       * Http e uma instancia de RequestOptions para a funcao.
       * Agora, a nossa Aplicacao tem um Servico AuthHttp fornecido para toda a Aplicacao,
       * porque quem importa o SegurancaModule eh o AppModule.
       * Agora, basta utilizar esse AuthHttp onde precisar.
       *  *
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions],
    },
    */
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }

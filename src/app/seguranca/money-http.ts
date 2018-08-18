/** import { Http, RequestOptions, RequestOptionsArgs, Response } from "@angular/http"; **/
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from "@angular/core";

/** import { AuthHttp, AuthConfig } from "angular2-jwt"; **/
/** import { Observable } from 'rxjs/Observable'; **/
import { from as observableFromPromise, Observable } from 'rxjs';

import { AuthService } from "./auth.service";

/**
 * Aula 25.08. Alterando a Classe MoneyHttp
 *
 * Agora, a gente precisa corrigir os problemas que aconteceram a partir do momento que a gente removeu o modulo, o 
 * pacote angular2-jwt.
 * 
 * So que, antes de fazer isso, a gente precisa ir na Classe MoneyHttp fazer algumas alteracoes nela, porque a gente vai 
 * continuar utilizando essa Classe, so que de uma forma um pouco diferente. Isso por causa do metodo fazerRequisicao(), 
 * da Classe MoneyHttp.
 *
 * Antes, na versao do angular2-jwt, essa Classe utilizava a Classe AuthHttp do angular2-jwt para poder colocar o token para a 
 * gente na nossa Requisicao. Agora, ele faz isso atraves dos Interceptadores que a gente tem, que eh um Recurso do HttpClientModule. 
 * Entao, nao precisa mais de fazer isso dessa forma. O pacote JWT nao precisa mais da Clase AuthHttp, por isso ela nao existe mais. 
 * So que a gente ainda vai precisar dessa classe MoneyHttp por causa do metodo fazerRequisicao(), porque ele eh um metodo que a 
 * gente acabou aproveitando para, alem do pacote JWT adicionar o token, a gente aproveita para poder, quando necessario, atualizar 
 * o token.
 *
 * O que acontece no metodo fazerRequisicao()? Quando eh feita uma Requisicao com o token invalido, para que a gente nao tenha que 
 * jogar uma mensagem para o Usuario dizendo, 'Token invalido', a gente faz uma tentativa automatica de renovar esse token para 
 * poder continuar com a Requisicao, ajudando, assim, o nosso Usuario.
 *
 * Entao, como esse eh um Recurso importante na nossa Aplicacao, a gente vai continuar utilizando MoneyHttp.
 *
 * Estamos dizendo isso porque, se a gente nao tivesse esse Recurso do metodo fazerRequisicao(), nos poderiamos utilizar diretamente 
 * o HttpClient, nos nao precisariamos da nossa Classe MoneyHttp.
 *
 * Vamos as alteracoes, agora.
 *
 * 1. Nao vamos precisar mais do pacote angular2-jwt, nem do pacote @angular/http. Ao inves disso, vamos precisar do pacote 
 * @angular/common/http, com a Classe HttpClient, 
 * import { HttpClient } from '@angular/common/http'
 *
 * 2. Ao inves de estender AuthHttp, vamos estender HttpClient. 
 *
 * 3. No Construtor, nao vamos precisar mais definir:
 * options: AuthConfig,
 * http: Http, defOpts?: RequestOptions
 * , mas vamos precisar definir 
 * private httpHandler: HttpHandler
 * , porque, como estamos estendendo HttpClient, precisamos passar para o super() a instancia de HttpHandler.
 * 
 * 4. E, agora, vamos fazer as alteracoes aqui nos metodos. Vamos comecar por uma pequena alteracao no metodo fazerRequisicao(),
 * incluindo o Recurso <T>, que eh equivalente ao Recurso Generics do Java, fazerRequisicao<T>. Aqui estamos utilizando a letra T,
 * poderia ser, por exemplo, a letra R, de Response, mas iremos utilizar a letra T, de Type,
 * private fazerRequisicao<T>(fn: Function): Observable<T> {}
 * 
 * 5. Por que estamos alterando o metodo fazerRequisicao() primeiramente? Porque, como todos os metodos restantes estao utilizando o 
 * metodo fazerRequisicao(), nos vamos nesses metodos e comecamos a alterar a partir do metodo delete(), primeiro metodo da nossa 
 * Classe, definindo <T> na assinatura do metodo. O options, que antes era do tipo RequestOptionsArgs, vai ser alterado para o tipo
 * any. Ao inves de retornar Observable<Response>, vai retornar Observable<T>. Onde esta chamando super.delete(), tambem definir
 * com Generics, super.delete<T>(), assim como na chamada para this.fazerRequisicao, que passa a ser
 * this.fazerRequisicao<T>().
 * 
 * public delete<T>(url: string, options?: any): Observable<T> {
 *  return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
 * }
 * 
 * 6. E a gente vai fazer o que foi definido no Passo 5 para todos os metodos.
 * 
 * 7. Para corrigir o retorno, no metodo fazerRequisicao(), 
 * return Observable.fromPromise(chamadaNovoAccessToken),
 * como nos tivemso uma atualizacao do rxjs para a versao para a versao 6, vamos importar a funcionalidade do metodo 
 * .fromPromise de outro lugar, do metodo from(). Nos queremos o metodo from, o qual estamos importando de 'rxjs',
 * so que nos vamos definir observableFromPromise para ficar bem parecido com o que nos tinhamos definido antes, que era a 
 * chamada para o metodo fromPromise. Entao, o import fica definido como,
 * import { from as observableFromPromise } from 'rxjs'
 * 
 * 8. Alterar a chamda,
 * return Observable.fromPromise(chamadaNovoAccessToken);
 * por,
 * return observableFromPromise(chamadaNovoAccessToken);
 */

/**  
 * No codigo do angular2-jwt, a gente consegue ver essa classe AuthHpptError. Nos vamos 
 * tentar tratar essa Classe. Nos podemos pensar em tratar essa Classe em 
 * ErrorHandlerService (error-handler.service.ts).
 * 
 * Tem um problema. Nao conseguimos fazer essa checagem de
 * instanceof AuthHttpError, porque a classe AuthHttpError herda de Error.
 * O problema eh que, a partir do TypeScript, versao 2.1, herdar Classes como
 * Error, entre outras, a gente nao vai conseguir mais usar o instanceof.
 * 
 * Qual que eh a solucao?
 * 
 * A solucao eh nos criarmos uma nova Classe em MoneyHttp, que servira somente
 * para nos lancarmos um erro. Vamos chamar a Classe de NotAuhenticated.
 * E (...) verificar metodo fazerRequisicao().
 */
export class NotAuthenticatedError {

}

/** Criar uma Classe que vai representar o nosso Servico de Http. A gente vai fazer um Wrapper, na verdade. 
 *  Toda vez que a gente falar que quer usar um AuthHttp, eu vou criar uma Classe que herda AuthHttp
 *  e a gente vai delegar todos os metodos, a gente vai criar metodos, post, get, etc., delegando
 *  para os metodos 
 *  da classe AuthHttp. A Classe AuthHttp tem varios metodos, request, get, post, put, etc., 
 *  a gente vai criar
 *  um metodo para cada cada um desses metodos, delegando a chamada para AuthHttp, so que, 
 *  antes disso, a gente 
 *  vai verificar se o token esta valido ou nao, porque, se o token estiver invalido, a 
 *  gente vai, automaticamente,
 *  criar um novo Access Token. */
@Injectable()
/** export class MoneyHttp extends AuthHttp { **/
export class MoneyHttp extends HttpClient {

    /** 
No Construtor, a gente injeta algumas coisas, como AuthService, que eh a nossa Classe,
options e http porque a gente chama o super()
da Classe AuthHttp, entao chamamos o Construtor 
da Classe AuthHttp, passando options, http e defOpts.
Recebemos uma parametro a mais, que eh da nossa 
implementacao que a gente vai precisar, que eh o
AuthService, que eh o nosso Servico de Autenticacao.
**/
    constructor(
        private auth: AuthService,
        /**
        options: AuthConfig,
        http: Http,
        defOpts?: RequestOptions
        **/
       private httpHandler: HttpHandler
    ) {
        /** super(options, http, defOpts); **/
        super(httpHandler);
    }

    /** 
    Agora, criamos todos os metodos, mas antes de chamar, 
    antes de delegar a chamada para, por exemplo, antes de
    chamar super.delete(), o que eh super.delete()? super.delete eh chamar o delete, o metodo delete()
    da Classe Pai, da AuthHttp. Antes de chamar isso, a gente vai chamar o
    metodo fazerRequisicao, que vai fazer as checagens para
    a gente,  para ver se o token esta invalido. Se estiver
    invalido, vai criar um novo Access Token, fazendo uma requisicao, que a gente ja implementou.
      **/    
    /** public delete(url: string, options?: RequestOptionsArgs): Observable<Response> { **/
    public delete<T>(url: string, options?: any): Observable<T> {
        /** A gente chama o metodo fazerRequisicao, que recebe, como parametro, uma Funcao. Qual
         * que eh a Funcao? () => super.delete(url, options)
         * Eh uma arrow function. O que essa funcao faz?
         * Chama o super.delete().
         */
        return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
    }

    /** public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> { **/
    public patch<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.patch<T>(url, options));
    }
    
    /** public head(url: string, options?: RequestOptionsArgs): Observable<Response> { **/
    public head<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.head<T>(url, options));
    }

    /** public options(url: string, options?: RequestOptionsArgs): Observable<Response> { **/
    public options<T>(url: string, options?: any): Observable<T> {        
        return this.fazerRequisicao<T>(() => super.options<T>(url, options));
    }

    /** public get(url: string, options?: RequestOptionsArgs): Observable<Response> { **/
    public get<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.get<T>(url, options));
    }

    /** public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> { **/
    public post<T>(url: string, body: any, options?: any): Observable<T> {        
        return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
    }

    /** public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {**/
    public put<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
    }

    /** O metodo fazerRequisicao recebe, como parametro, uma Funcao, que chamamos de fn.
     * 
     */
    /** private fazerRequisicao(fn: Function): Observable<Response> { **/
    private fazerRequisicao<T>(fn: Function): Observable<T> {
        /** Se retornar apenas fn:
         * return fn();
         * , o que estou fazendo?
         * Na verdade, vai funcionar, mas eh uma Classe que nao faz muito sentido.
         * Se fizer isso, vai funcionar tudo tranquilamente, pode continuar fazendo put(), get(), post(),
         * tudo, porque a Funcao que eu recebo como parametro, eu chamo ela e retorno 
         * o resultado dessa funcao, o que essa funcao (fn()) der de retorno, eu vou retornar tambem.
         * Esse metodo requisicao chama a funcao que recebeu como parametro (fn()).
         */
        /** O ponto mais importante eh que ja conseguimos fazer a interceptacao de todas as
         * funcoes.
         * Agora, nesta Funcao, a gente tem que fazer uma checagem para ver se o token esta invalido.
         * Como que a gente faz essa checagem?
         * Vamos fazer um if(), chamando auth, que eh o nosso Servico, e verificar se isAccessTokenInvalido().
         * Eu verifico se o token esta invalido ou nao.
         */
        if (this.auth.isAccessTokenInvalido()) {
            /** Se o Access Token estiver invalido. */
            console.log('Requisicao HTTP com Access Token invalido. Obtendo novo token.');
            /** Obter novo token. 
             * Declarar uma variavel chamadaNovoAccessToken como o 
             * retorno da chamada do obterNovoAccessToken().
            */
            const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
                .then(() => {

            /** 
 * E no metodo fazerRequisicao(), quando a gente chamar obterNovoAccessToken(),
 * antes de chamar a nossa Funcao que a gente esta interceptando, 
 * independentemente se o chamada a obterNovoAccessToken() retornar sucesso ou nao, 
 * a gente vai cair no then(). E, entao, a gente esta chamando a Funcao original,
 * passando para a Funcao original, post(), put(), a Funcao original que a gente
 * esta interceptando.
 * Mas nos nao vamos fazer isso, porque, se nos fizermos isso, entao vai dar o 
 * erro. Nos vamos verificar antes se o Access Token ainda esta invalido, porque
 * nos chamamos obterNovoAccessToken(), ja nos deu um retorno, mas sera que esta valido
 * ainda nou nao? Entao, vamos verificar.
             *  **/
                    if (this.auth.isAccessTokenInvalido) {
                        /** Mesmo nos buscando um novo Access Token, se ele ainda
                         * estiver invalido, vamos lancar um erro.
                         * Esse erro que nos lancamos vai chegar em ErrorHandlerService
                         * (error-handler.service.ts), no metodo handle() e podemos,
                         * entao, tratar esse erro, ao inves de tratar AuthHttpError.
                         */
                        throw new NotAuthenticatedError();
                    }

            /** Precisa chamar a funcao fn() tambem, porque precisa dar andamento a Requisicao
             * get(), put(), post(), etc.
             *  Esta retornando o retorno da Funcao, mas vai transformar o retorno dessa 
             * Funcao em uma Promessa. Logo depois, vai transformar e retornar um Observable.
             */                    
                    return fn().toPromise();
                });
            /** Vai transformar de Promessa para Observable.
             * Como a gente esta trabalhando com Promise no nosse Servico obterNovoAccessToken(),
             * a gente precisa transformar de volta para Observable.
             * Os metodos todos do AuthHttp retornam Observable tambem,
             * entao a gente tem que transformar novamente de volta para Observable.
             */
            /** return Observable.fromPromise(chamadaNovoAccessToken); **/
            return observableFromPromise(chamadaNovoAccessToken);
        } else {
            /** Se os Access Token nao estiver invalido, entra no else.
             * E, se nao estiver invalido, chamamos a funcao (fn()).
             * Se esta tudo certo, chama a funcao e retorna o que ela retornar.
             */
            return fn();
        }
    }
}
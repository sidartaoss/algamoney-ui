import { Injectable } from '@angular/core';
/** import { Response } from '@angular/http'; **/
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
/** import { AuthHttpError } from 'angular2-jwt'; **/
import { NotAuthenticatedError } from '../seguranca/money-http';
import { MessageService } from 'primeng/components/common/messageservice';

/**
 * Aula 25.09. Usando a Classe MoneyHttp
 * 
 * 11. Agora que a gente ja configurou o JWT, que a gente alterou a nossa Classe MoneyHttp, 
  * vamos passar aqui pelos nossos arquivos, pelas nossas classes para que a gente utilize a nossa classe 
  * MoneyHttp ao inves da classe AuthHttp e, tambem, para que a gente remova todas as classes do modulo 
  * angular/http e passe a utilizar somente as classes do modulo angular/com/http.
  * 
  * 12. Aqui, esta sendo utilizado a Classe Response do pacote @angular/http e a gente precisa a Classe
  * HttpErrorResponse do pacote @angular/common/http.
  * 
  * 13. Vamos utilizar essa Classe no instanceof do metodo handle(), de
  * } else if (errorResponse instanceof Response
      && errorResponse.status > 399 && errorResponse.status < 500) {

  * para
  * } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status > 399 && errorResponse.status < 500) {
  * 
  * 14. Tambem no metodo handle(), nos nao precisamos mais da chamada do metodo .json(), de
  *   try {
       errors = errorResponse.json();
       msg = errors[0].mensagemUsuario;
      } catch (e) { }
  *
  * para
  *  try {
       errors = errorResponse;
       msg = errors[0].mensagemUsuario;
     } catch (e) { }
 *
 * 14. Nesse caso, nao vamos precisar nem mesmo da variavel local errors, ao inves de errors[0].mensagemUsuario,
 * vamos definir errorResponse.error[0].mensagemUsuario. error eh um array, onde eh possivel pegar na primeira
 * posicao 0 a propriedade mensagemUsuario.
 * 
 * 15. Podemos remover a declaracao da variavel local errors, let errors;
 *    try {       
       msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }
 *
 * 16. Agora, vamos para dashboard.service.ts. Ver dashboard.service.ts.
 */

@Injectable()
export class ErrorHandlerService {

  /**
   * Aula 25.06. Usando o Growl
   * 
   * 4.1. Para substituir a biblioteca Toasty pelo Growl do PrimeNG, nos vamos ter que alterar nos pontos onde a mensagem eh adicionada,
   * Essas mensagens sao adicionadas nas Classes dos Componentes. Vamos, primeiramente, em error-handler.service.ts.
   * 
   * 5. Primeiramente, ao inves de ToastyService, vamos definir MessageService, importando de primeng/components/common/messageservice.
   * 
   * 6. Agora, mais abaixo, nos vamos utilizar MessageService ao inves de Toasty. Vamos definir
   * this.messageService,add(), passando um objeto {}, com algumas propriedades,
   * severity : 'error',
   * detail : msg
   * 
   * 7. Agora, vamos em lancamento-cadastro.component.ts.
   * Ver lancamento-cadastro.component.ts.
   */

  constructor(
    /** private toasty: ToastyService, **/
    private messageService: MessageService,
    private router: Router) { }

/** Eh necessario adicionar o Provider para este Servico: ErrorHandlerService.
 * Adicionar o Provider no CoreModule.
 */

/** Criar um metodo chamado handle, recebendo, como parametro, um objeto errorResponse,
 * do tipo any. Recebendo um objeto que representa o nosso erro, pode ser uma mensagem
 * ou um objeto Response. Esse metodo serah chamado quando houver algum erro nos
 * servicos que estivermos usando.  
 */
  handle(errorResponse: any) {
    /** Primeiramente, declarar uma variavel msg, que eh a mensagem
     * que vamos exibir ao usuario.
     * Segundo, vamos injetar no Construtor o ToastyService.
     * Terceiro, pegar o toasty e exibir, com error, a mensagem.
     */
    let msg: string;
    /** O que exibir para o Usuario?
     * Verificar, primeiro, se o tipo de errorResponse eh string. Se errorResponse
     * for uma string, atribuir essa string na mensagem.
     */
    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    /** 
     * E se o Refresh Token expirar?

     * Quando o Access Token expira, a gente consegue criar um novo Access Token de forma 
     * transparente para o Usuario.

     * Mas, e se o Refresh Token expirar? O que acontece? Vamos fazer um teste.

     * Vamos, para isso, configurar, nesta aula, a API para expirar o Refresh Token
     * depois de 10 segundos apenas.

     * Configurada a API para expirar o Refresh Token depois de 10 segundos. 
     * 
     * Nao apenas o Access Token vai expirar, mas tambem o Refresh Token. 
     * Quando tentar mudar de pagina, o Sistema vai fazer uma Requisicao para a nossa API, 
     * o Access Token vai estar expirado, o nosso codigo que a gente ja implementou vai 
     * tentar criar um novo Access Token e, para criar um novo Access Token, a gente passa 
     * o Refresh Token, a gente faz isso atraves dos Cookies, o Navegador ja faz isso 
     * para a gente. Mas o Refresh Token tambem ja esta expirado. Entao, o que vai acontecer? 
     * Acontece um erro: 'Erro ao processar servico remoto. Tente novamente.' 
     * Nos precisamos tratar esse erro, porque o Usuario nao sabe o que esta acontecendo. 
     * Neste caso, o Usuario precisa fazer um novo Login, nao tem jeito, ele precisa de um 
     * novo Refresh Token, um novo Access Token, ele vai ter que se autenticar novamente. 
     * Entao, a gente pode tratar esse erro (HTTP 401, 'No JWT present or has expired') 
     * e redirecionar o Usuario para a pagina de Login. Se olharmos o erro na Console do 
     * Navegador, eh lancado um erro chamado AuthHpptError.

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
     * para nos lancarmos um erro. Ver em money-http.ts.
     * 
     * Criamos a Classe NotAuthenticatedError em MoneyHttp. Ao inves de definirmos 
     * instanceof AuthHttpError, vamos definir instanceof NotAuthenticatedError.
     * **/      
    /** } else if (errorResponse instanceof AuthHttpError) {**/
    } else if (errorResponse instanceof NotAuthenticatedError) {
      /** Vamos definir uma mensagem. Vamos chamar de sessao, ao inves de token, para 
       * ficar mais entendivel pelo Usuario.
       */
      msg = "Sua sessao expirou!";
      /** Aqui vamos rotear, navegar o Usuario para a Pagina de Login. */
      this.router.navigate(["/login"]);
      /** Estando na Pagina de Login, se o Usuario tentar acessar /lancamentos,
       * vai voltar para a Pagina de Login, porque a gente ainda tem o Refresh Token
       * no Cookie tentando enviar, tentando renovar o Access Token, nao funciona
       * e, entao, voltar para a Pagina de Login.
       * Agora, o nosso Sistema esta muito melhor, porque a usabilidade
       * fica melhor. A API continua a mesma, continua segura da mesma forma, a gente
       * esta so dando feedbacks melhores para o Usuario, redirecionando-o para
       * a Pagina de Login quando ele realmente nao pode continuar usando o Sistema.
       */
    /** } else if (errorResponse instanceof Response
      && errorResponse.status > 399 && errorResponse.status < 500) { **/
      } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status > 399 && errorResponse.status < 500) {
      /** Se nao for uma string Entao atribuir uma mensagem fixa */
      /** msg = 'Erro ao processar serviço remoto. Tente novamente.'; **/
      /** console.log('Ocorreu um erro', errorResponse); **/
      /** console.log(`Esse eh o body: ${errorResponse._body}`); **/
      /** console.log(`Esse eh o status: ${errorResponse.status}`); **/
      /** if (errorResponse.status > 399 && errorResponse.status < 500) {
       let erros = JSON.parse(errorResponse._body);
       erros.forEach((erro) => {
        this.toasty.error(erro.mensagemUsuario);
        });
       this.toasty.error(erros[0].mensagemUsuario);
      }
      **/      
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação.';

      /**
       * Neste momento, eu estou logado com a Maria e a Maria nao tem permissao para excluir um
       * Lancamento e, mesmo assim, a gente vai tentar excluir um Lancamento. Vamos ver o 
       * que acontece? Quando eu clico em excluir, confirmo, aparece um erro aqui:
       * 'Ocorreu um erro ao processar a sua solicitacao'. E a gente esta tendo um Status
       * de retorno da nossa Requisicao HTTP de Codigo 403, que eh Acesso Negado. 
       * A gente poderia mostrar uma mensagem melhor para o Usuario, para a Maria, ao inves 
       * de 'Ocorreu um erro ao processar a sua solicitacao', poderiamos falar que ela nao tem
       * permissao para essa acao, ou algo assim, 'Acesso Negado', algo mais 
       * especifico.

       * Nesta aula, entao, vamos editar o Servico ErrorHandlerService. No else if, 
       * ja esta verificando se o erro esta na faixa, se o status esta na faixa de 400 a 499. 
       * Nos vamos definir uma outra mensagem aqui.
       * A mensagem padrao eh 'Ocorreu um erro ao processar a sua solicitação.', mas nos vamos
       * definir uma outra mensagem padrao aqui caso o Status seja igual a 403 (Acesso negado)
       * 
       * Mas esta aula tem um outro objetivo tambem, que eh a gente proteger esse componente, 
       * esse botao de Excluir. Ja que a Maria nao pode excluir, nao precisa a gente dar o trabalho
       * para ela clicar e confirmar e depois se frustrar, vendo que ela nao tem permissao.
       * Podemos, simplesmente esconde esse botao ou, ainda, desabilita-lo, depende de cada
       * caso.
       * Neste caso, vamos apenas desabilitar o botao. No Template de LancamentosPesquisa, 
       * no botao de Excluir, vamos colocar, fazer um property-binding na propriedade
       * disabled. Ver lancamentos-pesquisa.component.html
       */
       if (errorResponse.status === 403) {
         msg = 'Voce nao tem permissao para executar esta acao.';
       }
      /**
      try {
       errors = errorResponse.json();
       msg = errors[0].mensagemUsuario;
      } catch (e) { }
      **/
     try {
      msg = errorResponse.error[0].mensagemUsuario;      
     } catch (e) { }     
      console.error('Ocorreu um erro', errorResponse);     
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }
    /** this.toasty.error(msg); **/
    this.messageService.add( { severity : 'error', detail : msg } );
    
    
  }

}
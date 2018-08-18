import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

/**
 * Quando a gente criar uma Guarda, a gente tem que fornece-la como Servico.
 * Entao, na Classe SegurancaModule (seguranca.module.ts), adicionar, na Secao Providers,
 * AuthGuard, para termos acesso a essa Guarda.
 * 
 * Podemos fazer varias coisas usando Guardas e uma das coisas que a gente usa bastante,
 * que eh o proposito desta aula, eh a gente nao deixar que a navegacao aconteca quando 
 * o Usuario nao tem a Permissao adequada, necessaria para acessar determinada URL,
 * simplesmente para melhorar a usabilidade do Sistema, porque a nossa API ja esta segura,
 * 
 */

@Injectable()
/** Implementa a interface CanActivate, que eh o tipo de Guarda que a gente vai usar.
 * Uma Guarda retorna que controla o comportamento.
 * Se retornar true, como se esta vendo, o padrao eh true, retornar true,
 * o processo de navegacao continua. 
 * Se retornar false, vai parar a navegacao.
 * Ou seja:
 * Nos criamos a nossa Guarda de Rotas aqui. Como que a gente vai usar essa Guarda 
 * de Rotas?
 * Primeiramente, a gente tem que acessar as nossas rotas (em lancamentos-routing.module.ts),
 * as configuracoes de rotas, e adicionar essa Guarda dessa Rota.
 * Ver lancamentos-routing.module.ts.
 */
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      /** Vamos verificar de forma dinamica se pode ou nao continuar a navegacao.
       * A gente recebe, no metodo canActivate(), o parametro state. Esse parametro tem
       * a propriedade url.
       * 
       * O if() a seguir eh somente um teste.
       * Estando em /lancamentos, ao clicar no botao Novo Lancamento, nao consegue
       * navegar para o /lancamentos/novo, porque a nossa Guarda esta barrando, nao  
       * esta deixando a navegacao continuar.
       * 
      */
//     if (state.url === '/lancamentos/novo') {
//        return false;
//     }

      /** Primeiramente, como que sabemos quais Permissoes sao necessarias para 
       * determinadas URLs? Nao temos essa informacao ainda aqui na nossa Aplicacao.
       * Entao, vamos adicionar isso agora na configuracao de Rotas. Ver em
       * lancamentos-routing.module.ts.
       * 
       * Agora que, em lancamentos-routing.module.ts, vinculamos a cada rota qual que eh 
       * a permissao necessaria para acessar a Rota, aqui na nossa Guarda, verificamos,
       * como o parametro next, que representa a proxima Rota que estamos indo,
       * next.data, ou seja, os dados de permissoes da propriedade data
       * em lancamentos-routing.module.ts,
       * next.data.roles, ou seja a propriedade roles criada em lancamentos-routing.module.ts,
       * se existe, se a propriedade existe, primeiramente.
       * Se ela existir, vamos verificar se, com o AuthService, se a permissao existe para o
       * Usuario que esta logado neste momento.
       * 
       * Vamos criar mais um metodo em AuthService chamado temQualquerPermissao(), recebendo,
       * como parametro, roles. Ver auth.service.ts.
       * 
       * Voltando para ca, vamos injetar o Servico AuthService no Construtor.
       * 
       * Dessas Roles que estao associadas com a Rota, o Usuario atual tem, pelo menos, 
       * uma delas?
       * Se tiver qualquer uma delas, vamos deixar o acesso continuar. Caso contrario, nao.
       */

    /**
     * Aula Tratando de Acessos de Usuarios Deslogados na AuthGuard

     * Quando a gente tenta fazer uma Requisicao na nossa API RESTful e o Access Token esta 
     * invalido, a gente ja implementou a criacao de um novo Access Token usando Refresh Token
     * em uma aula anterior.

     * Mas tem uma situacao onde, quando a gente nao tem nem o Refresh Token nem o Access
     * Token, por exemplo, ao fazer Ctrl+Shift+Del para Limpar os dados do Navegador, 
     * se tentarmos acessar /lancamentos, por exemplo, o Usuario deveria ser redirecionado 
     * para a Pagina de Login, o ideal pela usabilidade do Sistema, mas, da forma que nos 
     * programamos, nao eh isso que deveria acontece, eh exibir a Pagina de Acesso Negado. 
     * Nao eh muito legal, porque, se nao tem nem Refresh Token nem Access Token, o 
     * Sistema deveria redirecionar o Usuario para a Pagina de Login.

     * Eh isso que vamos fazer nesta aula, esse pequeno ajuste para redirecionar para a 
     * Pagina de Login. No AuthGuard, a gente ja tem uma verificacao, que eh exatamente 
     * ela que esta sendo avaliada: quando o Usuario nao tem nenhuma permissao, ele eh 
     * redirecionado para a Pagina de nao-autorizado.

     * O que a gente vai fazer eh definir um outro if(), adicionando a condicao
     * this.auth.isAccessTokenInvalido()
     * 
     *  **/
    if (this.auth.isAccessTokenInvalido()) {
      console.log('Navegacao com Access Token invalido. Obtendo novo token...');
      /** Vamos tentar obter um novo Access Token. */
      return this.auth.obterNovoAccessToken()
        .then(() => {
          /** Vamos tentar obter o novo Access Token, mas, se foi criado o Access Token,
           * retorna true e continua a Navegacao, 
           * caso contrario, retorna false, nao continua a Navegacao.
           * Entao, fazemos uma outra checagem: isAccessTokenInvalido?, porque, depois
           * que obtivemos o novo Access Token, nos verificamos: esta invalido?
           * Se ainda estiver invalido, eh porque ele nao foi criado de verdade, entao
           * retornamos false.
           * Mas nao queremos somente interromper a navegacao neste caso, nos queremos
           * tambem que o Usuario va para a Pagina de Login. Entao, vamos usar o Router.
           * 
           */
          if (this.auth.isAccessTokenInvalido()) {
            this.router.navigate(["/login"]);
            return false;
          }
          return true;
        });
    } else if (next.data.roles && this.auth.temQualquerPermissao(next.data.roles)) {
      return true;
    }
    /** 
     * Caso, por exemplo, o Usuario clicar em um botao, como Novo Lancamento e nao direcionar
     * para a tela porque nao tem Permissao, o comportamento do Sistema vai ficar estranho,
     * porque o Usuario clica no botao e nao acontece nada. Sendo assim, o Usuario sera
     * redirecionado para o Template NaoAutorizado. Para fazer isso, eh necessario injetar
     * nesta Classe o Router. */
    this.router.navigate(["/nao-autorizado"]);
    return false;
  }
}

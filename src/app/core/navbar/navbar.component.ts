import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** import { AuthHttp } from 'angular2-jwt'; **/

import { AuthService } from '../../seguranca/auth.service';
import { LogoutService } from '../../seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /** Metodo Provisorio, somente para testar a implementacao do metodo obterNovoAccessToken()
   * Quando clicar no botao 'Novo Access Token', vai chamar o metodo criarNovoAccessToken(),
   * que vai chamar o metodo obterNovoAccessToken(), que vai fazer um POST na nossa API, passando
   * o grant_type=refresh_token. No Cookie, a gente nao faz isso, o proprio Navegador, quando a gente
   * chama o POST, ja vai incluir o Cookie para a gente, automaticamente. E, nesse Cookie, tem o Refresh
   * Token, por que tem esse Refresh Token? Porque, quando a gente fez Login, esse Cookie voltou, ele
   * veio para a gente e o Navegador armazenou. Agora, na ida, o Navegador, automaticamente ja coloca-o
   * tambem. E, entao, nos vamos armazenar o novo Access Token, substituindo o velho pelo novo Access
   * Token.
   * 
   * Ao clicar no botao, ocorreu o erro 401 Nao-Autorizado:
   * invalid_token, Cannot convert access token to JSON.
   * Tem um problema que temos que resolver. Como nos estamos fazendo uma chamada Cross-Site, que eh
   * quando o protocolo ou o dominio ou a porta eh diferente da origem, o Navegador faz uma Requisicao
   * e o Navegador nao armazena o Cookie e nao envia o Cookie quando fazemos uma Requisicao Cross-Site.
   * A nao ser que a gente passe um parametro nessas duas Requisicoes: withCredentials.
   * 
   * Essa propriedade withCredentials eh uma propriedade que indica quando uma Requisicao Cross-Site,
   * ou seja, com Protoco/Dominio/Porta diferente da Origem, deve enviar e receber as Credenciais, 
   * como, por exemplo, os Cookies.
   * Como nos estamos fazendo uma Requisicao Cross-Site, porque a API esta em uma porta diferente,
   * o Cookie com Refresh Token, esta sendo ignorado pelo Navegador. Entao, nos precisamos do Refresh
   * Token para criar um novo Access Token, por isso a gente atribui true para a propriedade 
   * withCredentials para o Cookie nao ser ignorado.
   * 
   * Entao, vamos fazer Login novamente, porque, quando fazemos Login, a gente faz um POST, passando
   * withCredentials true, ai sim que vai armazenar o Cookie.
   * 
   * (Cross-site: fazer Requisicao de um Protocolo/Dominio/Porta em algo que muda, algo diferente disso.)
   * 
   * 
   */
  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }

  /** Vamos, primeiramente, injetar LogoutService. 
   * No metodo logout(), vamos chamar logoutService.logout().
  */
  logout() {
    this.logoutService.logout()
    /** No then(), vamos redirecionar o Usuario para a Pagina de Login,
     * porque, se ele esta fazendo Logout, para onde tem que redireciona-lo?
     * 
     * Feito isso, vamos no Template NavbarComponete e, na ancora
     * de logout, nos definimos um event-binding. Ver navbar.component.html.
     */
      .then(() => {
        this.router.navigate(["/login"]);
      })
      /** Vamos fazer o catch tambem. Para fazer o catch, temos que injetar
       *  o ErrorHandlerService. */
      .catch(erro => this.errorHandler.handle(erro));
  }

}

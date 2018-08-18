import { Injectable } from '@angular/core';

/** import { AuthHttp } from 'angular2-jwt'; **/

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { MoneyHttp } from './money-http';

/**
 * Aula 25.09. Usando a Classe MoneyHttp
 * 
 * 65. Agora que a gente ja configurou o JWT, que a gente alterou a nossa Classe MoneyHttp, 
  * vamos passar aqui pelos nossos arquivos, pelas nossas classes para que a gente utilize a nossa classe 
  * MoneyHttp ao inves da classe AuthHttp e, tambem, para que a gente remova todas as classes do modulo 
  * angular/http e passe a utilizar somente as classes do modulo angular/com/http.
  * 
  * 66. Remover o import, import { AuthHttp } from 'angular2-jwt';.
  * 
  * 67. Substituir, no Construtor, AuthHttp por MoneyHttp.
  * 
  * 68. Agora, podemos fazer um teste.
  * 
  * 69. Importar HttpClientModule em core.module.ts,
  * import { HttpClientModule } from '@angular/common/http';
  * Ver core.module.ts.
 */

@Injectable()
export class LogoutService {

  /** Aqui em cima vamos tambem criar a variavel tokensRevokeUrl. */
  /** tokensRevokeUrl = "http://localhost:8080/tokens/revoke"; **/
  tokensRevokeUrl: string;

  /** Aqui vamos injetar o AuthHttp. No final das contas, vai vir aqui um MoneyHttp,
   * como ja visto em aula anterior.
   * Vamos injetar tambem AuthService.
   * E, agora, vamos criar o metodo logout.
   */
  constructor(
    /** private http: AuthHttp, **/
    private http: MoneyHttp,
    private auth: AuthService
  ) {
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
   }

  /** Na Funcao logout(), basta a gente usar o Servico Http. E a gente vai chamar usando 
   * o metodo delete(), pois eh a forma que a gente tem a nossa API implementada.
   */
  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        /** Se a chamada a delete() for executada com sucesso, vamos chamar 
         * this.auth.limparAccessToken().
         * 
         * Ou seja, chamamos a URL na nossa API, dando tudo certo, chama o metodo
         * limparAccessToken(). Dessa forma, essa Requisicao ja vai retornar 
         * limpando o nosso Refresh Token e, logo em seguida, a gente limpa o 
         * nosso Access Token que a gente tem na nossa Aplicacao no Local Storage
         * e a gente agora, passa a nao ter nenhum desses dois tokens. Entao, a gente
         * esta totalmente deslogando o Usuario.
         * 
         * Agora, eh necessario adicionar, em SegurancaModule, o LogoutService
         * na Secao Providers.
         * 
         * Agora, basta chamar este metodo la no nosso Template Navbar. Entao,
         * vamos criar um metodo no Componente NavbarComponent chamado logout.
         * Ver navbar.component.ts.
         */
        this.auth.limparAccessToken();
      });
  }

}

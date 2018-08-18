import { Injectable } from '@angular/core';
/** import { Http, Headers } from '@angular/http'; **/
import { HttpClient, HttpHeaders } from '@angular/common/http';

/** Adicionar o Operador toPromise() */
import 'rxjs/add/operator/toPromise';
/** import { JwtHelper } from 'angular2-jwt'; **/
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

/**
 * Aula 25.09. Usando a Classe MoneyHttp
 * 
 * 54. Agora que a gente ja configurou o JWT, que a gente alterou a nossa Classe MoneyHttp, 
  * vamos passar aqui pelos nossos arquivos, pelas nossas classes para que a gente utilize a nossa classe 
  * MoneyHttp ao inves da classe AuthHttp e, tambem, para que a gente remova todas as classes do modulo 
  * angular/http e passe a utilizar somente as classes do modulo angular/com/http.
  * 
  * 55. Remover o import, import { JwtHelper } from 'angular2-jwt';. Ao inves disso, definir,
  * import { JwtHelperService } from '@auth0/angular-jwt';
  * Os metodos de JwtHelperService sao os mesmos que os metodos de JwtHelper.
  * 
  * 56. No Construtor, corrigir JwtHelper por JwtHelperService.
  * 
  * 57. No Construtor, o Http vai ser alterado para importar do pacote 'common' e a Classe a ser importada eh HttpClient. A classe
  * Headers tambem vai ser substituida pela Classe HttpHeaders.
  * import { HttpClient, HttpHeaders } from '@angular/common/http'
  * 
  * 58. Por que nao sera injetado a MoneyHttp no Construtor? Porque a MoneyHttp tem aquele metodo fazerRequisicao() que, como 
  * explicado, server para renovarmos o Token automaticamente. So que esta classe, AuthService, eh, justamente, a Classe que renova 
  * o Token automaticamente. Entao, nao precisamos interceptar as chamadas AJAX que esta classe faz. Ate porque, se utilizassemos 
  * MoneyHttp no Construtor, ia dar referencia ciclica. Entao, o nosso Projeto nem ia se resolver. Entao, iremos injetar HttpClient
  * diretamente, ao inves de utilizar MoneyHttp.
  * 
  * 59. Agora, vamos corrigir a Classe Headers para HttpHeaders no metodo login(). Pode-se invocar .append() da mesma forma que
  * utilizado para a Classe HttpParams,
  * const headers = new HttpHeaders()
  *     .append()
  *     .append();
  * 
  * 60. Na chamada do metodo armazenarToken(), nao eh necessario a chamada para o metodo .json(). Entao, fica como,
  *       this.armazenarToken(response.access_token);
  * , definindo o tipo de retorno como <any> para o metodo post(), para corrigir o erro com o tipo de retorno que surge, pois response
  * invoca o atributo .access_token e da erro dizendo que esse atributo nao existe para o retorno Object. Retornando um tipo <any>,
  * esse atributo passa a valer para o tipo de retorno, <any>.
  * 
  * 61. Mais abaixo, nao eh necessario definir,
  * const responseJson = response.json();
  * , pois nao eh mais necessario invocar o metodo .json().
  * 
  * 62. Mais abaixo, invoca-se a propriedade .error diretamente de response,
  * if (response.error === 'invalid_grant') {}
  * 
  * 63. Corrigir da mesma forma que os Passos anteriores para o metodo obterNovoAccessToken().
  * 
  * 64. Vamos, agora, corrigir a Classe logout-service.ts.
  * Ver logout-service.ts.
 */
@Injectable()
export class AuthService {

  /** Tipo any, vai ser um objeto JavaScript. */
  jwtPayload: any;

/**
 * Implementando o Servico de Autenticacao com OAuth2

O Servico de Autenticacao  sera chamado quando informarmos email/senha e clicarmos no botao Login.

1. Para implementar, criar uma nova Classe de Servico, chamada Auth, dentro do Modulo Seguranca:

ng g s seguranca/auth --spec=false

2. Adiciona-la ao Provider do Modulo Core para deixar esse Servico disponivel para toda a Aplicacao.

3. Implementar um metodo:
login(usuario: string, senha: string){
}

Esse metodo vai retornar uma Promise<void>.

Para implementar esse metodo, eh necessario, primeiramente, injetar o Servico de Http para a
 gente chamar um POST em http://localhost:8080/oauth/token.

A nossa API disponibilizou para a gente um CLIENTE_ID (i.e., um username) e um SECRET 
(i.e., uma senha) que nos autoriza, sao as credenciais para usarmos a nossa 
Aplicacao Angular para usar a API.
 * 
 * 
 */
  /** oauthTokenUrl = 'http://localhost:8080/oauth/token'; **/
  oauthTokenUrl: string;

  constructor(
    /** private http: Http, **/
    private http: HttpClient,
    /** private jwtHelper: JwtHelper **/
    private jwtHelper: JwtHelperService
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
   }

  login(usuario: string, senha: string): Promise<void> {
    /** const headers = new Headers(); **/
    const headers = new HttpHeaders()
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    /** YW5ndWxhcjpAbmd1bEByMA== significa encodar o CLIENTE_ID:SECRET em Base64:
        www.base64encode.org
        angular:@ngul@r0
    */
    /** headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    /** Quando especifica para ser enviado no Corpo da Requisicao POST uma 
     * QueryString (o nome do parametro e o valor, separando por &),
     * quando envia no formato QueryString um POST, com o Corpo no formato QueryString,
     * eh necessario especificar, porque a API precisa saber qual eh o formato que 
     * esta sendo enviado esse Corpo da Requisicao.
     * Entao, eh necessario definir no Headers mais um cabecalho, o Content-Type. 
     * Quando define o Contenty-Type como application/x-www-form-urlencoded, o Corpo da mensagem
     * HTTP eh enviado ao Servidor, basicamente, como uma string grande.*    
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); */

    /** return this.http.post(this.oauthTokenUrl, body, **/
    return this.http.post<any>(this.oauthTokenUrl, body,       
      { headers, withCredentials: true })

    /**
     * Nos ja estamos conseguindo fazer autenticacao de usuario/senha na nossa API e receber, 
     * como resposta, o token JWT.
       Nesta aula, a gente vai fazer a decodificacao desse token e tambem armazena-lo no Navegador, 
       mais especificamente, no Local Storage do Navegador.

       1. Para decodificar o JWT, a gente vai precisar de uma biblioteca chamada
        angular2-jwt:

        npm install angular2-jwt --save
     * 
     * 2. Para a gente usar a Classe Utilitaria para decodificar o token, 
     * nos vamos primeiramente adiciona-na para fornece-la como Servico: JwtHelper, no CoreModule (na
     * Secao Providers).
     * 
     * 3. Injetar JwtHelper no Construtor.
     * 
     * 4. Onde colocar os dados de Payload do que for decodificado do JWT? Payload eh um objeto JSON com 
     * algumas propriedades. Os dados da Secao de Payload do JWT retornado podem ser verificados em 
     * http://jwt.io, Secao Decoded.
     * A gente quer decodificar e armazenar o Payload em uma propriedade da nossa Classe AuthService.
     * Criar uma propriedade chamada jwtPayload.
     * 
     * 5. Implementar uma funcao chamada armazenarToken, que vai receber, como parametro, um token
     * do tipo string. Vamos atribuir ao atributo jwtPayload o que a gente decodificar.
     * Quem vai chamar esse metodo? Vai ser chamado no then() para a Promessa, quando a gente faz
     * um POST na URL /oauth/token.
     * 
     * 6. Caso recarregar a pagina, o Payload eh perdido. Ao dar um Refresh, a Aplicacao eh 
     * reiniciada. Ao reiniciar uma Aplicacao Angular, temos uma nova instancia da Classe
     * AuthService e a propriedade jwtPayload estah nula.
     * Queremos que, ao Usuario recarregar a Pagina, que a gente continue tendo esse token e tambem 
     * o Payload decodificado, porque o Usuario pode recarregar as paginas do Sistema e nao queremos
     * que ele perca o Login.
     * Como fazer? Alem de decodificar o Payload, vamos armazenar o token no LocalStorage do Navegador.
     * 
     * 7. A gente nao precisa armazenar o Payload no Local Storage, mas a gente tem que decofica-lo
     * toda vez que o AuthService for construido. Entao, vamos implementar um novo metodo carregarToken
     * e esse metodo vai pegar o token do Local Storage e vai chamar o metodo armazenarToken, passando
     * esse token. Esse metodo carregarToken sera chamado no Construtor.
     * 
     */
    
      /** Transforma em uma Promessa */
      .toPromise()
      .then(response => {
        /** console.log(response); **/
        /** Para acessar um atributo do JSON retornado: */
        /** this.armazenarToken(response.json().access_token) **/
        this.armazenarToken(response.access_token);
      })
      .catch(response => {
        /** console.log(response); **/
        /** 
         * Nesta aula, vamos tratar os casos de erro e o caso de sucesso de Autenticacao.

         * Quando o Usuario informa usuario/senha invalidos, o retorno HTTP eh 400 - Bad Request e,
         *  alem do Codigo HTTP 400, vem um objeto com duas propriedades: 
         * error com o valor 'invalid_grant'  e error_description.

         * Entao, se o Codigo de retorno da nossa Requisicao for 400 e tiver a propriedade 
         * error: 'invalid_grant', quer dizer que Usuario ou Senha esta invalido e podemos mostrar 
         * uma mensagem mais amigavel ao Usuario.

         * Para fazer isso, vamos comecar a implementacao na Classe AuthService, no catch(),
         * mais especificamente.
         * 
         * **/        
        /** 1. Verificar se o status da resposta (Codigo HTTP) for 400 */
        if (response.status === 400) {
          /** const responseJson = response.json(); **/
          /** Verificar se a propriedade error for igual a 'invalid_grant' */
          /** if (responseJson.error === 'invalid_grant') { **/
          if (response.error === 'invalid_grant') {
            /** Se for, retornar um objeto de Promessa rejeitado */
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        /** Senao, um objeto de Promessa rejeitada, passando a propria response, que nao sei
         * o que eh, entao pego a Resposta e repasso-a dentro dessa Promessa rejeitada.
         */
        return Promise.reject(response);
      });
  }

  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    /** localStorage eh uma propriedade implicita do Angular. */
    /** Armazenar o token no LocalStorage do Navegador. */
    /** Adicionar um item ao LocalStorage e chama a chave dele de token. */
    /** A propriedade localStorage permite que a gente acesse um objeto de armazenamento (localStorage)
     * que guarda os dados no Navegador do Usuario.
     * O token vai ser armazenado no Navegador do Usuario. Esses dados armazenados no Local Storage nao
     * tem data de expiracao. Vao ficar ali mesmo se o Usuario fizer um Refresh na pagina do Navegador.
     */
    localStorage.setItem('token', token);
  }

  carregarToken() {
    /*** Pegar token do Local Storage  */
    const token = localStorage.getItem('token');
    /** Verificar se existe, porque posso nao ter nenhum token no Local Storage. */
    if (token) {
      /** Chama o metodo armazenarToken, passando o token, para decodificar o Payload. */
      this.armazenarToken(token);
    }
  }

  /**
   * Exibindo o Menu do Sistema conforme Permissoes do Usuario

   * As opcoes no Menu estao sempre sendo exibidas, mas, alguns Usuarios podem nao ter Permissao 
   * para acessar algum Menu e pode nao fazer sentido a gente exibir um Menu que aquele 
   * Usuario nao vai conseguir utilizar.

   * Por exemplo, agora fiz o login com Usuario Maria e, antes de fazer o Login, movi a 
   * Permissao de Pesquisa de Pessoas, ou seja, Maria, agora, nao pode fazer uma Pesquisa de Pessoas, 
   * apenas uma Pesquisa de Lancamentos.

   * Nao faz sentido, entao, esse Usuario Maria conseguir clicar nesse opcao (link) Pessoas. 
   * Nao tem nenhum problema aqui de Seguranca, porque a API esta segura, entao a API ja retorna para a 
   * gente um erro falando que o Acesso esta negado (Codigo HTTP 403).

   * Porem, em termos de Usabilidade, nos temos um problema, porque a gente esta mostrando uma opcao para 
   * a Maria, sendo que ela nao pode usar essa opcao. 

   * Entao, nesta aula nos vamos esconde as opcoes no Menu quando o Usuario nao puder acessar 
   * essa opcao.

   * 1. Comecamos na Classe AuthService. Nos vamos implementar um metodo temPermissao(), onde vamos 
   * perguntar ao metodo se o Usuario Logado tem permissao, qual a Permissao?
   * 
   * 2. Agora, no Template HTML do NavbarComponent, navbar.component.html, vamos definir uma diretiva
   * ngIf para as opcoes de Lancamentos e Pessoas, chamando o metodo temPermissao().
   * 
   */
  temPermissao(permissao: string) {
    /** Verificar se o jwtPayload existe, se tem alguma coisa nele e tambem
     * se, no jwtPayload.authorities (verificar token no http://jwt.io: lista de todas as Roles, 
     * as Permissoes que o Usuario possui), se dentro do array de authorities, a gente tem a Permissao
     * que a gente esta buscando, que a gente recebeu como parametro neste metodo.
     */
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  /** Vai ser passado um array de Permissoes e queremos saber se o Usuario Logado
   * atualmente tem, pelo menos, uma dessas permissoes.
   * Para tanto, vamos fazer um for().
   */
  temQualquerPermissao(roles) {
    /** Vamos iterar em todas as Permissoes.
     * Vamos verificar, chamando o metodo temPermissao(), se, para cada Permissao,
     * se o Usuario que esta logado atualmente tem a permissao.
     * Se tiver, pelo menos uma Permissao, ja retorna true.
     */
    for(const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Obtendo um novo Access Token

   * Nesta aula, nos vamos estudar como obter um novo Access Token quando ele expirar. 
   * E, para isso, configuramos o Back-End para definir uma expiracao no Access Token muito 
   * rapida: 5 segundos apenas. Claro que, em Producao, nao vai se deixar expirar apenas em 
   * 5 segundos. Mas definimos assim apenas para testarmos de maneira mais rapida.

   * Ao dar 5 segundos, aparece o erro: No JWT present or has expired.

   * Neste caso, nos temos o Access Token, mas ele expirou. A partir do momento que o token expirou, 
   * nao conseguimos navegar em nada no nosso Sistema.

   * Assim sendo, nos precisamos, agora, criar um novo Access Token. E, para criar um novo Access Token, 
   * nos precisamos do Refresh Token. O Refresh Token fica no Cookie, a gente tem que fazer um POST 
   * em uma URL da nossa API, passando esse Cookie, na verdade isso o proprio Navegador ja 
   * faz automaticamente e a API vai retornar esse novo Access Token se esse Refresh Token, claro, 
   * que a gente esta passando no Cookie para a nossa API, for valido, se nao estiver expirado tambem, 
   * porque ele tem um prazo de expiracao, que, geralmente, eh maior. Mas, se estiver tudo ok com o 
   * Refresh Token, a nossa API vai retornar um Access Token novo para a gente com uma nova data de 
   * expiracao, uma nova hora de expiracao, que, no caso, o nosso vai ser mais 5 segundos. Entao, 
   * toda vez que expirar, a gente vai ter mais um novo Access Token de mais 5 segundos.

   * Vamos comecar a implementar na nossa Classe AuthService. Vamos adicionar mais um 
   * metodo: obterNovoAccessToken(), que vai retornar uma Promise<void>.

   * Vamos fazer uma chamada no nosso Servico de Http, fazendo POST. Post onde? 
   * Em oauthTokenUrl.
   * 
   * Em que momento vamos chamar o metodo obterNovoAccessToken?
   * No momento que o Access Token estiver expirado. Por enquanto, nos vamos criar um botao
   * na tela (Template HTML do NavbarComponent) para o Usuario, quando der o erro de token
   * expirado, o Usuario pode clicar no botao para renovar o Access Token e vai 
   * continuar funcionando. Depois, em uma aula seguinte, nos vamos fazer isso de 
   * forma automatica e sera removido o botao.
   * 
   */
  obterNovoAccessToken(): Promise<void> {
    /** const headers = new Headers(); **/
    const headers = new HttpHeaders()
          .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
          .append('Content-Type', 'application/x-www-form-urlencoded');
    /** const body = `username=${usuario}&password=${senha}&grant_type=password`; */
    /** Quando a gente fez o login, a gente passou o grant_type=passord,
     * passando Usuario e Senha. Agora, a gente vai passar o grant_type=refresh_token e,
     * entao, a API ja vai entender que a gente esta passando o refresh_token e a gente quer,
     * na verdade, um novo Access Token. A gente nao passa o Usuario e Senha nesse POST.
     * A gente nem tem o Usuario e Senha que o Usuario digitou, porque, quando o Usuario 
     * digitou Usuario e Senha, na Pagina de Login, a gente usou para gerar o Access Token
     * e tambem gerou o Refresh Token. Nos nao armazenamos o Usuario e Senha, nos nao armazenamos
     * Usuario e Senha na nossa Aplicacao. 
     * 
     */
    const body = 'grant_type=refresh_token';
    /** headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');**/
    return this.http.post<any>(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        /** Se foi gerado e a gente passou o Refresh Token e recebeu um Access Token de
         * volta, o que que tem que fazer?
         * Temos que armazenar o token.
         */
        /** this.armazenarToken(response.json().access_token); **/
        this.armazenarToken(response.access_token);
        console.log('Novo Access Token criado!');
        return Promise.resolve(null);
        
      })
      .catch(response => {
        /** Colocar tambem na Console qual que eh a resposta desse erro. */
        console.log('Erro ao renovar token', response);
        /** Nao vai chamar reject(), vai chamar resolve(), porque, se nao renovar
         * o token, a gente nao tem muito o que tratar, nao tem muito o que fazer.
         * Eh uma tentativa, eu quero renovar, criar um novo Access Token, se der alguma coisa de
         * errado, tudo bem, depois a gente vai tratar isso, porque, se der alguma coisa errada
         * na hora de criar um novo Access Token, passando o Refresh Token, nao tem muito o que
         * fazer, o Usuario vai ter que fazer Login.
         */
        return Promise.resolve(null);
      });
  }

  /**
   * Nesta aula, vamos fazer a criacao de um novo Access Token de forma automatica, 
   * transparente para o Usuario.

   * 1. Vamos comecar criando um metodo no Servico AuthService: isAccessTokenInvalido()
   * Quero saber se o Access Token esta valido ou nao, se ja expirou ou nao. 
   * 
   * 2. Vamos criar um novo arquivo no modulo seguranca: money-http.ts
   * 
   */
  isAccessTokenInvalido() {
    /** criar uma variavel token, pegando o token do Local Storage */
    const token = localStorage.getItem('token');
    /** verificar se nao tem nada no token. se nao tem, esta invalido OU
     * usa o jwtHelper, verificando, usando o metodo isTokenExpired e passando o 
     * token como parametro, se o token estiver expirado.
     */
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  /**
   * Aula Implementando o Logout

   * Nesta aula, nos vamos implementar a funcionalidade de Logout, a opcao Logout do Menu. 
   * Vamos entender, primeiramente, o que eh o Logout nesta Aplicacao. A gente precisa lembrar
   *  que o nosso Back-End eh stateless, ele nao guarda nenhum estado de quais usuarios estao 
   * logados naquele momento. A gente tem tokens que a gente passa para a nossa API para a 
   * gente dizer que nos somos nos mesmos. Quais sao esses tokens? A gente tem o Access Token 
   * e o Refresh Token. O que a gente precisa fazer eh eliminar o Access Token do nosso 
   * Navegador, a gente esta colocando no Local Storage, entao tem que elimina-lo e tambem tem 
   * que apagar o Cookie onde fica o Refresh Token. A gente vai fazer isso nesta aula, entao, 
   * para a gente fazer o Logout.

   * Quando a gente nao tem o Access Token, a gente nao consegue acessar a API, mas a gente
   * tem o Refresh Token, que, a partir do Refresh Token, a gente pode gerar um novo Access
   * Token. Mas, se a gente nao tiver Refresh Token tambem, a gente nao vai conseguir gerar 
   * um novo Access Token, entao ai sim o Usuario esta 100% deslogado quando a gente nao tem 
   * esses dois tokens.

   * Primeiramente, em AuthService, nos vamos implementar um metodo chamado 
   * limparAccessToken().
   * 
   * O que seria esse limparAccessToken()? 
   * Pegar o Local Storage e chamar o metodo removeItem(), passando 'token',
   * porque, quando a gente adiciona um Access Token, a gente adiciona no 
   * Local Storage.
   * O metodo armazenarToken() coloca o token dentro do Local Storage, chamando-o
   * de token.
   * Agora, no limparAccessToken(), estamos apenas removendo esse item la do 
   * Local Storage.
   * Vamos tambem definir essa variavel de instancia jwtPayload como nula para a 
   * gente tirar o objeto que tem dentro de jwtPayload.
   * Dessa forma, a gente ja elimina o Access Token da nossa Aplicacao, que eh
   * justamente onde ele fica armazenado.
   * Mas, se a gente, na opcao de Logout, apenas chamar a funcao limparAccessToken(),
   * a nossa Aplicacao ainda vai criar um novo Access Token, porque a gente tem o 
   * Refresh Token. Entao, a gente precisa tambem limpar o Refresh Token. Mas nos
   * nao temos acesso ao Cookie do Refresh Token. Nos vamos ter que fazer uma chamada
   * na nossa API, que esssa chamada vai retornar um Cookie Refresh Token vazio, ou seja,
   * vai limpar o nosso Cookie Refresh Token. Nos vamos fazer uma chamada apenas para isso.
   * E essa chamada eh no caminho /tokens/revoke.
   * 
   * Um detalhe eh que a nossa API foi implementada para, quando nos chamarmos /tokens/revoke,
   * a gente tem que passar um Access Token valido para essa Requisicao funcionar.
   * 
   * Entao, para nos passarmos um Access Token, a gente sabe, se a gente olhar em algum 
   * exemplo, por exemplo em LancamentoService (lancamento.service.ts), nos estamos
   * usando o AuthHttp, que eh do angular2-jwt, o qual esta sendo interceptado 
   * utilizando-se o MoneyHttp, porque o AuthHttp ja adiciona, no cabecalho da Requisicao,
   * o Access Token. 
   * 
   * Nos nao vamos implementar o metodo para chamar /tokens/revoke dentro do 
   * AuthService porque aqui a gente injeta apenas o objeto do tipo Http. Entao,
   * nos vamos criar um novo Servico, chamado de LogoutService.
   * 
   * ng g s seguranca/logout --spec=false
   * 
   * Estamos fazendo isso so porque nos vamos injetar o AuthHttp e nao apenas o Http.
   * Ver lotout.service.ts.
   */
  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }
}

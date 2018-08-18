import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
/** import { AuthHttp } from 'angular2-jwt'; **/
import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';

/**
  * Aula 25.09. Usando a Classe MoneyHttp
  *
  * Agora que a gente ja configurou o JWT, que a gente alterou a nossa Classe MoneyHttp, 
  * vamos passar aqui pelos nossos arquivos, pelas nossas classes para que a gente utilize a nossa classe 
  * MoneyHttp ao inves da classe AuthHttp e, tambem, para que a gente remova todas as classes do modulo 
  * angular/http e passe a utilizar somente as classes do modulo angular/com/http. 
  *
  * Entao, vamos em src/app, comecando por categorias, geralmente serao as nossas classes de Servico.
  *
  * 1. Vamos em categoria-service.ts. Vejamos o problema, o erro de import, remover o import,
  * import { AuthHttp } from 'angular2-jwt';
  *
  * 2. No Construtor, iremos substituir AuthHttp por MoneyHttp.
  *
  * 3. No modulo httpclientmodule e utilizando a Classe HttpClient, que eh a classe cuja nossa classe 
  * MoneyHttp estende, a gente nao precisa mais chamar o metodo json(), a resposta ja vai ser o nosso JSON,
  * Entao, na chamada do metodo get, na chamada ao metodo then(),
  * return this.http.get(this.categoriasUrl)
      .toPromise()
      .then(response => response.json());
  *
  * pode ficar definido, simplesmente, como,
  *   .then(responose => response);
  * 
  * 4. E, como aqui,
  * .then(responose => response);
  * 
  * , depois de termos removido a chamada ao metodo json(), response nao esta fazendo nada, podemos, simplesmente,
  * remover a chamada ao metodo then() e deixar somente a chamada ao metodo toPromise(),
  * return this.http.get(this.categoriasUrl)
      .toPromise();
  *
  * 5. Okay, a Classe categoria.service.ts ja foi ajustada.
  * Vamos, agora, para a classe core-module.ts. Ver core-module.ts.
 */

@Injectable()
export class CategoriaService {

  /** categoriasUrl = "http://localhost:8080/categorias"; **/
  categoriasUrl: string;


  /** constructor(private http: Http) { } */
  /**
   * No Construtor, vamos atribuir essa variavel de instancia categoriasUrl
   * com a URL correta sem deixar hardcoded em nosso codigo o protocolo,
   * porta e dominio. Por isso, vamos apagar a atribuicao hardcoded e
   * definir a variavel categoriasUrl como string.
   */
  /** constructor(private http: AuthHttp) { **/
  constructor(private http: MoneyHttp) {    
    /** Vamos importar environmet (environment.ts)
     * /categorias pode ficar hardcoded, porque nao muda,
     * o que pode mudar eh protocolo, porta e dominio.
     * 
     * Agora que aqui esta feito, vamos ajustar tambem para todos os outros Servicos.
     */
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

  listarTodas(): Promise<any> {
    /**
    const headers = new Headers();
    headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");
    */
    /** return this.http.get(this.categoriasUrl, { headers: headers }) */
    /**return this.http.get(this.categoriasUrl)
        .toPromise()
        .then(response => response.json());**/
    return this.http.get(this.categoriasUrl)
        .toPromise();
  }

}

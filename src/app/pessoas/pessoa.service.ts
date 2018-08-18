import { Injectable } from '@angular/core';
/** import { Http, Headers, URLSearchParams } from '@angular/http'; **/
/** import { HttpParams, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'; **/
import { HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
/** import { AuthHttp } from 'angular2-jwt'; **/

import { Pessoa, Estado, Cidade } from '../core/model';
import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

/**
 * Aula 25.09. Usando a Classe MoneyHttp
 * 
 * 43. Agora que a gente ja configurou o JWT, que a gente alterou a nossa Classe MoneyHttp, 
  * vamos passar aqui pelos nossos arquivos, pelas nossas classes para que a gente utilize a nossa classe 
  * MoneyHttp ao inves da classe AuthHttp e, tambem, para que a gente remova todas as classes do modulo 
  * angular/http e passe a utilizar somente as classes do modulo angular/com/http.
  * 
  * 44. Remover o import, import { AuthHttp } from 'angular2-jwt';.
  * 
  * 45.  No import de URLSearchParams, corrigir para, ao inves de URLSearchParams, HttpParams
  * import { HttpParams } from '@angular/common/http';
  * 
  * 45. Substituir, no Construtor, AuthHttp por MoneyHttp.
  * 
  * 46. Fazer as mesmas alteracoes que na Classe lancamento.service.ts, da Aula 25.09. Usando a Classe MoneyHttp.
  * 
  * 47. Vamos, agora, para a classe relatorio-sevice.ts.
  * Ver relatorio-service.ts.
 */

@Injectable()
export class PessoaService {

  /** pessoasUrl = "http://localhost:8080/pessoas"; **/
  pessoasUrl: string;
  /**
   * Aula 24.03. Buscando Estados e Cidades

   * Nesta aula aqui, a gente vai os combos de Estados e Cidades. E o combo de Cidade vai ser dependente do combo de Estado. 

   * Na verdade, nesta aula, a gente vai iniciar a construcao dessa funcionalidade. O objetivo, especificamente, desta aula, eh 
   * criar as duas pesquisas: por Estados e por Cidades la no nosso Servico de Pessoas. Vamos criar isso no Servico de Pessoas 
   * mesmo, nao vamos criar um Servico separado para essas duas pesquisas, porque sao somente duas e elas estao totalmente ligadas 
   * com a nossa Tela de Pessoas. 

   * Vamos abrir o VS Code, em pessoas.service.ts.

   * 1. A primeira coisa que faremos eh criar as URLs: cidadesUrl, estadosUrl.
   * 
   * 2. Vamos inicializar o valor dessas variaveis de instancia no Construtor.
   * 
   * 3. Agora, la no final da Classe, nos vamos criar esses dois metodos: um que pesquisa por todos os Estados e outro que pesquisa
   * pelas Cidades baseado no Estado. O que pesquisa os Estados nos vamos chamar de listarEstados(), nao precisa de parametro
   * algum e vai devolver uma Promise com um array de Estados.
   * 
   * 4. Agora, vamos criar a Entidade Estado no nosso model.ts.
   * 
   * 8. Vamos fazer a chamada, agora, dentro do metodo listarEstados(): this.http.get(this.estadosUrl). Em seguida, chamar o metodo 
   * toPromise() e, entao, o metodo then(), passando a arrow function: response => response.json()
   * 
   * 9. Agora, vamos copiar/colar o metodo listarEstados() e renomea-lo para pesquisarCidades(). Ele vai retornar um array de 
   * Cidades e nos vamos precisar, tambem, passar o parametro de codigo do Estado para o metodo de pesquisarCidades():
   * pesquisarCidades(estado): Promise<Cidade[]>
   * 
   * 10. Vamos definir a variavel local params, do tipo URLSearchParams e setar o parametro estado para o cabecalho da Requisicao.
   * 
   * 11. Vamos passar, como segundo parametro da chamada do metodo this.http.get(), um objeto contendo a propriedade search, 
   * definindo, como valor, params.
   * 
   * 12. Por esta aula, eh isto: nos criamos o metodo que vai Listar os Estados e, tambem, o metodo para a gente poder Pesquisar
   * as Cidades de um determinado Estado.
   * Fim da Aula 24.03. Buscando Estados e Cidades.
   *  
   */
  cidadesUrl: string;
  estadosUrl: string;

  /** constructor(private http: Http) { } */
  /** constructor(private http: AuthHttp) { **/
  constructor(private http: MoneyHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    /** const params = new URLSearchParams(); **/
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    /**
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    */
    /** params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString()); **/

    if (filtro.nome) {
      /** params.set('nome', filtro.nome); **/
      params = params.append('nome', filtro.nome);
    }
    /** return this.http.get(`${this.pessoasUrl}`, **/
    return this.http.get<any>(`${this.pessoasUrl}`,
        /** { headers: headers, search: params }) **/
        /** { search: params }) **/
        { params })
        .toPromise()
        .then(response => {
            /** const responseJson = response.json();
            const pessoas = responseJson.content;
            */
            const pessoas = response.content;
            const resultado = {
              pessoas: pessoas,
              /** total: responseJson.totalElements **/
              total: response.totalElements
            };
            return resultado;
        });
  }

  listarTodas(): Promise<any> {
    /**
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    */
    /** return this.http.get(this.pessoasUrl, { headers }) */
    /** return this.http.get(this.pessoasUrl) **/
    return this.http.get<any>(this.pessoasUrl)
        .toPromise()
        /** .then(response => response.json().content); **/
        .then(response => response.content)
  }

  excluir(codigo: number): Promise<void> {
    /**    
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    */
    /** return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers }) */
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
  }

  /**
   * Aula 25.10. Corrigindo o Link de Mudancas de Status

   * Nesta aula aqui, o que a gente vai corrigir eh aquele problema com a invocacao da action 
   * de alterar Status. Entao, a gente vai corrigir esse problema, que, agora, ela nao esta 
   * funcionando. E a gente vai alterar isso aqui a partir da nossa classe de 
   * pessoa-service.ts, no metodo mudarStatus().

   * O que que esta acontecendo? Depois que nos alteramos para HttpClient, que eh a classe que nos estamos utilizando atraves da 
   * Classe MoneyHttp, o que aconteceu eh que, com o o valor que esta sendo passado, no metodo mudarStatus(), o corpo que esta sendo
   * passado eh simplesmente um boolean. O que esse modulo novo esta fazendo agora eh entendendo que isso eh um plain text, ele nao
   * esta mais configurando isso aqui, ou seja, o parametro ativo, como um 'application/json', a gente vai precisar definir isso
   * explicitamente.
   * 
   * Inclusive, a gente poderia corrigir. Isso eh uma correcao que poderia ser feita ate mesmo na API, mas, como foi um problema
   * que foi gerado a partir das alteracoes que a gente fez aqui no Front-end, entao a gente vai acabar resolvendo por dar a solucao
   * aqui no metodo mudarStatus() da classe pessoa.service.ts.
   * 
   * 1. Para corrigirmos isso, vamos definir,
   * const headers = new HttpHeaders()
   *      .append('Contenty-Type', 'application/json');
   * 
   * 2. Nos vamos passar a constante headers como terceiro parametro na chamada do metodo http.put(), { headers }, em que 
   * o nome da propriedade eh o mesmo que o nome do valor.
   * 
   * 3. Agora, ja podemos testar, http://localhost:4200/pessoas.
   * 
   * 4. Okay, mudamos o Status de Ativo para Inativo, atualizamos a Pagina e continuou o Status como Inativo.
   * 
   * 5. Fim da Aula 25.10. Corrigindo o Link de Mudancas de Status.
   *  
   */
  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');
    /**
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');
    */
    /** return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo ? false : true, { headers: headers }) */
    /** return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo ? false : true) **/
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo ? false : true, { headers })
        .toPromise()
        .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    /**
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');
    */
    /** return this.http.post(this.pessoasUrl, **/
    /**
     * return this.http.post<Pessoa>().toPromise() 
     *      define que vai retornar um Promise de Pessoa.
     */
    return this.http.post<Pessoa>(this.pessoasUrl,
          /** JSON.stringify(pessoa), { headers: headers }) */
          /** JSON.stringify(pessoa)) **/ pessoa)
          .toPromise();
          /** .then(response => response.json()); **/
  }

  buscarUltimoRegistro(): Promise<number> {
    /**
    const headers = new Headers();
    headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");
    */
    /** return this.http.get(`${this.pessoasUrl}?codigo`, { headers }) */
    return this.http.get<number>(`${this.pessoasUrl}?codigo`)
        .toPromise();
        /** .then(response => response.json()); **/
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    /**
    const headers = new Headers();
    headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");
    headers.append("Content-Type", "application/json");
    */
    /** return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,  **/
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`,
      /** JSON.stringify(pessoa), { headers: headers }) */
      /** JSON.stringify(pessoa)) **/ pessoa)
      .toPromise();
      /**.then(response => {
        /** const pessoaJson = response.json() as Pessoa; **
        /** return pessoaJson; **
      });
      */
  }
  
  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    /**
    const headers = new Headers();
    headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");
    */
    /** return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers: headers }) */
    /** return this.http.get(`${this.pessoasUrl}/${codigo}`) **/
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
        .toPromise();
        /**
        .then(response => {
          const pessoaJson = response.json() as Pessoa; 
          return pessoaJson;
        });
        */
  }

  listarEstados(): Promise<Estado[]> {
    /** return this.http.get(this.estadosUrl).toPromise() **/
    return this.http.get<Estado[]>(this.estadosUrl).toPromise();
        /**.then(response => response.json()); **/
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    /** const params = new URLSearchParams(); **/
    /** Aqui vamos fazer de um jeito diferente, podemos continuar deixando como constante, vamos fazer de um jeito diferente aqui
     * so para irmos vendo as formas que a gente pode utilizar aqui essa classe. Entao, instanciamos HttpParams e ja invocamos o metodo
     * append() diretamente. Como o append() devolve um novo objeto, agora com estado, entao vai funcionar da mesma forma.
     */
    const params = new HttpParams()
        .append('estado', estado);
    /** return this.http.get(this.cidadesUrl, { **/
    return this.http.get<Cidade[]>(this.cidadesUrl, {
      /** search: params **/
      params
    }).toPromise();
        /** .then(response => response.json()); **/
  }

}

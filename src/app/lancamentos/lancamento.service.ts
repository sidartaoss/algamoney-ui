/** import { Headers, URLSearchParams } from '@angular/http'; **/
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** Tem que importar o operador para o Promise. */
import 'rxjs/add/operator/toPromise';
/** import { AuthHttp } from 'angular2-jwt'; **/
/** Asterisco significa importar tudo
 * as moment significa apelidando de moment
 */
import * as moment from 'moment';

import { Lancamento } from '../core/model';
import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';

/**
 * Aula 25.09. Usando a Classe MoneyHttp
 * 
 * 24. Agora que a gente ja configurou o JWT, que a gente alterou a nossa Classe MoneyHttp, 
  * vamos passar aqui pelos nossos arquivos, pelas nossas classes para que a gente utilize a nossa classe 
  * MoneyHttp ao inves da classe AuthHttp e, tambem, para que a gente remova todas as classes do modulo 
  * angular/http e passe a utilizar somente as classes do modulo angular/com/http.
  * 
  * 25. Remover o import, import { AuthHttp } from 'angular2-jwt';.
  * 
  * 26. No import de URLSearchParams, corrigir para, ao inves de URLSearchParams, HttpParams
  * import { HttpParams } from '@angular/common/http';
  * 
  * 27. Substituir, no Construtor, AuthHttp por MoneyHttp.
  * 
  * 28. No metodo pesquisar(), substituir URLSearchParams por HttpParams. 
  * 
  * 29. Corrigir para:
  * const params = new HttpParams();
  * params.append();
  * 
  * 30. A forma de configurar eh um pouco diferente, porque nao temos mais o metodo 
  * URLSearchParams.set(). Utilizar, ao inves de set(), o metodo HttpParams.append(). So que, 
  * toda a vez que chamar o metodo append(), ao inves de alterar o objeto corrente, que, 
  * no caso, eh params, o metodo nao modifica a
  * instancia params, ele modifica uma outra instancia, ele cria uma outra instancia, porque
  * a instancia de HttpParams, ao definirmos como constante,
  *
  * const params = new HttpParams(), 
  * 
  * torna-se imutavel. O que devemos fazer? devemos definir a instancia de HttpParams com
  * let, ao inves de const,
  * 
  * let params = new HttpParams();
  * 
  * 31. Ao chamar o metodo .append, o retorno deve ser atribuido para params,
  * 
  * params = params.append(),
  * 
  * para que, realmente, possa adicionar o parametro 'page' e consiga ir incrementando, a cada
  * vez ir adicionando um parametro diferente,
  * 
  * params = params.append('page', filtro.pagina.toString());
  * params = params.append('size', filtro.itensPorPagina.toString());
  * 
  * Eh necessario sempre atribuir o retorno a variavel params, senao nao funciona.
  * 
  * 32. Mas, para essas duas linhas,
  * params = params.append('page', filtro.pagina.toString());
  * params = params.append('size', filtro.itensPorPagina.toString());
  * 
  * , nos podemos fazer da seguinte forma, passando um objeto no construtor de HttpParams,
  * definindo a propriedade fromObject, passando outro objeto como valor, 
  * {}, com as propriedades page, com o valor filtro.pagina.toString()
  * e a propriedade size, com o valor filtro.itensPorPagina.toString()
  *
  * 33. Agora, remover as linhas,
  * params = params.append('page', filtro.pagina.toString());
  * params = params.append('size', filtro.itensPorPagina.toString());
  * 
  * 34. Em     
  * if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    , alterar params.set() para params.append(),
    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    } 
    *
    * 35. Corrigir da mesma forma que o Passo 34 nos outros if's do metodo pesquisar().
    * 
    * 36. Nao eh mais necessario a chamada para o metodo json() no metodo pesquisar(),
    * const responseJson = response; Deve-se, tambem, na chamada do metodo get(), definir
    * que o retorno eh do tipo <any>,
    * return this.http.get<any>(),
    * para evitar erro ao invocar o atributo .content, em
    * const lancamentos = responseJson.content;
    * 
    * 37. Nao eh mais necessario definir,
    * const responseJson = response;
    * porque nao eh mais necessario invocar o metodo .json() de response.
    * Eh a mesma coisa que definir,
    * const response = response;,
    * apenas esta mudando o nome de response para responseJson.
    * Ou seja, pode-se utilizar response diretamente,
    * const lancamentos = response.content;
    * 
    * 38. No metodo adicionar, nao eh mais necessario definir stringfy() e nao
    * eh mais necessario invocar o metodo .json(). Como definir arrow function
    * response => response nao faz nada, remover a chamada para then() tambem. Ou seja, de,
    * 
    * return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());

      para,

    return this.http.post(this.lancamentosUrl, lancamento)
      .toPromise();

    * Esta dando erro referente ao retorno do metodo. Para corrigir isso, definir o tipo 
    * Lancamento no retorno do metodo .post(), 
    * return this.http.post<Lancamento>().
    * 
    * 39. No metodo atualizar(), remover a chamada ao metodo stringfy(), remover a chamada
    * para o metodo .json(). Nao eh necessario o cast para Lancamento, de,
    * const lancamentoAlterado = response.json() as Lancamento,
    * para,
    * const lancamentoAlterado = response;
    * , basta definir o retorno do metodo put como Lancamento.
    * return this.http.put<Lancamento>(),
    * que, entao, ja vai saber que, no metodo then(), o response que chegar vai ser do tipo
    * Lancamento.
    * 
    * 40. Alterar da mesma forma que o Passo 39 para o metodo buscarPorCodigo().
    * 
    * 41. No metodo pesquisar(), em
    * return this.http.get<any>(, { search : params })
    * nao vamos mais passar a propriedade search, vamos passar, simplesmente, params. Apenas 
    * definir params ja vai servir para a propriedade e para o valor.
    * 
    * 42. Vamos, agora, para a proxima Classe, pessoa.service.ts.
    * Ver pessoa.service.ts.
 */

/** Criar uma interface. */
/** Estou querendo definir um contrato, porque, ao inves de colocar any para o filtro,
 *    pesquisar(filtro: any): Promise<any>,
 * vou colocar LancamentoFiltro. Por que definir esse contrato? Porque, quem for chamar o metodo,
 * se nao passar descricao, supondo que passasse abc:
 *    this.lancamentoService.pesquisar( { abc: this.descricao }),
 * daria um erro de compilacao. Objetivo eh deixar o codigo menos propenso a falhas.
 * 
 */
export class LancamentoFiltro {
  /** Dentro dessa interface, criar uma propriedade descricao */
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  /** Criar uma propriedade chamada lancamentosUrl para definir qual a URL do nosso Recurso. */
  /** lancamentosUrl = 'http://localhost:8080/lancamentos'; **/
  lancamentosUrl: string;

  /** Na classe de Servico, vai precisar do Servico HTTP para fazer as chamadas. 
   * Injetar no Construtor.
  */
  /** constructor(private http: Http) { } */

  /** Na Classe LancamentoService, ao inves de injetar o Servico Http, vamos injetar
   * o Servico Wrapper AuthHttp.
   * A gente nao precisa mexer em nenhum Servico, porque, apesar de a gente estar
   * visualizando, parece que a gente esta usando um AuthHttp,
   * mas, na verdade, vai ser um MoneyHttp, porque o MoneyHttp herda
   * AuthHttp. Estamos utilizando, aqui, o poliformismo, a gente esta substituindo
   * a instancia apenas na Fabrica, substituimos a implementacao por MoneyHttp.
   * Entao, todo o Sistema ja comeca a usar o MoneyHttp.
    */
  /** constructor(private http: AuthHttp) { **/
  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

   /**
    * Aula 23.19. Upload com Componente FileUpload
    * 9. Antes de definirmos a propriedade urlUploadAnexo em LancamentoCadastroComponent, vamos abrir lancamento.service.ts 
    * e vamos criar o metodo que devolve essa URL, o qual vai se chamar urlUploadAnexo(). 
    * Vai devolver uma string, que eh a URL.
    * Vai retornar uma expressao: ${this.lancamentosUrl}/anexo
    * Essa eh a URL para fazermos o Upload de Anexo.
    * Voltar para a Classe do Componente: lancamento-cadastro.component.ts.
    */
   urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
   }

  /** Apos injetar uma instancia Http, criar o metodo pesquisar().
   * Esse metodo vai retornar uma Promise
    */

  /** Objeto filtro terah os atributos descricao, dataVencimentoInicio, dataVencimentoFim */
  /** pesquisar(filtro: any): Promise<any> { **/
  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    /** Declarar uma variavel params. Parametros de Pesquisa da URL. */
    /** const params = new URLSearchParams(); **/
    /** const params = new HttpParams(); **/
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    /** Passar Cabecalho. Tem que passar o Authorization Basic (Usuario e Senha encodados em Base64). 
     * Criar uma variavel headers.
    */
   /** const headers = new Headers(); */
   /** Passar um nome de um Cabecalho que deseja passar. */
   /** Com o Servico AuthHttp, nao eh necessario mais definir o Authorization, porque
    * antes tinhamos a nossa API usando a Seguranca Basic, agora, temos a API usando Seguranca OAuth2,
    * onde temos que passar o token.
    */
   /** headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */
   /** Instanciou o headers. Mas agora tem que passar na Requisicao, quando chama o GET. */

    /**params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
    */

   /** Se existe a propriedade descricao no objeto filtro com algo preenchido,
    * tem que adicionar o parametro descricao na nossa chamada GET na API
    */
    /**if (filtro.descricao) {
      /** Atribuir Propriedade descricao aos parametros da URL *
      params.set('descricao', filtro.descricao);
    }
    */
    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    
    if (filtro.dataVencimentoDe) {
      /** Converter o tipo Date para String, no formato ano-mes-dia. */
      /** Usar uma biblioteca chamada Moment.js para fazer a formatacao da data para string. */
      /** params.set('dataVencimentoDe', 
          moment(filtro.dataVencimentoDe).format('YYYY-MM-DD')); **/
      params = params.append('dataVencimentoDe', 
          moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));          
  }

  if (filtro.dataVencimentoAte) {
    /** params.set('dataVencimentoAte', 
        moment(filtro.dataVencimentoAte).format('YYYY-MM-DD')); **/
    params = params.append('dataVencimentoAte', 
        moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));        
  }

   /** { headers } eh um atalho para: { headers: headers }. Sao iguais. */
    /** Aqui fazer a chamada da nossa API. Template literal: ``*/
    /** Na chamada HTTP GET, ao passar as opcoes, passar tambem uma outra propriedade: search 
     * search: filtro, ou seja, a propriedade search vai receber o objeto filtro 
    */
   /** Utilizando o Servico AuthHttp, nao muda nada o get(), porque o AuthHttp tem os mesmos metodos 
    * que o Servico Http. Entao, continua funcionando normalmente. Porem, quando a gente fizer o get()
    * passando a URL, o AuthHttp vai adicionar automaticamente o token no cabecalho para a gente,
    * ficando tudo transparente.
    * Dessa forma, pode ser removido a definicao do Authorization nos Headers.
    * Nao eh necessario passar nenhum cabecalho customizado na chamada get():
    *     return this.http.get(`${this.lancamentosUrl}?resumo`,
         { headers, search: params })
      Como o AuthHttp pegou o token, de onde pegou?
      No AuthService, a gente armazena o token no Local Storage e chamando o item da chave de 'token'.
      O AuthHttp, por padrao, ja vai ler, no Local Storage, um item chamado 'token' e vai adiciona-lo
      no cabecalho. Isso quer dizer que, se alterarmos o nome da chave do item,
      por padrao, nao vai funcionar.
     */
    return this.http.get<any>(`${this.lancamentosUrl}?resumo`,
         /** { search: params }) **/
         { params })
        .toPromise()
        /** Vai receber a Resposta.*/
        /** Retornar o content, que eh o array de Lancamentos. */
        .then(response => {
          /** response.json().content */
          /** Declarar uma variavel, atribuindo a resposta convertida em objeto Javascript. */
          /** const responseJson = response.json(); **/
          /** const responseJson = response; **/
          /** Criar outra variavel lancamentos. content eh o array de lancamentos */
          /** const lancamentos = responseJson.content; **/
          const lancamentos = response.content;
          /** Nosso metodo nao vai retornar mais um array de lancamentos.
           * Vai retornar um objeto que chamamos de resultado com uma propriedade
           * lancamentos com valor de lancamentos (
           * array de lancamentos: responseJson.content), 
           *  */
          const resultado = {
            lancamentos: lancamentos,
            /** Total de registros na base de dados. */
            /** total: responseJson.totalElements **/
            total: response.totalElements
          };
          return resultado;
        });/** {
            /** Por enquanto imprimir apenas o response.JSON 
             * para verificar o que esta retornando. 
             * Quando chama o metodo json(), esta transformando o corpo 
             * da Resposta em objeto Javascript.
            console.log(response.json()); 
        });
        **/
  }

  /** Parametro codigo do lancamento que queremos excluir.
   * Retornando uma Promise<void>, nao vai retornar nenhum Corpo, conteudo
   * ou objeto JSON, Javascript para o Chamador, jah que exluir eh simplesmente
   * sucesso ou nao.
   */
  excluir(codigo: number): Promise<void> {
   /** Com o Servico AuthHttp, nao eh necessario mais definir o Authorization, porque
    * antes tinhamos a nossa API usando a Seguranca Basic, agora, temos a API usando Seguranca OAuth2,
    * onde temos que passar o token. */
    /** Primeiramente, definir os headers */
    /**
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */

    /** Retornar jah chamando o servico http, mas agora o metodo eh o delete. */
    /** return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers: headers }) */
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
        .toPromise()
        /** No then(), nao vai fazer nada. */
        .then(() => null);
  }

  /** O retorno eh o proprio objeto Lancamento.
   * O metodo vai retornar uma Promessa que vai dar um retorno do Lancamento criado.
   */
  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    /** Com o Servico AuthHttp, nao eh necessario mais definir o Authorization, porque
    * antes tinhamos a nossa API usando a Seguranca Basic, agora, temos a API usando Seguranca OAuth2,
    * onde temos que passar o token. */
    /**
    const headers = new Headers();
    /** headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");
    headers.append("Content-Type", "application/json");
    */
    return this.http.post<Lancamento>(this.lancamentosUrl, 
      /** JSON.stringify(lancamento), { headers: headers }) */
      /** JSON.stringify(lancamento)) **/ lancamento)
      .toPromise();
      /**.then(response => response.json()); **/
  }

  buscarUltimoRegistro(): Promise<number> {
   /** Com o Servico AuthHttp, nao eh necessario mais definir o Authorization, porque
    * antes tinhamos a nossa API usando a Seguranca Basic, agora, temos a API usando Seguranca OAuth2,
    * onde temos que passar o token. */    
    /**
    const headers = new Headers();
    headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");
    */
    /** return this.http.get(`${this.lancamentosUrl}?codigo`, { headers }) */
    return this.http.get<number>(`${this.lancamentosUrl}?codigo`)
        .toPromise();
        /** .then(response => response.json()); **/
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
   /** Com o Servico AuthHttp, nao eh necessario mais definir o Authorization, porque
    * antes tinhamos a nossa API usando a Seguranca Basic, agora, temos a API usando Seguranca OAuth2,
    * onde temos que passar o token. */    
    /**
    const headers = new Headers();
    /** headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");
    headers.append("Content-Type", "application/json");
    */
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, 
      /** JSON.stringify(lancamento), { headers: headers }) */
      /** JSON.stringify(lancamento)) */
      lancamento)
      .toPromise()
      .then(response => {
        /** const lancamentoJson = response.json() as Lancamento; **/
        const lancamentoJson = response;
        this.converterStringsParaDatas([lancamentoJson]);
        return lancamentoJson;        
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
   /** Com o Servico AuthHttp, nao eh necessario mais definir o Authorization, porque
    * antes tinhamos a nossa API usando a Seguranca Basic, agora, temos a API usando Seguranca OAuth2,
    * onde temos que passar o token. */    
    /**
    const headers = new Headers();
    headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");
    */
    /** return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers: headers }) */
      return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
        .toPromise()
        .then(response => {
          /** const lancamentoJson = response.json() as Lancamento; **/
          const lancamentoJson = response;
          this.converterStringsParaDatas([lancamentoJson]);
          return lancamentoJson;        
        });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
    };
  }
}

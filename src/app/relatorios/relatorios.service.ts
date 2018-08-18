import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
/** import { URLSearchParams } from '@angular/http'; **/
/** import { ResponseContentType } from '../../../node_modules/@angular/http'; **/

/** import { AuthHttp } from '../../../node_modules/angular2-jwt'; **/
import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';


/**
 * Aula 25.09. Usando a Classe MoneyHttp
 * 
 * 47. Agora que a gente ja configurou o JWT, que a gente alterou a nossa Classe MoneyHttp, 
  * vamos passar aqui pelos nossos arquivos, pelas nossas classes para que a gente utilize a nossa classe 
  * MoneyHttp ao inves da classe AuthHttp e, tambem, para que a gente remova todas as classes do modulo 
  * angular/http e passe a utilizar somente as classes do modulo angular/com/http.
  * 
  * 48. Remover o import, import { AuthHttp } from 'angular2-jwt';.
  * 
  * 49.  No import de URLSearchParams, corrigir para, ao inves de URLSearchParams, HttpParams
  * import { HttpParams } from '@angular/common/http';
  * A Classe ResponseContentType tambem nao sera mais necessaria, entao, remover.
  * 
  * 50. Substituir, no Construtor, AuthHttp por MoneyHttp.
  * 
  * 51. Fazer as mesmas alteracoes que na Classe lancamento.service.ts, da Aula 25.09. Usando a Classe MoneyHttp.
  * 
  * 52. Ao inves de termos, como valor para a propriedade responseType, ResponseContetType.Blob, vamos, simplesmente, definir 'blob',
 * como string mesmo.
 * E tambem nao eh necessario invocar o metodo response.blob(). Quando se remove esse metodo, fica tudo sem necessidade (
 * response => response nao faz nada), entao, pode-se remover o metodo then() e definir somente ate toPromise().
 * 
 * 53. A proxima classe a ser corrigida eh auth-service.
 * Ver auth-service.
 * 
 * 73. Corrigir 'search: params' para 'params', params vai servir para o nome da propriedade e para o valor,
  * para evitar erro na geracao do relatorio,
  * core.js:1542 ERROR Error: Uncaught (in promise): HttpErrorResponse: {"headers":{"normalizedNames":{},"lazyUpdate":null},
  * "status":400,"statusText":"OK","url":"http://localhost:8080/lancamentos/relatorios/por-pessoa","ok":false,
  * "name":"HttpErrorResponse","message":"Http failure response for http://localhost:8080/lancamentos/relatorios/por-pessoa: 400 OK",
  * "error":{}}
  * 
  * 74. Ao testar, voltou a funcionar a Pagina de Relatorios.
  * 
  * 75. Nas proximas aulas, sera feito a correcao da Pagina de Pessoas para alterar o erro ao alterar a coluna Status para ativar
  * e desativar Pessoa.
  * 
  * 76. Fim da Aula 25.09. Usando a Classe MoneyHttp.
 */
@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;
/**
 * Aula 23.09. Exibindo o PDF para o Usuario
  * 
  * Nesta aula aqui, a gente vai fazer uma Requisicao AJAX que acreditamos ser 
  * diferente de todas as outras que a gente fez aqui no curso, porque a gente vai 
  * buscar dados binarios, dados do nosso PDF, do PDF que o Usuario esta pesquisando 
  * atraves do Periodo.
  *
  * 1. Para isso, a gente vai criar, primeiramente, o nosso Servico, porque iremos 
  * fazer essa Consulta dentro do Servico de Relatorios. Entao, vamos rodar o 
  * comando para gerar o Servico de Relatorios:
  *
  * ng g s relatorios/relatorios --spec=false
  *
  * O Servico vai ficar dentro da pasta relatorios.
  *
  * 2. A primeira coisa que iremos fazer eh colocar esse novo Servico em 
  * CoreModule (core.module.ts), na Secao Providers.
  * Ver core.module.ts.
  *
  * 3. Agora, vamos construir o metodo que vai buscar os dados de Lancamento por Pessoa, 
  * obviamente no formato binario, mais especificamente o PDF, que vai ser retornado 
  * para o nosso Usuario.
  * 
  * 4. O metodo vai se chamar relatorioLancamentosPorPessoa(). 
  * 
  * 5. Vamos, primeiramente, injetar a propriedade AuthHttp no Construtor.
  * 
  * 6. Vamos chamar o metodo get de AuthHttp.
  * 
  * 7.1. Precisamos, tambem, configurar a variavel de instancia lancamentosUrl, porque
  * a gente tambem esta buscando esse relatorio la da nossa classe de Recurso de 
  * Lancamentos. 7.2. Vamos atribuir o valor no Construtor. 7.3. Tambem vamos precisar,
  * para montar essa URL, da URL da API. Entao, precisamos importar a propriedade 
  * environment.
  * 
  * 8.1. Na chamada do metodo http.get, passar a URL: 
  * ${this.lancamentosUrl}/relatorios/por-pessoa. 8.2. Chamar, em seguida,
  * o metodo toPromise() e o metodo then(), passando uma arrow function 
  * como parametro.
  * 
  * 9. Nos precisamos devolver, na chamada do metodo then(), nao um JSON e sim um
  * objeto binario BLOB (Binary Large Object). Para isso, como segundo parametro da
  * chamada do metodo http.get(), vamos definir um objeto 
  * e vai-se definir, nesse objeto, a propriedade que vai fazer com que
  * seja reconhecido que o retorno dessa Requisicao eh um Binario, sao dados Binarios.
  * A propriedade eh responseType, com o valor: ResponseContentType.Blob
  * 
  * 10. Agora, ao inves de retornar o JSON, nos vamos chamar o metodo blob() de 
  * response. Dessa forma, nos retornamos dados binarios para quem chamar esse
  * metodo Javascript e, assim, a gente vai conseguir exibir esse PDF para o Usuario
  * Final.
  * 
  * 11.1. Antes, porem, a gente precisa levar em consideracao que a gente tem o periodo
  * de inicio e fim. Entao, vamos definir os parametros inicio: Date, fim: Date.
  * Para configurar esses dois parametros de forma elegante, nos vamos definir
  * a variavel params da classe URLSearchParams. 11.2. Agora, vamos definir os parametros
  * na variavel params. Para formatar o valor do parametro
  * inicio de data para string, vamos utilizar a biblioteca moment:
  * params.set('inicio', moment(inicio).format('YYYY-MM-DD')). A mesma coisa faremos
  * com a data fim e parametro fim. 11.3. Falta a gente passar, agora, params como
  * valor da propriedade search: params
  * 11.4. Dessa forma, estamos passando os parametros que sao necessarios para a 
  * nossa Requisicao e estamos ja reconhecendo e repassando os binarios do nosso PDF.
  * 
  * 12. Agora, vamos utilizar isso la na classe do nosso componente para podermos, de
  * fato, mostrar esse PDF para o Usuario.
  * Ver Classe relatorio-lancamentos.component.ts, no metodo gerar().
  *
 */
  constructor(
    /** private http: AuthHttp **/
    private http: MoneyHttp
  ) { 
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    /** const params = new URLSearchParams(); **/
    const params = new HttpParams()
      .append('inicio', moment(inicio).format('YYYY-MM-DD'))
      .append('fim', moment(fim).format('YYYY-MM-DD'));
/**
 * Aula 25.09. Usando a Classe MoneyHttp
 * 
 * 52. Ao inves de termos, como valor para a propriedade responseType, ResponseContetType.Blob, vamos, simplesmente, definir 'blob',
 * como string mesmo.
 * E tambem nao eh necessario invocar o metodo response.blob(). Quando se remove esse metodo, fica tudo sem necessidade (
 * response => response nao faz nada), entao, pode-se remover o metodo then() e definir somente ate toPromise().
 *
    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, 
        { search: params, responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob());
  }
  */
 /**
  * Aula 25.09. Usando a Classe MoneyHttp
  * 
  * 73. Corrigir 'search: params' para 'params', params vai servir para o nome da propriedade e para o valor,
  * para evitar erro na geracao do relatorio,
  * core.js:1542 ERROR Error: Uncaught (in promise): HttpErrorResponse: {"headers":{"normalizedNames":{},"lazyUpdate":null},
  * "status":400,"statusText":"OK","url":"http://localhost:8080/lancamentos/relatorios/por-pessoa","ok":false,
  * "name":"HttpErrorResponse","message":"Http failure response for http://localhost:8080/lancamentos/relatorios/por-pessoa: 400 OK",
  * "error":{}}
  * 
  * 74. Ao testar, voltou a funcionar a Pagina de Relatorios.
  * 
  * 75. Nas proximas aulas, sera feito a correcao da Pagina de Pessoas para alterar o erro ao alterar a coluna Status para ativar
  * e desativar Pessoa.
  * 
  * 76. Fim da Aula 25.09. Usando a Classe MoneyHttp.
  */
    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, 
        /** { search: params, responseType: 'blob' }) **/
        { params, responseType: 'blob' })
      .toPromise();
      /** .then(response => response.blob()); **/
  }
}

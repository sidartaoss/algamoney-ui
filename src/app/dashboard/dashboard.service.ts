import { Injectable } from '@angular/core';

/**Aula 23.03. Criando o Servico da Dashboard  
 * 4. Nos iremos importar tambem uma outra classe, que eh a classe AuthHttp.
 * 5. E nos iremos injetar a classe AuthHttp no Construtor.
*/
/** import { AuthHttp } from 'angular2-jwt'; **/
/** Aula 23.03. Criando o Servico da Dashboard
 * 6.2. Importar o metodo toPromise().
 * */
import 'rxjs/operator/toPromise';
/** Aula 23.03. Criando o Servico da Dashboard 
 * Vamos importar a biblioteca moment de datas para fazer a conversao de strings para datas.
 * */
import * as moment from 'moment';


import { environment } from './../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';

/**
 * Aula 25.09. Usando a Classe MoneyHttp
 * 
 * 17. Agora que a gente ja configurou o JWT, que a gente alterou a nossa Classe MoneyHttp, 
  * vamos passar aqui pelos nossos arquivos, pelas nossas classes para que a gente utilize a nossa classe 
  * MoneyHttp ao inves da classe AuthHttp e, tambem, para que a gente remova todas as classes do modulo 
  * angular/http e passe a utilizar somente as classes do modulo angular/com/http.
  * 
  * 18. Remover o import, import { AuthHttp } from 'angular2-jwt';.
  * 
  * 19. Substituir, no Construtor, AuthHttp por MoneyHttp.
  * 
  * 20. No metodo lancamentosPorCategoria(), nao precisamos mais da chamada ao metodo .json(), de
  *   return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
          .toPromise()
          .then(response => response.json());
  * Nao eh mais necessario invocar o metodo .json(). Como response => response nao faz nada, podemos remover da
  * chamada then(). Entao, como nao ha nada como parametro na chamada do metodo then(), podemos remover, 
  * permanecendo apenas a chamada do metodo toPromise().
    para
      return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
          .toPromise();
  * 
  * 21. Atribuir <Array<any>> na chamada do metodo get(), no metodo lancamentosPorCategoria().
  * 
  * 22. No metodo lancamentosPorDia(), nao eh mais necessario a chamada para o metodo json(), como no Passo
  * 20. Como no Passo 21, definir <Array<any>> na chamada do metodo get().
  * 
  * 23. Vamos, agora, corrigir lancamento.service.ts.
  * Ver lancamento.service.ts.
 */

/**
 * Aula 23.03. Criando o Servico da Dashboard

  * Nesta aula, o que nos iremos fazer eh construir o Servico que a gente vai utilizar para poder 
  * pegar os dados la do nosso BackEnd e, depois, repassar isso para mostrar dados dinamicos la no 
  * nosso grafico da tela de Dashboard. Entao, vamos criar aqui, no Visual Studio Code, criar o 
  * servico Dashboard, que vai ficar dentro do pacote dashboard. Vamos digitar o comando:
  * 
  * ng g s dashboard/dashboard --spec=false
  * 
  * 1. Okay, foi criado dashboard.service.ts. 
  * Agora, nos iremos comecar a criar os nossos metodos.
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  /** Aula 23.03. Criando o Servico da Dashboard 
   * 2. A primeira coisa que nos iremos fazer eh declarar uma propriedade que nos iremos chamar
   * de lancamentosUrl, da mesma forma que nos fizemos anteriormente la no servico de Lancamentos,
   * porque, como o que a gente vai utilizar, na verdade, eh o Recuros de Lancamentos para buscar
   * esses dados do Dashboard, entao vamos definir essa variavel de instancia, que nos iremos 
   * inicializar dentro do Construtor.
  */
 lancamentosUrl: string;

  constructor(
    /** private http: AuthHttp **/
    private http: MoneyHttp
  ) {
    /** Aula 23.03. Criando o Servico da Dashboard 
     * 3. Aqui, dentro do construtor, vamos utilizar uma expressao, onde nos iremos precisar da 
     * propriedade environment, a qual iremos importar: environment.apiUrl.
     * 
     * */
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

   /** Aula 23.03. Criando o Servico da Dashboard 
    * 6.1. O primeiro metodo que nos iremos construir eh o metodo que vai buscar os Lancamentos Por
    * Categoria, ou seja, as estatisticas de Lancamentos Por Categoria. Vai retornar uma Promise,
    * que eh do tipo Array<any>.
    * O metodo vai, simplesmente, invocar o metodo get de http, passando, como parametro, uma outra
    * expressao para ajudar a montar a URL, que eh this.lancamentosUrl + /estatisticas + 
    * /por-categoria e invocando o metodo toPromise(). Precisamos importar o metodo:
    * import 'rxjs/operator/toPromise';
    * 
    * 6.3. Agora, definimos o metodo then(). Vamos pegar a resposta e vamos retornar o JSON.
    * Pronto, esse primeiro metodo eh bem simples, eh isso.
    *
    * 6.4. Nos vamos copiar o metodo lancamentosPorCategoria e vamos nos basear nele para pegarmos
    * Lancamentos Por Dia.
    * */
   lancamentosPorCategoria(): Promise<Array<any>> {
    /**return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
        .toPromise(); **/
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
        .toPromise();        
        /** .then(response => response.json()); **/
   }

   /** Aula 23.03. Criando o Servico da Dashboard 
    * 7.1. lancamentosPorDia eh bem simples tambem, mas vai mudar alguma coisa: vamos trocar o nome
    * do metodo e o path tambem.
    * 7.2. A alteracao, agora, vai ser no metodo then().
    * Para o retorno por dia, nos temos uma propriedade que representa a data, nos temos a 
    * propriedade que se chama dia e representa a data, so que, quando ela vem aqui, quando ela
    * chega aqui nesse metodo, ela ainda esta como string e nos iremos precisar converte-la como
    * objeto Date do Java. Entao, por isso a gente vai ter essa diferenca aqui no retorno de cada
    * um dos dois metodos. Primeiramente, antes de ternimarmos o then(), nos vamos construir esse
    * metodo que nos iremos precisar, que vai ser converterStringsParaDatas().
    * */
   lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`)
        .toPromise()
        .then(response => {
          /** Aula 23.03. Criando o Servico da Dashboard
           * 9. Agora que nos iremos voltar aqui e definirmos:
           * const dados, pegando response.json()
           * Vamos chamar o metodo converterStringsParaDatas, passando dados.
           * E vamos fazer o retorno de dados.
           * Dessa forma, aqui no nosso servico, nos ja concluimos.
           * Vamos, agora para o CoreModule.
           * Ver core.module.ts.
           * */
          /** const dados = response.json(); **/
          const dados = response;
          this.converterStringsParaDatas(dados);
          return dados;
        });
   }

   /** Aula 23.03. Criando o Servico da Dashboard 
    * 8. Aqui nos vamos receber os dados, que sera um Array de any e, aqui, nos vamos
    * fazer um laco for(), declarando uma variavel local: dado of dados. Para cada objeto dentro
    * do Array, nos vamos pegar a propriedade dia, que eh uma data no formato string. Entao, vamos
    * utilizar aqui moment, que eh a biblioteca de datas que a gente ja utilizou aqui no projeto 
    * para podermos fazer essa conversao. Ela ainda nao esta importada, nos iremos importa-la agora.
    * No primeiro parametro do metodo moment(), nos passamos a data ainda em string, ou seja, 
    * dado.dia. O segundo parametro, nos passamos como que ela esta formatada, que eh YYYY-MM-DD.
    * E, por final, chamamos toDate() para podermos transforma-lo em um objeto do tipo Date.
    * Nao eh necessario retornar nada, porque estamos trabalhando com a referencia do parametro.
    * */
   private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
   }

}

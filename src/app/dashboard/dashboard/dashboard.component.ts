import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

/** Aula 23.06. Formatando labels no Chart.JS
 * 11. Importar o Pipe para a formatacao dos labels nos Graficos de Pizza e Linhas.
 */
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  /** Aula 23.02. Plotando Graficos com Dados Estaticos
   * 12. Vamos criar as duas propriedades: pieChartData e lineChartData.
   * Para cada propriedade, nos temos o atributo labels. No Grafico de Pizza, nos temos um array de:
   * 'Mensal', 'Educacao', 'Lazer', 'Imprevistos'. No Grafico de Linha, nos temos definido, no atributo
   * labels, os dias da semana. Cada dia da semana vai representar uma posicao no Eixo X.
   * No Grafico de Pizza, nos temos a propriedade datasets, onde ha somente um indice no array
   * de datasets, porque, para o Grafico de Pizza, eh o suficiente definirmos: nos precisamos ver o
   * circulo da pizza com as respectivas fatias.
   * No Grafico de Linhas, tambem temos a propriedade datasets, onde eh interessante termos mais de
   * uma linha no array de datasets, porque eh interessante para podermos comparar uma linha com 
   * a outra. Entao, por isso nos temos a linha de Receitas e a linha de Despesas. Por isso que nos
   * temos duas posicoes no array da propriedade datasets do Grafico de Linhas. Da forma como esta
   * definido, nos ja conseguimos testar no Browser para visualizarmos esses graficos.
   * No Grafico de Pizza, eh possivel clicar em um item da Legenda para eliminar uma Categoria:
   * Mensal, Educacao, Lazer ou Imprevistos para que vejamos o grafico proporcionalmente as
   * outras categorias que nao estao riscadas.
   * A mesma coisa pode ser feita no Grafico de Linhas.
   * Fim da 23.02. Plotando gráficos com dados estáticos.
   */
  /**
   * Aula 23.04. Buscando Dados do Grafico de Pizza
   * 6. Aqui nos podemos remover os dados estaticos e podemos deixar apenas a definicao
   * da propriedade pieChartData do tipo any.
   * **
  pieChartData = {
    labels: ['Mensal', 'Educacao', 'Lazer', 'Imprevistos'],
    datasets: [
      {
        data: [2500, 2700, 550, 235],
        backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC']
      }
    ]
  };
  */
  pieChartData: any;
 /**
  * Aula 23.05. Buscando Dados do Grafico de Linhas.
  *
  * 1. Agora que a gente configurou o Grafico de Pizza, vamos configurar o Grafico de Linhas. E, para 
  * isso, nos vamos fazer bem parecido com o que nos fizemos no Grafico de Pizza. Vamos copiar 
  * a definicao de lineChartData e colar no metodo configurarGraficoLinha(). 
  *  
  lineChartData = {
    labels: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    datasets: [
      {
        label: 'Receitas',
        data: [4, 10, 18, 5, 1, 20, 3],
        borderColor: '#3366CC'
      },
      {
        label: 'Despesas',
        data: [10, 15, 8, 5, 1, 7, 9],
        borderColor: '#D62B00'
      }
    ]
  };
  */
  lineChartData: any;
  /** 
   * Aula 23.06. Formatando labels no Chart.JS
    * Nesta aula, o que nos vamos fazer eh formatar os numeros do nosso grafico. 
    * Quando passamos o mouse em cima do Grafico de Pizza, notamos que o numero nao esta formatado 
    * em formato moeda. Nos iremos trocar o formato atual, por exemplo, 665.53, por uma formatacao. 
    * 
    * 1. Para fazer essa formatacao, a gente vai utilizar o mesmo recurso que foi utilizado, por 
    * exemplo, na Pagina lancamento-pesquisa.component.html. Nos vamos utilizar o Pipe (|), 
    * por exemplo, {{ lancamento.valor | number:'1.2-2' }}, so que nos vamos utilizar a Classe 
    * referente a esse Pipe, obviamente nao iremos utilizar assim: 
    * {{ lancamento.valor | number:'1.2-2' }}. O que nos vamos fazer na Classe dashboard.component.ts, 
    * eh importar esse Pipe dentro da nossa Classe, injeta-lo dentro do Construtor, e a gente vai 
    * utiliza-lo para formatar esse numero. Mas, para formatar, alem disso, alem do formatador em si, 
    * a gente precisa tambem criar em dashboard.component.ts um objeto onde nos vamos guardar as 
    * opcoes do Grafico.
    * 
    * 2. Vamos chama-lo de options, porque a propriedade la no Grafico de Pizza que vai ser colocada em 
    * <p-chart type="pie" [data]="pieChartData"></p-chart>
    * se chama options. Vamos fazer um property binding:
    * <p-chart type="pie" [data]="pieChartData" [options]="options"></p-chart>
    * Essa propriedade options nos podemos usar para pegar opcoes para podermos customizar o Grafico.
    * Nos iremos criar esse objeto options na Classe DashboardComponent, mas ja vamos deixar a propriedade
    * definida tambem no Grafico de Linhas apontando para a propriedade options que acabamos de criar na
    * Classe DashboardComponent. 
    * Vem em dashboard.component.html.
    * 
    * 5. O que iremos definir em options para podermos formatar? Isso que iremos definir esta na documentacao do Chart.js
    * Nao esta na documentacao dos Graficos do PrimeNG, ate porque, como ja mencionado, o PrimeNG usa o Chart.js. Entao, se
    * quisermos detalhes como esse que iremos definir, precisamos ir ate a documentacao la do Chart.js. O que iremos aprender
    * eh como formatar os numeros. Como acabamos de ver no Grafico de Pizza, eles nao estao formatados em formato moeda e a
    * gente vai formata-los agora. A primeira propriedade a definir eh tooltips, que sao aqueles labels que aparecem quando a 
    * gente passa o mouse por cima da parte do Grafico, a partezinha preta onde esta aparecendo o nome do item e o numero.
    * Da mesma forma, nos temos no Grafico de Linhas os tooltips. Essa parte eh o que nos iremos customizar. Nessa propriedade
    * tooltip, a gente pode definir uma outra propriedade chamada callbacks. E, dentro de callbacks, nos temos um callback 
    * para o label: eh, basicamente, o que vamos colocar dentro do nosso tooltip. Entao, aqui, nos recebemos dois parametros:
    * o primeiro eh tooltipItem e o segundo eh data. No primeiro parametro tooltipItem, a gente tem a posicao do valor que
    * esta para ser exibido. O parametro data a gente tem o dataset, que eh equivalente a:
    * 		{
            labels: dados.map(dado => dado.categoria.nome),
            datasets: [
              {               
                data: dados.map(dado => dado.total),
                backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                 '#DD4477', '#3366CC', '#DC3912']
              }
            ]
          }
    * do Grafico. Ai a gente vai ter acesso tambem ao dataset e, com isso, mais as posicoes que a gente tem do item que 
    * esta para ser exibido, a gente consegue customizar o nosso tooltip e, com isso, a gente formata antes de customizar
    * e retorna esse valor formatado.
    * 
    * 6. Vamos, primeiramente, declarar uma variavel que vamos chamar de dataset, onde iremos pegar o dataset referente 
    * ao tooltip que esta para ser exibido. Por que que precisamos aqui do dataset?
    * No Grafico de Pizza, nos so temos um dataset e, no Grafico de Linhas, nos temos dois: de Receita e Despesa. Entao,
    * a primeira coisa que nos precisamos fazer eh pegar qual eh esse dataset: ou Receita ou Despesa ou, senao, o dataset
    * do proprio Grafico de Pizza. Entao, a primeira coisa que faremos eh pegar o dataset para, depois, vir ate essa propriedade:
    * data:
    *  datasets: [
              {               
                data: dados.map(dado => dado.total),
                backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                 '#DD4477', '#3366CC', '#DC3912']
              }
            ]
    * e encontrar qual que eh o exato valor que esta para ser exibido, formata-lo e retorna-lo no metodo.
    * Entao, a primeira coisa eh descobrir qual que eh o dataset. A gente faz isso atraves da propriedade data.datasets.
    * Como dito anteriormente, tooltipItem contem as posicoes referentes ao tooltip que esta para ser exibido:
    * data.datasets[tooltipItem.datasetIndex]. Dessa forma, nos pegamos o dataset.
    * 
    * 7. Agora, nos vamos pegar o valor que esta para ser exibido. No nosso caso aqui, eh o numero. Entao, vamos pegar esse valor.
    * Como que pegamos? Nos temos o dataset, dentro do dataset nos temos a propriedade data:
    * datasets: [
              {               
                data: dados.map(dado => dado.total),
                backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                 '#DD4477', '#3366CC', '#DC3912']
              }
            ]
    * e, aqui, nos precisamos de um indice. Onde esta esse indice? No tooltipItem, na propriedade index. Dessa forma nos pegamos
    * o valor.
    * 
    * 8. E, para nos pegarmos o label do dataset, porque tem alguns, por exemplo, o Grafico de Pizza nao tem. Mas, no Grafico de 
    * Linhas, a gente tem label cada dataset: label: 'Receitas', label: 'Despesas'
      datasets: [
                  {
                    label: 'Receitas',
                    data: totaisReceitas,
                    borderColor: '#3366CC'
                  },
                  {
                    label: 'Despesas',
                    data: totaisDespesas,
                    borderColor: '#D62B00'
                  }
                ]
    * Entao, nos precisamos pegar isso tambem para mostrar junto com o valor, porque, no caso do Grafico de Pizza, a gente nao precisa,
    * mas, no Grafico de Linhas, a gente precisa, pelo menos, para manter o mesmo padrao do tooltip somente com o valor formatado.
    * Entao, por isso a gente vai pegar tambem o label do dataset. Nos fazemos isso simplesmente pegando dataset.label. So que, como
    * a gente tem o dataset do Grafico de Pizza que nao tem label, entao, na verdade, nos vamos fazer uma verificacao:
    * Se tiver o label, entao vai exibir o label + dois pontos + espaco, que eh o padrao que esta definido la no Grafico.
    * Caso nao tenha o label, simplesmente vai ficar um string vazio.
    * 
    * 9. E, agora, basta retornar o label mais o valor formatado. E, agora que entra a questao do Pipe.
    * 
    * 10. Agora, vamos importar o Pipe.
    * 
    * 15. Agora sim, podemos concatenar o retorno de label com 
    * this.decimalPipe.transform. Para o primeiro parametro, passamos o valor, o segundo
    * parametro definimos como que a gente quer que ele fique formatado.
    * Vamos pegar esse padrao de formatacao da pagina: lancamentos-pesquisa.component.html,
    * em lancamento.valor | number:'1.2-2', vamos pegar: '1.2-2'.
    * 
    * 16. Dessa forma, a gente ja pode fazer um teste. Agora, ao inves de termos o
    * valor com a divisao com ponto, nos temos o valor formatado no padrao Portugues
    * Brasileiro.
    * Da mesma forma, no Grafico de Linhas, a gente tambem tem o valor formatado,
    * juntamente com o Label do Dataset: Despesas: 2.330,76 e Receitas: 6.500,00.
    * A virgula utilizada para separar as casas decimais e o ponto como separador
    * de milhar.
    * Fim da Aula 23.06. Formatando labels no Chart.JS.
    * 
  */
  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor =   dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ": ") : '';
          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };


  /**
   * Aula 23.04. Buscando Dados do Grafico de Pizza
   * 3. Nos vamos importar e injetar no Construtor o Servico do Dashboard
   * */  
  /** Aula 23.06. Formatando labels no Chart.JS
   * 12. Injetar DecimalPipe no Construtor
   * Para fazer essa injecao, ir ate dashboard.module.ts e definir o DecimalPipe 
   * como Provider.
   * Ver dashboard.module.ts.
   * 
   * 14. Agora que o DecimalPipe, vai ser injetado, ele podera ser utilizado aqui
   * dentro da Classe.
   * */
  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    /**
     * Aula 23.04. Buscando Dados do Grafico de Pizza
     * 2. Vamos invocar o metodo configurarGraficoPizza()
     * dentro do ngOnInit()
     * */
    this.configurarGraficoPizza();
    /**
     * Aula 23.05. Buscando Dados do Grafico de Linhas.
     * 3. Vamos, tambem, fazer a chamada do metodo configurarGraficoLinha()
     */
    this.configurarGraficoLinha();
  }

  /**
   * Aula 23.04. Buscando Dados do Grafico de Pizza
    *
    Nesta aula, nos vamos aproveitar o Servico que foi construido na aula passada para pegarmos os
    dados e jogar esses dados para os graficos que estao na nossa tela de Dashboard. Nesta aula,
    o Grafico que nos iremos trabalhar eh o Grafico de Pizza primeiramente. Nas proximas, a gente 
    vai trabalhando o outro. 
    
    1. E nos vamos, entao, abrir o componente dashboard.component.ts e o
    que nos iremos fazer eh, primeiramente, construir o metodo que vai ser chamado no ngOnInit(). 
    Esse metodo sera chamado de configurarGraficoPizza().
   */
  configurarGraficoPizza() {
  /**
   * Aula 23.04. Buscando Dados do Grafico de Pizza
   * 4. Agora, vamos usar o Servico do Dashboard, chamando o metodo Lancamentos Por Categoria, que eh
   * referente ao nosso Grafico de Pizza, chamando, em seguida, o then(), porque ele devolve uma 
   * Promessa (Promise) e, nele, nos vamos pegar os dados atraves da nossa arrow function.
   * 
   * */
    this.dashboardService.lancamentosPorCategoria()
        .then(dados => {
        /**
         * Aula 23.04. Buscando Dados do Grafico de Pizza
         * 5. O que nos iremos fazer agora?
         * Nos vamos copiar para aqui a definicao da variavel de instancia pieChartData para 
         * nos irmos substituindo dentro do metodo then().
         * 
         * 7.1. Aqui, nos vamos utilizar a referencia this.pieChartData.
         * 7.2. A primeira coisa que nos iremos fazer eh substituir os labels.
         * Como iremos fazer isso? Nos temos dentro dos arrays do Javascript 
         * o metodo chamado map para nos transformarmos o array que, no nosso caso, eh um array
         * sem o tipo definido e a gente vai transformar isso em outro array de outro tipo,
         * quer dizer, pode ate ser do mesmo tipo. A ideia, aqui, na verdade, eh transformar em 
         * outro array, que, no nosso caso, vai ser um array de strings para os labels:
         * dados.map()
         * **/
          this.pieChartData = {
            /** Aula 23.04. Buscando Dados do Grafico de Pizza 
              * 7.3. Entao, nos iremos receber o dado do parametro e nos sabemos que o dado tem a 
              * propriedade categoria e que tem a propriedade nome. E, dessa forma, do jeito que
              * esta vendo agora, nos transformamos o array dados, que eh uma lista de objetos em
              * um array de strings que, no nosso caso aqui, vai ser equivalente ao nome da categoria:
              * dados.map(dado => dado.categoria.nome);
            */
            labels: dados.map(dado => dado.categoria.nome),
            datasets: [
              {
                /** Aula 23.04. Buscando Dados do Grafico de Pizza 
                * 7.4. Aqui embaixo nos dados, nos vamos fazer de forma muito parecida.
                * Nos vamos definir:
                * dados.map(), so que, ao inves de utilizar o nome da categoria, nos vamos utilizar
                * dado.total, porque nos sabemos que esse objeto que a gente esta chamando de dado
                * tem duas propriedades: uma eh categoria e a outra eh a propriedade total. 
                * Em labels, a gente usa os nomes das categorias e, em data, nos datasets, a gente
                * usa os totais, o total de cada categoria.
                * */                
                data: dados.map(dado => dado.total),
                /** Aula 23.04. Buscando Dados do Grafico de Pizza 
                * 7.5. Em backgroundColor, nos podemos construir uma funcao para pegar dinamicamente as
                * cores de acordo com a quantidade de categorias existentes.
                * O que nos iremos fazer eh copiar algumas cores e nos iremos colar aqui agora
                * para complementarmos.
                * Caso queira-se colocar mais cores no grafico, basta implementar um metodo que
                * vai devolver um array de cores baseado no array de dados, na quantidade de 
                * categorias que tem no array de dados.
                * 7.6. Agora, ja podemos testar, reiniciando o Servidor: ng serve. Abrir o
                * Browser: http://localhost:4200
                * Por esse Grafico de Pizza, ja esta tudo certo. Nas proximas aulas, a gente vai
                * ajustar o Grafico de Lancamentos por dia, o nosso Grafico de Linhas.
                * Fim da Aula 23.04. Buscando Dados do Grafico de Pizza.
                * */
                backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                 '#DD4477', '#3366CC', '#DC3912']
              }
            ]
          }
    });
  }

  configurarGraficoLinha() {
  /**
   * Aula 23.05. Buscando Dados do Grafico de Linhas.
   * 2. Aqui, nos vamos fazer a chamada, com dashboardService, para o metodo lancamentosPorDia().
   * O metodo then() recebe os dados, define-se a arrow function. Dentro da arrow function,
   * vamos colar a definicao da variavel de instancia lineChartData para podermos ir substituindo
   * da mesma forma que fizemos no metodo configurarGraficoPizza().
   */ 
    this.dashboardService.lancamentosPorDia()
        .then(dados => {
          /** Aula 23.05. Buscando Dados do Grafico de Linhas. 
           * 16. Vamos definir a variavel diasDoMes.
           * Alem de usar em labels, nos vamos ter que repassar para o metodo totaisPorCadaDiaMes
           * como parametro.
           * */
          const diasDoMes = this.configurarDiasMes();
          const totaisReceitas = this.totaisPorCadaDiaMes(
                dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
          const totaisDespesas = this.totaisPorCadaDiaMes(
                  dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);                
          this.lineChartData = {
            /** Aula 23.05. Buscando Dados do Grafico de Linhas. 
             * 4. Nos precisamos definir nos labels uma posicao para cada dia do mes corrente,
             * porque os dados que nos recebemos do Backend sao estatiscas de Lancamento Por Dia,
             * entao, para os labels, para configurar la no grafico, nos vamos ter que colocar no 
             * Eixo X todos os dias do mes corrente. Para isso, nos vamos precisar criar um metodo
             * privado chamado configurarDiasMes().
             * 
             * 13. Chamar o metodo configurarDiasMes(). Dessa forma, nos temos a definicao dos labels.
            */
            labels: diasDoMes,
            /** Aula 23.05. Buscando Dados do Grafico de Linhas. 
             * 18. Cada dataset eh referente a uma linha: Receita e Despesa. Entao, nao podemos
             * passar todos os dados para esse metodo que acabamos de construir: totaisPorCadaDiaMes().
             * Para cada uma das posicoes: Receitas e Despesas, nos so podemos passar o tipo de
             * Lancamento referente aquela Linha. Por exemplo, o atributo data de Receitas deve ser o
             * array de dados proprio de Receitas e o atributo data de Despesas deve ser o array de
             * dados proprio de Despesas. O que iremos fazer? Iremos declarar mais duas variaveis:
             * totaisReceitas, chamando o metodo totaisPorCadaDiaMes e passando, no primeiro parametro,
             * somente os dados de receita. Como fazemos isso? Filtrando somente os dados de receita,
             * chamando o metodo filter e, como parametro, passando uma arrow function, onde eh 
             * definido o filtro: se o tipo do dado for RECEITA, entao ele vai ser filtrado.
             * totaisReceitas = totaisPorCadaDiaMes(
             *    dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes)
             * Para Despesa, vai ser muito parecido: Copiar/Colar, basta trocar os nomes.
             * totaisDespesas e totaisReceitas vai ser definido em cada indice em datasets, na
             * propriedade data.
             * 
             * 19. Agora, ja podemos testar.
             * Fim da Aula 23.05. Buscando Dados do Grafico de Linhas.
             * */
            datasets: [
              {
                label: 'Receitas',
                /** Aula 23.05. Buscando Dados do Grafico de Linhas. 
                 * 14. Para a definicao dos dados do Grafico de Linhas, nos tambem vamos ter um 
                 * trabalho extra para fazer essa configuracao. Porque, quando nos buscamos os 
                 * Lancamentos Por Dia do nosso Backend, provavelmente, nao serao todos os dias do
                 * mes em que vai haver um Cadastro de Lancamento. Por exemplo, em um mes de 30 dias
                 * nos vamos ter varios dias que nao vao ter nenhum Lancamento, nenhum valor. Mas 
                 * nos precisamos de um array que tenha a mesma quantidade de posicoes do que esta
                 * definido em labels, porque, a cada indice em labels, nos temos que ter um indice
                 * equivalente com o seu valor, mesmo que esse valor seja 0. Por isso, nos vamos ter
                 * um trabalho extra, que eh criar o metodo privado, que chamaremos de 
                 * totaisPorCadaDiaMes().
                 * */
                data: totaisReceitas,
                borderColor: '#3366CC'
              },
              {
                label: 'Despesas',
                data: totaisDespesas,
                borderColor: '#D62B00'
              }
            ]
          }
        });   
    this.lineChartData = {
      labels: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      datasets: [
        {
          label: 'Receitas',
          data: [4, 10, 18, 5, 1, 20, 3],
          borderColor: '#3366CC'
        },
        {
          label: 'Despesas',
          data: [10, 15, 8, 5, 1, 7, 9],
          borderColor: '#D62B00'
        }
      ]
    };    
  }

  /** Aula 23.05. Buscando Dados do Grafico de Linhas. 
   * 15. Este metodo vai precisar receber os dados e tambem os dias do mes, que eh o que retorna
   * o metodo configurarDiasMes().
   * */
  totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
  /** Aula 23.05. Buscando Dados do Grafico de Linhas. 
   * 17. Nos vamos iterar por cada dia do mes
   * Para cada dia, vamos ter que saber qual que eh o total desse dia. Vamos ter que saber
   * se esse dia tem Lancamento e, se tiver, nos obtemos o total.
   * Vamos declarar uma variavel total, iniciando-a com 0. Por quê? Porque, se o dia, referente
   * ao loop, nao tiver, dentro da lista de dados, um Lancamento com o dia correspondente, entao
   * vai ficar com 0 o total. E qual o for() que iremos procurar por isso: se o dia tem algum 
   * Lancamento na lista de dados? Vamos definir um outro for() interno. Se tiver o dia, o total
   * vai receber o total do dado corrente.
   * Apos o loop interno, temos que adicionar o total em algum outro array. Da mesma forma que
   * temos um array de dias no metodo configurarDiasMes(), que eh o array que vai alimentar o labels,
   * nos precisamos tambem ter um array aqui para colocarmos os totais: tanto os totais que encontramos
   * dentro do loop interno, na lista de dados, quanto os totais que nao encontramos que, nesse caso,
   * ficarao com valor 0. Para isso, vamos declarar o array totais, que eh um array de number.
   * Fora do for() interno, dentro do primeiro for(), definimos totais.push(), passando o total.
   * Feito isso, retornamos esse array de totais.
   * Agora, nos podemos terminar a configuracao do Grafico de Linhas.
   * */
    for (const dia of diasDoMes) {
      let total = 0;
      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  /** Aula 23.05. Buscando Dados do Grafico de Linhas. 
   * 5. Este metodo vai devolver um array com os dias do mes
   * Por exemplo, se o mes tem 30 dias, entao serao 30 posicoes. Ai, cada posicao, a posicao
   * do indice 0 vai corresponder ao dia 1, indice 1 vai ser o dia 2 e assim ate chegar ate o ultimo
   * dia do mes. **/
  private configurarDiasMes() {
  /** Aula 23.05. Buscando Dados do Grafico de Linhas. 
   * 6. Vamos comecar criando uma variavel chamada mesReferencia, do tipo Date. Eh a data atual.
   * */
    const mesReferencia = new Date();
    /** Aula 23.05. Buscando Dados do Grafico de Linhas. 
     * 7. Para pegarmos a quantidade de dias do mes, de uma maneira simples. Vamos setar, em
     * mesReferencia, o mes que vem.
     * */
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    /** Aula 23.05. Buscando Dados do Grafico de Linhas.
     * 8. Feito isso, vamos setar o dia do mes de referencia para 0.
     * */
    mesReferencia.setDate(0);
    /** Aula 23.05. Buscando Dados do Grafico de Linhas.
     * 9. Agora, nos conseguimos obter a quantidade de dias a partir do metodo getDate().
     * Quando seta o mes para o mes que vem e, depois, seta a data, ou seja, o dia, para 0,
     * vamos supor que estejamos em Janeiro. Entao, nos setamos para Fevereiro e, ao inves de
     * setar para o dia Primeiro do mes, nos setamos para o dia 0. Dessa forma, ao inves de ir para
     * o dia Primeiro de Fevereiro, a data vai ser setada para o Ultimo dia do Mes Anterior, ou seja,
     * 31 de Janeiro. Entao, se nos estamos no Ultimo Dia do Mes Anterior e nos obtemos esse Dia,
     * nos vamos obter a quantidade de dias daquele mes, porque a data eh equivalente ao Ultimo Dia
     * do mes corrente.
     * */
    const quantidade = mesReferencia.getDate();
    /** Aula 23.05. Buscando Dados do Grafico de Linhas.
     * 10. Com isso, nos so precisamos, agora, ter um array de dias, do tipo number, onde nos
     * iremos definir os dias.
     * */
    const dias: number[] = [];
    /** Aula 23.05. Buscando Dados do Grafico de Linhas.
     * 11. E, aqui, nos iremos iterar com um for(), comecando do 1, porque o mes comeca a partir do
     * dia 1. Vamos incluir os dias com o indice i, chamando o metodo push(), no array de dias.
     * */
    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    /** Aula 23.05. Buscando Dados do Grafico de Linhas.
     * 12. E, agora, nos retornamos o array de dias.
     * Agora, podemos voltar ao metodo configurarGraficoLinha(). Em labels, pode-se chamar, entao, o
     * metodo configurarDiasMes()
     * */
    return dias;
  }

}

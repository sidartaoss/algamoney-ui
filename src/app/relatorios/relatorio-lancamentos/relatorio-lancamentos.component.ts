import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  /**
   * Aula 23.08. Configurando Formulário do Relatório
   * 15. Vamos definir as propriedades periodoInicio e periodoFim, conforme
   * definido em relatorio-lancamentos.component.html.
   */
  periodoInicio: Date;
  periodoFim: Date;

  constructor(
    private relatoriosService: RelatoriosService
  ) { }

  ngOnInit() {
  }

  /**
   * Aula 23.08. Configurando Formulário do Relatório
   * 16. Vamos definir o metodo gerar(), que vai apenas imprimir 
   * as duas propriedades para termos certeza que o valor esta chegando aqui
   * corretamente.
   * Voltar em relatorio-lancamento.component.html para definir o evento.
   */
  /**Aula 23.09. Exibindo o PDF para o Usuario
   * 13. O metodo gerar() vai invocar o metodo relatorioLancamentosPorPessoa
   * la do Servico RelatorioService que acabamos de criar.
   * 
   * 14. A primeira coisa que iremos fazer eh injetar o Servico RelatorioService
   * no Construtor.
   * 
   * 15. Agora, no metodo gerar, a gente vai comentar os logs e vamos chamar o metodo
   * relatorioLancamentosPorPessoa de relatoriosService, passando as datas de inicio
   * e fim, ou seja, passando this.periodoInicio e this.periodoFim.
   * 
   * 16. Vamos, em seguida, chamar o metodo then(). Como parametro, vamos receber
   * o relatorio em PDF, ou seja, declarar o parametro de retorno como relatorio 
   * e definir a arrow function.
   * 
   * 17. Agora, iremos definir como vamos exibir o relatorio PDF para o Usuario
   * dentro da arrow function. Vamos, primeiramente, declarar a variavel local
   * url:
   * const url = window.URL.createObjectURL, passando, como parametro, o relatorio
   * que foi recebido no parametro da arrow function.
   * 
   * 18. Em seguida, declaramos:
   * window.open();, passando a URL.
   * 
   * 19.1. Dessa forma, a gente ja tem condicoes de fazer um teste. Podemos levantar o
   * servidor: ng serve.
   * 19.2. Acessar no Browser: http://localhost:4200/relatorios/lancamentos
   * 19.3. Data inicial: 01/01/2018, Data final: 01/12/2018. Clicar no botao Gerar.
   * 19.4. Eh aberto uma nova Aba no Browser com a Popup com a Pagina do Relatorio de
   * Lancamentos Por Pessoa em PDF, que foi o Relatorio que foi construido na parte de
   * Backend quando trabalhamos com o JasperSoft.
   * 
   *  
   */
  gerar() {
    /**
    console.log(this.periodoInicio);
    console.log(this.periodoFim);
    */
    this.relatoriosService.relatorioLancamentosPorPessoa(
        this.periodoInicio, this.periodoFim)
        .then(relatorio => {
          const url = window.URL.createObjectURL(relatorio);

          window.open(url);
        });
  }

}

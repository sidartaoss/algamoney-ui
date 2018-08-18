import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/api';
/** import { ToastyService } from 'ng2-toasty'; **/
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  /** Variavel de instancia totalRegistros: quantos registros a nossa consulta retornou.
   * Precisa disso para a tabela de dados do PrimeNG. Precisa fornecer o numero total de
   * regitros que tem no banco de dados para o DataTable calcular quantas paginas
   * precisa renderizar.
   */
  totalRegistros = 0;

  filtro = new LancamentoFiltro();
  /** Declarar variavel de instancia descricao. De onde vai vir essa descricao? Da tela. Vai ser 
   * feito um binding dessa propriedade usando ng-model.
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina: Number;
  /** Problema: Buscar dinamicamente.
   * Solução: Criar uma Classe de Servico, usando o Angular CLI.
  */
  lancamentos = [];
  /** Quero referenciar alguma coisa da minha View (filho da minha View). O nome
   * 'tabela' estah vinculado com o nome do DataTable '#tabela'.
   * Fazendo isso, consegue ter acesso ao objeto que representa o componente de 
   * DataTable do PrimeNG. DataTable estah sendo representado pela variavel grid.
   */
  @ViewChild('tabela') grid;

  /**
   * Aula 25.06. Usando o Growl
   * 
   * 14. Para substituir a biblioteca Toasty pelo Growl do PrimeNG, nos vamos ter que alterar nos pontos onde a mensagem eh adicionada,
   * Essas mensagens sao adicionadas nas Classes dos Componentes.
   * 
   * 15. Vamos, primeiramente, alterar, no Construtor, ToastyService por MessageService.
   * 
   * 16. Agora, vamos corrigir o metodo excluir para substituir toastyService por messageService, 
   * this.messageService.add( { severity : 'success', detail : '' } )
   * 
   * 17. Agora, vamos corrigir a Classe PessoaCadastroComponent.
   * Ver pessoa-cadastro-component.ts.
   */
    /** Injetar o Servico LancamentoService */
  constructor(
        private lancamentoService: LancamentoService,
        /** private toasty: ToastyService, **/
        private messageService: MessageService,
        private confirmation: ConfirmationService,
        private errorHandler: ErrorHandlerService,
/**
 * O titulo da pagina esta fixo: AlgaMoney. De onde vem o titulo? Vem do arquivo index.html do projeto. Elemento <title/>. Nesse caso, nao eh possivel utilizar interpolacao, porque o elemento esta dentro do head do documento e esta fora do corpo (<body/>), por isso esta inacessivel ao databinding do Angular.

Como colocaria esse titulo dinamico, de forma que, a medida que se navega no sistema, consiga-se alterar o titulo de maneira dinamica para dar uma experiencia melhor para o Usuario?

Eh um pequeno detalhe, mas que ajuda o Usuario a fazer a navegacao no Sistema.

Para fazer isso, o Angular fornece um Servico que pode ser usado para alterar o titulo do documento dinamicamente.

Primeiramente, injetar o Servico no Construtor.
 * 
 * */      
      private title: Title,
      private auth: AuthService
      ) {}

  ngOnInit(): void {
    /** Nao eh mais necessario chamar pesquisar(), pois foi definido o metodo 
     * aoMudarPagina(), que eh chamado automaticamente ao carregar a pagina.
     */
    /** this.pesquisar(); **/

    /**Alem de definir setTitle(), eh necessario registrar o Servico Title, adiciona-lo
     * nos Providers de algum modo. Deseja-se que o Servico seja fornecido para toda a 
     * Aplicacao, entao sera definido no CoreModule, secao Providers.
    */
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  /** Criar um metodo pesquisar() */
  /** Colocar no metodo pesquisar() para receber o numero da pagina que queremos
   *  que pesquise. Por padrao, definir 0. Se nao for informado a pagina,
   * por padrao fica 0.
   */
  pesquisar(pagina = 0) {
    /** A pagina que recebi por parametro vai atribuir para a pagina do filtro. */
    this.filtro.pagina = pagina;    
    /** Declarar uma variavel chamada filtro do tipo LancamentoFiltro 
     * jah instanciando um novo objeto.
     * Precisa declarar as propriedades.
     * Instanciando um objeto filtro
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoDe: this.dataVencimentoDe,
      dataVencimentoAte: this.dataVencimentoAte,
      pagina: this.pagina;

    };

    /** Passar, como parametro, a propriedade (objeto) descricao */
    /** Ao inves de passar como parametro o objeto literal, passar objeto filtro */
    /** this.lancamentoService.pesquisar( { descricao: this.descricao }) **/
    this.lancamentoService.pesquisar(this.filtro)
    /** Receber o array de Lancamentos. */
        /** .then(lancamentos => this.lancamentos = lancamentos); 
         * O metodo then() eh chamado na Promessa. (Retorna Promise) **/
        .then(resultado => {
            this.totalRegistros = resultado.total;
            this.lancamentos = resultado.lancamentos;
        })
        /** Chamar o metodo catch para tratar possivel erro na chamada do Servico,
         * recebendo, como parametro, uma arrow function.
         * Chamar o ErrorHandlerService; para isso, injetar no Construtor.
         * Chamar o metodo handle, passando o erro.
         */
        .catch(erro => this.errorHandler.handle(erro));
  }

  /** event eh o nome do parametro
   * O tipo eh LazyLoadEvent
   */
  aoMudarPagina(event: LazyLoadEvent) {
    /** Qual eh a pagina atual que estah buscando atraves da paginacao na tabela de dados. */
    const pagina = event.first / event.rows;
    /** console.log(event); **/
    /** Chamar pesquisar() passando o numero da pagina. */
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza de que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  /** Receber como parametro o objeto lancamento, do tipo any, porque nao estamos
   * tipando esse lancamento. */  
  excluir(lancamento: any) {
    /** Antes de chamar o servico para excluir, adicionar uma confirmacao.  */
    /** Injetar ConfirmationService no Construtor.
     * ConfirmationService eh um Servico que a gente usa para se comunicar com o Componente
    * de Confirmacao. */

    /** Metodo confirm() vai se comunicar com o Componente de Confirmacao para
     * abrir o Dialogo. Ainda nao usamos o Componente, serah necessario adicionar o
     * componente em nosso template.
     * confirm() recebe um objeto e, dentro desse objeto, tem uma propriedade chamada
     * message, que eh a pergunta a ser feita para o Usuario.
     * Propriedade accept eh um callback: a gente passa uma funcao que vai ser chamada
     * quando o Usuario aceitar a confirmacao: se o Usuario clicar em Sim, essa funcao 
     * serah chamada. Vai definir um arrow function para definir o que a gente quiser 
     * executar dentro dele:
     * accept: () => {
     *  // o que desejar executar aqui dentro.
     * };
    this.confirmation.confirm({
      message: 'Tem certeza de que deseja excluir?',
      accept: () => {

      }
    });
    */
    this.lancamentoService.excluir(lancamento.codigo)
      /** Chamar metodo then() para definir o que fazer quando um lancamento for excluido. */
      /** Somente depois de excluir com sucesso que chama o metodo then(). */
        .then(() => {
          /** Poderia exibir uma mensagem de sucesso. 
           * Quando excluir, tem que recarregar os dados na tabela de dados.
          */
         /** console.log('Excluido'); **/
         /** this.pesquisar(); **/
        /** Ao inves de chamar o pesquisar(), vai chamar grid. first eh uma 
         * propriedade do DataTable do PrimeNG. Atribuindo 0, estah dizendo
         * que eu quero que essa tabela de dados exiba a partir do registro 0
         * da tabela de dados.
        */
       /** Verificar se estah exibindo a partir do registro 0, ou seja, se
        * estah na primeira pagina. Se sim, chamar o metodo pesquisar().
        * Adicionando essa condicao porque nao estava chamando o metodo 
        * pesquisar() quando estava na pagina 1.
        */
          if (this.grid.first === 0) {
              this.pesquisar();
          } else {
            /** Se nao estiver na primeira pagina, vai para a primeira pagina
              * no primeiro registro: comece exibindo a partir do registro 0. */
            this.grid.first = 0;
            /** O que eh o registro 0? O registro 0 estah na primeira pagina.
             * Quando fizer isso, automaticamente o onLazyLoad() vai disparar,
             * chamando o metodo aoMudarPagina().
             */         
          }

          /** Adicionar a mensagem no Sucesso da Exclusao. */
          /** Usar Componente Toasty.
           * Para isso, injetar no Construtor deste Componente um ToastyService.
           */
          /** this.toasty.success('Lançamento excluído com sucesso!'); **/
          this.messageService.add( { severity : 'success' , detail : 'Lançamento excluído com sucesso!' } );

        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  buscarPorCodigo(codigo: number) {
    return this.lancamentoService.buscarPorCodigo(codigo)
        .then((lancamento) => {
          console.log(lancamento);
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  /**
  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2017, 5, 30),
      dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
    { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2017, 5, 10),
      dataPagamento: new Date(2017, 5, 30), valor: 80000, pessoa: 'Atacado Brasil' },
    { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2017, 6, 20),
      dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
    { tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: new Date(2017, 5, 5),
      dataPagamento: new Date(2017, 4, 30), valor: 800, pessoa: 'Escola Abelha Rainha' },
    { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2017, 7, 18),
      dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza' },
    { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2017, 6, 10),
      dataPagamento: new Date(2017, 6, 9), valor: 1750, pessoa: 'Casa Nova Imóveis' },
    { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2017, 6, 13),
      dataPagamento: null, valor: 180, pessoa: 'Academia Top' }
  ];
  **/
}

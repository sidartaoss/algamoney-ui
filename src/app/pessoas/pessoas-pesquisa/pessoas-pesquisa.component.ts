import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from '../../../../node_modules/primeng/components/common/messageservice';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela2') grid; 

/**
   * Aula 25.06. Usando o Growl
   * 
   * 22. Para substituir a biblioteca Toasty pelo Growl do PrimeNG, nos vamos ter que alterar nos pontos onde a mensagem eh adicionada,
   * Essas mensagens sao adicionadas nas Classes dos Componentes.
   * 
   * 23. Vamos, primeiramente, alterar, no Construtor, ToastyService por MessageService.
   * 
   * 24. Agora, vamos corrigir os metodos excluir(), mudarStatus()
   * this.messageService.add( { severity : 'success', detail : '' } )
   * 
   * 25. Agora, ja podemos testar, http://localhost:4200/pessoas.
   * 
   * 26. Deu um erro, 
   * ERROR Error: StaticInjectorError(AppModule)[AppComponent -> ToastyConfig]: 
   * StaticInjectorError(Platform: core)[AppComponent -> ToastyConfig]: 
   * NullInjectorError: No provider for ToastyConfig!
   * 
   * 27. Na Classe app-component.ts, tem algumas configuracoes nele e a gente pode remover, porque a gente nao precisa mais 
   * da biblioteca ng2-toasty.
   * Ver app-component.ts.
   * 
   * 28. Okay, vamos testar novamente, http://localhost:4200/pessoas.
   * 
   * 29. Mais um erro,
   * AppComponent.html:1 ERROR Error: StaticInjectorError(AppModule)[Growl -> MessageService]: 
   * StaticInjectorError(Platform: core)[Growl -> MessageService]: 
   *  NullInjectorError: No provider for MessageService!
   *  at NullInjector.push../node_modules/@angular/core/fesm5/core.js.NullInjector.get
   * 
   * 30. Sem provedor para MessageService. Em CoreModule, core-module.ts, esta faltando definir, na Secao Providers, MessageService.
   * Ver core-module.ts.
 */
  constructor(
    private pessoaService: PessoaService,
    private confirmation: ConfirmationService,
    /** private toasty: ToastyService, **/
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
        .then(resultado => {
          this.totalRegistros = resultado.total;
          this.pessoas = resultado.pessoas;
        })
        .catch(erro => {
          this.erroHandler.handle(erro)
        });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const paginaAtual = event.first / event.rows;
    this.pesquisar(paginaAtual);
  }

  mudarStatus(pessoa: any, event: LazyLoadEvent) {    
    return this.pessoaService.mudarStatus(pessoa.codigo, pessoa.ativo)
      .then(() => {
        this.aoMudarPagina(event);
        if (pessoa.ativo) {
          /** this.toasty.success('Pessoa desativada com sucesso!'); **/
          this.messageService.add( { severity : 'success', detail : 'Pessoa desativada com sucesso!' } );
        } else {
          /** this.toasty.success('Pessoa ativada com sucesso!'); **/
          this.messageService.add( { severity : 'success', detail : 'Pessoa ativada com sucesso!' } );
        }
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza de que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    return this.pessoaService.excluir(pessoa.codigo)
        .then(() => {
          if (this.grid.first === 0) {
            this.pesquisar();
          } else {
            this.grid.first = 0;
          }
          /** this.toasty.success('Pessoa excluída com sucesso!'); **/
          this.messageService.add( { severity : 'success', detail : 'Pessoa excluída com sucesso!' } );
        })        
        .catch(erro => this.erroHandler.handle(erro));
  }
  
  /**
  pessoas = [
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
    { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false },
    { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true },
    { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
    { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
    { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', ativo: true }
  ];
  **/
}

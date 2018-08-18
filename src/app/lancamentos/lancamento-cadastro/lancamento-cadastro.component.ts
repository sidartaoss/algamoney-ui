import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/** Aula 21.9: Usando a Propriedade formGroup 
 * Remover FormControl **/
/** import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'; **/
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

/** import { ToastyService } from 'ng2-toasty'; **/
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  /**
  categorias = [
    { label: 'Alimentação', value: 1 },
    { label: 'Transporte', value: 2 },
  ];
  */
 categorias = [];

  /**
  pessoas = [
    { label: 'João da Silva', value: 4 },
    { label: 'Sebastião Souza', value: 9 },
    { label: 'Maria Abadia', value: 3 },
  ];
  */
 pessoas = [];

 lastRecord = 0;

 /** Criar uma Classe de Modelo que representa um Lancamento.
  *  Criar a Classe de Modelo dentro do modulo Core no arquivo model.ts
  *  Instanciar Lancamento. Agora, fazer os Bindings nos inputs 
  *  na tela lancamento-cadastro.component.html.
  */
 /** Aula 21.9: Usando a Propriedade formGroup 
  * Continuando com o nosso Formulario Reativo, agora, nos vamos alterar onde a propriedade 
  * lancamento estiver sendo utilizada, nos vamos utilizar a propriedade formulario.
 */
 /** lancamento = new Lancamento(); **/
 /**
  * Aula 21.7: Formularios Reativos

  * Vamos comecar a parte de Formularios Reativos. Ate esta aula, a gente tinha utilizado, dentro do 
  * Curso, somente o Formulario Orientado a Template. E a gente vai comecar agora a utilizar Formulario 
  * Reativo. Na pratica, o que a gente vai fazer nas proximas aulas eh pegar a nossa Pagina de Cadastro 
  * de Lancamento e a gente vai transformar aquele Formulario Orientadoa Template em um Formulario 
  * Reativo. E por que desse nome Reativo? Por que chamamos esse Formulario de Reativo? A questao eh 
  * que eles nos dao mais controle, mais liberdade para trabalhar com o nosso Formulario e, obviamente, 
  * com as propriedades do nosso formulario. E, com isso, a gente consegue reagir melhor aos eventos 
  * do Usuario. A gente consegue definir uma validacao mais complexa, a gente tem ali mais controle 
  * justamente pela diferenca principal dele quanto ao Formulario Orientado a Template. E a diferenca 
  * eh que ele eh programatico, ao inves de a gente trabalhar com os atributos no HTML, por exemplo, 
  * o ngModel, o atributo required, o atributo maxlength, ao inves de a gente trabalhar com esses 
  * atributos, a gente vai fazer isso de forma programatica. Entao, la na nossa classe que controla o 
  * nosso componente, a gente vai construir esse formulario atraves de algumas classes, como FormGroup, 
  * FormControl, FormBuild, sao classes que veremos nas proximas aulas.

  * Vantagens desse formulario. Temos mais controle e conseguimos fazer validacoes customizadas, mas
  * tambem podem ser desvantagens, porque, como ele eh programatico, a gente tem, ali, um pouquinho 
  * de trabalho a mais para poder cria-lo. Entao, imaginando que queremos criar um CRUD, uma tela 
  * muito simples, eh mais recomendavel o Formulario Orientado a Template. Agora, se tivermos uma tela 
  * com validacoes mais complexas ou uma tela em que se precise ter um controle melhor para trabalhar 
  * com os atributos do formulario, para responder melhor aos eventos do Usuario, entao o Formulario 
  * Reativo eh mais recomendavel.


  * Aula 21.8: Criando um Formulario Reativo

  * Nesta aula, vamos implementar o nosso formulario reativo. Vamos pegar o Cadastro de Lancamentos e 
  * fazer a alteracao dele de um Formulario Orientado a Template para Formulario Reativo. Mas, antes de 
  * mexermos no Componente, nos vamos abrir o modulo de Lancamento para importarmos o Modulo Reativo, 
  * de Formmulario Reativo: ReactiveFormsModule e nos precisamos dele para trabalhar com essas 
  * funcionalidades de Formularios Reativos. Na Secao imports, nos vamos definir tambem o 
  * ReactiveFormsModule.

  * Agora, podemos ir para o Componente, lancamento-cadastro.component.ts, para: 1. Configurar o nosso 
  * formulario reativo; 2. Alterar os metodos da Classe para, ao inves de usar a propriedade lancamento, 
  * que era a que estava sendo utilizada para definir os valores que o Usuario preenchia no formulario, 
  * para obter o valor que vem do web service e preencher o formulario de edicao, etc., entao, nos vamos 
  * substituir essa propriedade pela propriedade que nos vamos criar referente ao nosso formulario reativo. 

  * Vamos, entao, comecar criando a propriedade do formulario reativo. Vamos chamar a nova propriedade
  * de formulario.
  * 
  * Agora, nos vamos criar um metodo chamado configurarFormulario(). Dentro desse metodo, nos vamos
  * configurar o formulario. Vamos chama-lo a partir do metodo ngOnInit().
  * 
  * Outra Classe que vamos precisar e ja vamos importar eh o FormBuilder, que vai nos ajudar a criar
  * as instancias, sendo assim, vamos injeta-lo no Construtor.
  */ 
 formulario: FormGroup;
 /**
  * Aula 23.22. Utilizando o Componente ProgressSpinner
  * 6. Criar a propriedade uploadEmAndamento, do tipo boolean, inicializando com o valor false;
  * 
  * 7. No metodo antesUploadAnexo(), que eh onde o Upload comeca, a gente seta o nosso token e, tambem, seta 
  * a propriedade this.uploadEmAndamento para true.
  * 
  * 8. Quando der erro ou quando terminar com sucesso, que sao os metodos: erroUpload() e aoTerminarUploadAnexo(), 
  * nesses dois casos nos vamos voltar o valor da propriedade this.uploadEmAndamento para false.
  * Voltar para lancamento-cadastro.component.html.
  */
 uploadEmAndamento = false;

 /**
 * Aula 25.06. Usando o Growl
 * 
 * 8. Para substituir a biblioteca Toasty pelo Growl do PrimeNG, nos vamos ter que alterar nos pontos onde a mensagem eh adicionada,
 * Essas mensagens sao adicionadas nas Classes dos Componentes.
 * 
 * 9. Vamos, primeiramente, alterar, no Construtor, ToastyService por MessageService.
 * 
 * 10. Agora, vamos corrigir no metodo erroUpload() this.toastyService por this.messageService, chamando o metodo add(), passando
 * como parametro um objeto {} com as propriedades severity e detail.
 * 
 * 11. Agora, vamos corrigir, da mesma forma, no metodo adicionarLancamento(), 
 * this.messageService.add( { severity : 'success' : detail : '' } );
 * 
 * 12. Agora, vamos corrigir, da mesma forma que o Passo 11, no metodo atualizarLancamento().
 * 
 * 13. A proxima Classe que vamos corrigir eh lancamento-pesquisa.component.ts.
 * Ver lancamento-pesquisa.component.ts.
 */
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    /** private toastyService: ToastyService, **/
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.title.setTitle('Novo lançamento');
    /** Pegar o parametro passado na URL para imprimir no console. Para pegar o parametro, 
     * injetar no Construtor o ActivatedRoute. A partir dele, a gente consegue pegar qual que 
     * foi a rota ativada em dado momento.
     */
    /** Pegar todos os parametros. */
    console.log(this.route.snapshot.params);
    /** Acessar o valor da propriedade codigo dentro do array de objetos */
    /** console.log(this.route.snapshot.params['codigo']); **/
    const codigoLancamento = this.route.snapshot.params['codigo'];
    /** Verificar se valor diferente de undefined */
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();
    this.buscarUltimoRegistro();
  }

  /**
   * Aula 23.19. Upload com Componente FileUpload
   * 10. Aqui, tambem vamos criar o metodo com o mesmo nome que em lancamento.service.ts: urlUploadAnexo(), so que
   * no estilo para que a gente use o metodo no nosso HTML, ou seja, em lancamento-cadastro.component.html, como uma
   * propriedade, ou seja, definindo a palavra-chave get.
   * Aqui, vamos utilizar o Servico this.lancamentoService, chamando o metodo urlUploadAnexo() que definimos no Passo 9.
   * Voltar para lancamento-cadastro.component.html.
   * 
   * 18. Vamos definir o metodo antesUploadAnexo(), passando o evento como
   * parametro, antesUploadAnexo(event), porque, atraves desse evento que esta sendo passado como parametro, nos vamos ter 
   * acesso a Requisicao e vamos poder setar o nosso Token para essa Requisicao que o Componente <p-fileUpload> vai fazer.
   * No corpo do metodo, vamos definir essa alteracao, que eh bem simples:
   * event.xhr.setRequestHeader(), setando, como parametro, o nosso Token: 'Authorization', com o valor que vai ser:
   * 'Bearer ' e vamos pegar o valor de localStorage, invocando o metodo getItem(). O nome do Token, que deve ser passado como
   * parametro, eh 'token'.
   * Voltar para lancamento-cadastro.component.html.
   * 
   */
  get urlUploadAnexo() {
    /** return this.lancamentoService.urlUploadAnexo(); **/
    /** return this.lancamentoService.urlUploadAnexo() + '/naoexiste'; **/
    return this.lancamentoService.urlUploadAnexo();
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = JSON.parse(event.xhr.response);
    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });
    this.uploadEmAndamento = false;
  }

  /**
   * Aula 23.21. Tratando Erro de Upload
   * 3. Criar o metodo erroUpload(event).
   * Aqui, se tiver um erro, o que vamos fazer eh dar um feedback par o Usuario, definindo o componente de mensagem:
   * this.toasty. Vamos definir uma mensagem de erro: this.toastyService.error('Erro ao tentar enviar anexo!')
   * 
   * 4. Agora, para podermos simular, testar um erro, nos vamos pegar um metodo que devolver a URL, get urlUploadAnexo() e
   * vamos concatenar com alguma coisa que sabemos que nao existe
   *  return this.lancamentoService.urlUploadAnexo() + '/naoexiste';
   * para dar um erro. Dessa forma, estamos simulando um erro.
   * 
   * 5. Abrir o Browser: http://localhost:4200/lancamentos/1, F12 para ser exibido a Console do Browser, clicar no botao Anexar.
   * Eh exibido a mensagem: 'Erro ao tentar enviar anexo!'. No Console do Browser, aparece Erro HTTP 404.
   * 
   * 6. Dessa forma, nos tratamos, ou seja, demos um feedback para o Usuario caso tenha algum erro na tentativa de anexar o Arquivo.
   * Fim da Aula 23.21. Tratando Erro de Upload.
   */
  erroUpload(event) {
    /** this.toastyService.error('Erro ao tentar enviar anexo!'); **/
    this.messageService.add( { severity : 'error', detail : 'Erro ao tentar enviar anexo!' } );
    this.uploadEmAndamento = false;
  }

  /**
   * Aula 23.24. Salvando e Removendo Anexo
   * 6. Criar o metodo removerAnexo(), para remover o arquivo de anexo do formulario, 
   * em lancamento-cadastro.component.html.
   * Invocar o metodo patchValue(), passando um objeto com as propriedades anexo e urlAnexo como null.
   * Vamos adicionar a propriedade urlAnexo, mas acreditamos que nao seje necessario, pois, no backend, o que vale eh o que
   * esta definido na propriedade anexo, mas vamos definir so para garantir.
   * Voltar para lancamento-cadastro.component.html.
   */
  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    })
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;
    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }
    return '';
  }

  /**
   * Aula 23.20. Fazendo Download do Anexo
   * 
   * 6. Outro lugar em que sera necessario alterar, para a definicao do atributo href na tag de link <a> para poder se fazer o
   * Download do anexo, eh no metodo configurarFormulario().
   * 
   * 7. Vamos definir mais duas propriedades: anexo, como um array vazio e urlAnexo, tambem como um array vazio.
   * Nao eh necessario definir-se validacao para esses campos.
   * Voltar para lancamento-cadastro.component.html.
   * 
   * 12. Criar o metodo aoTerminarUploadAnexo(), recebendo, como parametro, o evento.
   * A primeira coisa que faremos, nesse metodo, eh declarar uma propriedade que chamaremos de anexo, onde vamos pegar a 
   * resposta desse Upload: 
   * const anexo = event.xhr.response
   * Entao, vai funcionar assim: pega-se essa responsta de event.xhr.response. So que essa resposta event.xhr.response ainda nao
   * eh no formato como um objeto Javascript. Entao, nos vamos utilizar:
   * const anexo = JSON.parse()
   * passando a resposta:
   * const anexo = JSON.parse(event.xhr.response)
   * para o JSON fazer o parser para nos.
   * Feito o parser, agora, vamos pegar a propriedade formulario: this.formulario, invocando o metodo patchValue:
   * this.formulario.patchValue(), passando um objeto com as duas propriedades, uma que eh anexo, onde o valor sera anexo.nome
   * e a outra propriedade que eh urlAnexo, onde o valor sera anexo.url.
   * Voltar para lancamento-cadastro.component.html.
   * 
   * 25. Criar o metodo get nomeAnexo().
   * Atribuir this.formulario.get('anexo').value a uma variavel local, const nome:
   * const nome = this.formulario.get('anexo');
   * Se tem nome, ou seja, se nome nao eh nulo, retornar: nome.substring(), de nome.indexOf('_') + 1 ate nome.length.
   * if (nome) {
   *    return nome.substring(nome.indexOf('_') + 1, nome.length);
   * }
   * Caso nao tenha o nome, retornar uma string vazia.
   * Voltar para lancamento-cadastro.component.html.
   */
  /** Metodo para construir o Formulario Reativo */
  configurarFormulario() {
    /** this.formulario vai receber o que for construido com FormBuilder e
     * vamos chamar o metodo group(), que vai devolver uma instancia da Classe FormGroup.
     */
    this.formulario = this.formBuilder.group({
      /** Vamos configurar aqui as nossas propriedades. Como que a gente configura as propriedades?
       * Aqui nos definimos a propriedade, por exemplo, codigo, e definimos um array, na primeira
       * posicao desse array eh o valor inicial, aqui vamos deixar nulo, e, na segunda posicao, eh a 
       * validacao que esse campo vai sofrer. Entao, como codigo nao vai ter validacao, entao nao 
       * vamos definir nada, vamos deixar um array nulo. Podemos, inclusive, deixar o array vazio.
       */
          codigo: [],
          /** Aqui, na propriedade tipo, o valor inicial vai ser a unica propriedade que ja inicia com um
           * valor, que eh 'RECEITA'. E ele vai ter validacao do tipo required e, para fazer a validacao, 
           * vamos importar uma outra Classe chamada 
           * Validators, que ja contem os metodos para a gente fazer a validacao.
           * Se quisermos validar com required, definimos Validators.required
           */
          tipo: ['RECEITA', Validators.required],
          /** A propriedade dataVencimento vai comecar com nulo e a validacao vai ser required. */
          dataVencimento: [null, Validators.required],
          /** A propriedade dataPagamento nao precisa nem de validacao nem de valor incial. */
          dataPagamento: [],
          /** A propriedade descricao tem o valor inicial nulo e validacoes required e minlength. 
           * No segundo parametro, ao inves de passar a validacao diretamente, vamos passar um outro
           * array. Dentro desse array, vamos passar duas validacoes: Validators.required e 
           * Validators.minLength
          */
          /** 
           * Aula 21.11. Criando Validações Customizadas

           * Nesta aula, vamos criar um validador customizado, na verdade, vamos criar dois. Por que estamos querendo substituir 
           * as validacoes ao inves de criar validacoes novas? É porque queremos manter o formulario com as regras que ele ja tem. 
           * E, para mantermos o formulario com as regras que ele ja tem e a gente conseguir colocar essa funcionalidade aqui dentro, 
           * uma forma bacana eh substituir validacoes dentro do proprio formulario de Cadastro por validacoes nativas, customizadas 
           * que fazem a mesma coisa.

           * Vamos substituir, primeiramente, a validacao required, da propriedade descricao. Para isso, vamos criar o metodo 
           * validarRequerido().
           * **/
          /** descricao: [null, [Validators.required, Validators.minLength(5)]], **/
          /** Aula 21.11. Criando validacoes customizadas **/         
          descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
          /** A propriedade valor tem o valor inicial nulo. A validacao vai ser Validators.required.
           */
          valor: [null, Validators.required],
          /** Quanto as propriedade categoria e pessoa, elas sao objetos. Elas nao sao propriedades diretas
           * de Lancamento, sao objetos que tem as suas sub-propriedades. Para configurarmos-lhes, definimos
           * pessoa: e, entao, nos vamos criar novamente o grupo.
           */
          pessoa: this.formBuilder.group({
            /** Aqui nesse grupo de pessoa, nos vamos definir as propriedades do objeto Pessoa. */
            /** A propriedade codigo tem o valor inicial nulo, mas tem a validacao required,
             * porque pessoa, dentro de Lancamento, eh required.
             */
            codigo: [null, Validators.required],
            /** A propriedade nome vai ter o array definido como vazio, sem validacao e sem valor inicial. */
            nome: []
          }),
          /** A mesma coisa de Pessoa sera definida para Categoria. */
          categoria: this.formBuilder.group({
            codigo: [null, Validators.required],
            nome: []
          }),
          /** A propriedade observacao nao vai ter nem valor inicial nem validacao */
          observacao: [],
          anexo: [],
          urlAnexo: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    /** Se input tem valor, retornar nulo, ou seja, nao tem validacao pendente, passou a validacao.
     * Se nao tem valor, tem a validacao de obrigatoriedade pendente.
     * Como que a gente faz? A gente define o nome da validacao, que eh obrigatoriedade e define como true.
     * O nome obrigatoriedade a gente vai usar na tag <app-message>. Antes de alterar o Template HTML, vamos
     * substituir, na propriedade descricao de formulario, por this.validarObrigatoriedade. Reparamos que nao sera
     * utilizado parenteses (), porque quem vai fazer a invocacao desse metodo eh a propria API do Formulario
     * Reativo, que vai fazer a invocacao e sera passado o input (FormControl).
     * Agora, vamos alterar o Template HTML (lancamento-cadastro.component.html).
     * 
     * Agora, vamos criar outra validacao para substituir a validacao MinLength com o metodo validarTamanhoMinimo().
     * 
     */
    return (input.value ? null : { obrigatoriedade: true });
  }

  /** valor: qual eh o valor do tamanho */
  validarTamanhoMinimo(valor: number) {
    /** Aqui, vamos definir uma arrow function, que eh o metodo que sera invocado
     * pela API de formulario reativo. Vamos receber o input e a gente vai poder, entao, validar.
     */
    return (input: FormControl) => {
      /** Se o input nao tem valor ou se esse valor eh maior ou igual ao que foi passado no parametro, entao
       * nao teremos validacoes pendentes, vamos retornar nulo. Caso contrario, vamos retornar o nome da validacao,
       * que eh tamanhoMinimo. Nao vai, simplesmente, valorar tamanhoMinimo com true, porque a tag de mensagem,
       * no Template HTML, define a propriedade errors.minlength.requiredLength: precisa simular essa hierarquia de
       * associacoes, definindo outro objeto ao inves de simplesmente retornar true.
       * Ver lancamento-cadastro.component.html.
       * 
       * * Agora, vamos criar outra validacao para substituir a validacao MinLength com o metodo validarTamanhoMinimo().
      */
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  /** Adicionar um Getter, um metodo Get. Vai retornar um booleano. */
  get editando() {
    /** Se tiver codigo, retorna true, senao retorna false */
    /** return Boolean(this.lancamento.codigo); **/
    
    /** Aula 21.9: Usando a Propriedade formGroup 
     * Continuando com o nosso Formulario Reativo, agora, nos vamos alterar onde a propriedade 
     * lancamento estiver sendo utilizada, nos vamos utilizar a propriedade formulario.
     * Como nos vamos pegar o codigo do formulario? Nos vamos substituir this.lancamento.codigo
     * por this.formulario.get('codigo').value.
    */
    return Boolean(this.formulario.get('codigo').value);
  }

  /**
   * Aula 21.9: Usando a Propriedade formGroup
   *  
   * No metodo salvar(), a gente nao precisa mais do parametro form, do tipo FormControl, porque a gente
   * ja tem acesso ao formulario daqui da nossa Classe LancamentoCadastroComponent, entao nao precisa
   * mais ser passado como parametro.
   */
  /** salvar(form: FormControl) { **/
  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  /** Vai receber a instancia do nosso formulario do ngForm. Passar, no form, 
   * (ngSubmit)="salvar(f). f eh a variavel definida do form. " */
  /**
   * Aula 21.9: Usando a Propriedade formGroup
   * 
   * Retirar o parametro form, do tipo FormControl, porque a gente
   * ja tem acesso ao formulario daqui da nossa Classe LancamentoCadastroComponent.
   */
  /** adicionarLancamento(form: FormControl) { **/
  adicionarLancamento() {
    /** console.log(this.lancamento); **/
    /** this.lancamento.codigo = this.lastRecord + 1; **/

    /** console.log(`this.lancamento.codigo: ${this.lancamento.codigo}`); **/
    /** this.lancamentoService.adicionar(this.lancamento) **/

    /** Aula 21.9: Usando a Propriedade formGroup 
     * O value for formulario sao, justamente, as propriedades referentes ao nosso Lancamento.
    */
    this.lancamentoService.adicionar(this.formulario.value)
      .then((lancamentoAdicionado) => {
        /** this.toastyService.success("Lançamento adicionado com sucesso!"); **/
        this.messageService.add( { severity : 'success', detail : 'Lançamento adicionado com sucesso!' } );
        // form.reset();
        // this.lancamento = new Lancamento();

        /** Direcionar o Usuario para uma outra View. Fazer uma Navegacao Imperativa. */
        /** Assim que o Usuario salvou, quer direcionar para Pesquisa de Lancamentos. */
        /** Para fazer isso, tem que importar o Router e injeta-lo no Construtor. 
         * A partir desse objeto, possibilita chamar o metodo navigate().
        */
       this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);

      })
      .catch(erro => this.errorHandler.handle(erro));    
  }

  /**
   * Aula 21.9: Usando a Propriedade formGroup
   * 
   * Retirar o parametro form, do tipo FormControl, porque a gente
   * ja tem acesso ao formulario daqui da nossa Classe LancamentoCadastroComponent.
   */  
  /** atualizarLancamento(form: FormControl) { **/
  atualizarLancamento() {
    /** Aula 21.9: Usando a Propriedade formGroup 
     * O value for formulario sao, justamente, as propriedades referentes ao nosso Lancamento.
    */    
    this.lancamentoService.atualizar(this.formulario.value)
      .then((lancamento) => {
        // this.lancamento = lancamento;
        /** Aula 21.9: Usando a Propriedade formGroup **/
        /** Aula 21.10: Configurando o HTML do formulário reativo. 
         * Ocorreu um erro Error: Cannot find form control with name: endereco. 
         * at FormGroup.push../node_modules/@angular/forms/fesm5/forms.js.FormGroup._throwIfControlMissing (forms.js:2867)
         * O metodo setValue eh um metodo assim: o que passarmos como parametro vai sobrescrever tudo o que esta configurado
         * no formulario. Entao, se quisermos zerar esse formulario, basta passarmos um objeto vazio:
         * this.formulario.setValue({});
         * Em contrapartida, de definirmos o metodo patchValue(), vamos atualizar somente o que estiver dentro do objeto sendo
         * passado como parametro. Apesar de o objeto Lancamento ter propriedades a mais, com o metodo patchValue, nao teremos
         * o erro acima, ja que nao estamos utilizando endereco na tela de Lancamento, ate porque nem faz sentido.
        */
        /** this.formulario.setValue(lancamento);**/
        this.formulario.patchValue(lancamento);
        /** this.toastyService.success("Lançamento alterado com sucesso!"); **/
        this.messageService.add( { severity : 'success' , detail: 'Lançamento alterado com sucesso!' } );
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  
  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        /** Precisa, para mostrar no dropdown, seguir o padrao do PrimeNG de retornar
         * sempre [label, value].
         * Então, precisa fazer uma transformacao do array de categorias do servico
         * para o array de categorias a ser exibido no dropdown.
         * Para fazer essa transformacao, vamos usar o metodo map() do array.
         * O metodo map() itera em todos os elementos do array, chamando uma funcao a ser
         * passada como parametro para cada elemento que iterou.
         * A funcao a ser implementada dentro do map() vai retornar um objeto e o map()
         * vai criar um novo array com esses novos objetos que forem retornados.
         * Ou seja, o map() retorna um array com elementos novos que serao atribuidos ao
         * array categorias do dropdown.
         */
        /** c: cada elemento que tiver dentro de categorias, vai receber uma chamada
         * na arrow function passando, como parametro, c.
         */
        /**
        this.categorias = categorias.map(c => {
          /** Vai retornar o objeto no padrao PrimeNG. 
           * Vai retornar um novo array de categorias, porem com objetos 
           * com propriedades label e value.
          return { label: c.nome, value: c.codigo };
        });
        */
        /** A abreviacao: */
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }))
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  /**
   * Aula 21.9: Usando a Propriedade formGroup
   * 
   * Retirar o parametro form, do tipo FormControl, porque a gente
   * ja tem acesso ao formulario daqui da nossa Classe LancamentoCadastroComponent.
   */  
  novo() {
    /** Como faz para limpar o Formulario? */
    /** Limpa o Formulario com reset() */
    /** form.reset();**/
    /** Aula 21.9: Usando a Propriedade formGroup */
    this.formulario.reset();

    /** Usar setTimeout() como workaround para os botoes RECEITA/DESPESA que
     * ficam sem selecao.
     * setTimetout() e um metodo do Javascript: executar uma funcao apos um tempo
     * especificado. Funcao vai ser executada apos 1 milissegundo.
     * 
     * O this, de this.lancamento, dentro da funcao, nao esta referenciando a instancia, 
     * o objeto LancamentoCadastroComponent, porque esta dentro de uma outra funcao.
     * 
     * Para resolver isso, usar uma funcao do JavaScript chamada
     * bind(this) para definir que o escopo de execucao desse funcao eh
     * o this de LancamentoCadastroComponent. Agora eh como se estivesse passando o 
     * this de LancamentoCadastroComponent para a funcao.
     */
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    /** Instancia um novo Lancamento */
    // this.lancamento = new Lancamento();

    /** Quando o Usuario clicar no botao Novo, chamar o metodo novo() e este metodo
     * vai navegar o usuario para /lancamentos/novo.
     * Limpou o formulario porque fez a navegacao do Usuario para /lancamentos/novo.
     * Quando fizemos essa navegacao, o componente LancamentoCadastroComponent, aquela
     * instancia do componente que estava com os dados todos preenchidos, na mudanca de 
     * rota, ele foi instanciado novamente por aquela nova rota.
     */
    this.router.navigate(['/lancamentos/novo'])
  }

  buscarUltimoRegistro() {
    return this.lancamentoService.buscarUltimoRegistro()
      .then(lastRecord => {
        this.lastRecord = lastRecord;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
        .then(lancamento => {
          /** Aula 21.9: Usando a Propriedade formGroup */
          /** this.lancamento = lancamento; 
           * Utilizar this.formulario.setValue(), passando lancamento, que eh o parametro
           * da arrow function, diretamente para o formulario. **/
          /** this.formulario.setValue(lancamento) **/
          /** Aula 21.10: Configurando o HTML do formulário reativo. **/
          this.formulario.patchValue(lancamento);
          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
  }
  
  atualizarTituloEdicao() {
    /** this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`); **/
    /** Aula 21.9: Usando a Propriedade formGroup */
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }

}

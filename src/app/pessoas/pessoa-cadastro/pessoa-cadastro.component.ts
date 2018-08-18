import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pessoa, Contato } from '../../core/model';

/** import { ToastyService } from 'ng2-toasty'; **/
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  /**
   * Aula 23.18. Criando Componente de Contatos
   * 21. Agora, nos vamos abrir a Classe pessoa-cadastro.component.ts e nos vamos copiar todo o codigo referente a Lista de Contatos
   * para a Classe pessoa-cadastro-contato.component.ts.
   * 
   * 22. Primeiramente, nos vamos Copiar as propriedades exibindoFormularioContato, contato e contatoIndex. Vamos Comentar esses 
   * atributos aqui na Classe pessoa-cadastro.component.ts e Copiar e Colar em pessoa-cadastro-contato.component.ts, porque nos
   * sabemos que essas sao propriedades que foram definidas nesta Classe por causa do Cadastro de Contato.
   * Entao, nos vamos simplesmente Colar em pessoa-cadastro-contato.component.ts.
   * Ver pessoa-cadastro-contato.component.ts
   * 
   * 25. Agora, vamos Comentar e Copiar os metodos prepararNovoContato(), prepararEdicaoContato(), confirmarContato(),
   * removerContato() e, por ultimo, o metodo clonarContato() da classe pessoa-cadastro.component.ts e Colar na classe
   * pessoa-cadastro-contato.component.ts.
   */
  /**
   * Aula 24.05. Carregando o Dropdown de Cidades
   * 
   * 6. Criar a propriedade: cidades, array do tipo any
   * 
   * 7. Criar o metodo carregarCidades(), vai ser bem parecido com carregarEstados(), entao vamos copiar/colar, renomeando
   * para carregarCidades(), so que, ao inves de listarEstados(), vai invocar o metodo pesquisarCidades, passando o parametro
   * this.estadoSelecionado, o qual iremos definir agora.
   * 
   * 8. Criar a variavel de instancia estadoSelecionado, do tipo number.
   * 
   * 9. No metodo carregarCidades(), em then(), no arrow function, obtem uma lista, listaCidades e o array eh de cidades.
   * A variavel, no arrow function de .map() nos vamos definir como c, de cidade.
   * .then(listaCidades => {
   *    this.cidades = listaCidades.map(c => ({ label: c.nome, value: c.codigo }));
   * })
   * 
   * 10. Agora, ja podemos fazer um teste. Vamos abrir o Browser, http://localhost:4200/pessoas/1, abrimos o Web Developer / Console
   * do Browser com F12 para observarmos qualquer erro. Vamos selecionar Minas Gerais, que nos sabemos que tem cidades cadastradas
   * e carregou o combo Cidades com as cidades de Belo Horizonte, Uberlandia, Uberaba, conforme esta cadastrado na base de dados.
   * 
   * 11. Fim da Aula 24.05. Carregando o Dropdown de Cidades.
   */
  pessoa = new Pessoa();
  lastRecord = 0;
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  /**
   * Aula 23.12. Criando o Dialogo de Contato
   * 7. Criar a variavel de instancia exibindoFormularioContato, que sera uma flag.
   * Voltar para pessoa-cadastro.component.html.
   */
  /** exibindoFormularioContato = false; **/
  /**
   * Aula 23.13. Criando o Formulario de Contato
   * 4. Criar variavel de instancia contato, do tipo Contato.
   * No metodo prepararNovoContato(), vamos inicializar a propriedade contato.
   * Voltar para pessoa-cadastro.component.html.
   */
  /** contato: Contato; **/
  /** Aula 23.16. Editando o Contato 
   * 13. Criar a variavel de instancia contatoIndex.
  */
  /** contatoIndex: number; **/
/**
   * Aula 25.06. Usando o Growl
   * 
   * 18. Para substituir a biblioteca Toasty pelo Growl do PrimeNG, nos vamos ter que alterar nos pontos onde a mensagem eh adicionada,
   * Essas mensagens sao adicionadas nas Classes dos Componentes.
   * 
   * 19. Vamos, primeiramente, alterar, no Construtor, ToastyService por MessageService.
   * 
   * 20. Agora, vamos corrigir os metodos adicionarPessoa() e atualizarPessoa(), 
   * this.messageService.add( { severity : 'success', detail : '' } )
   * 
   * 21. Agora, vamos corrigir a Classe pessoas-pesquisa.component.ts.
   * 
 */
  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    /** private toasty: ToastyService, **/
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.carregarEstados();
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
    this.buscarUltimoRegistro();
  }

  /**
   * Aula 23.12. Criando o Dialogo de Contato
   * 9. Criar o metodo prepararNovoContato().
   * Aqui, vamos pegar o nosso atributo exibindoFormularioContato e vamos setar como 'true'.
   * Voltar para pessoa-cadastro.component.html.
   */
  /**
  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length;
  }
  **/

  /**
   * Aula 23.14. Incluindo um Novo Contato
   * 4. Criar o metodo confirmarContato(). Recebe, como parametro, o Formulario, do tipo FormControl.
   * O que nos vamos fazer nesse metodo eh pegar a propriedade pessoa, this.pessoa, depois contatos e dar um push ness contato
   * que acabou de ser inserido, que eh justamente a nossa propriedade contato, this.contato.
   * 
   * Depois de inserir na Lista, nos vamos pegar a nossa propriedade exibindoFormularioContato, this.exibindoFormularioContato, e
   * vamos seta-la para false, para o nosso Dialogo sumir de novo. Dessa forma, ja conseguimos incluir um novo Contato.
   * Voltar para pessoa-cadastro.component.html.
   * 
   * 10. Chamar o metodo reset() de FormControl, parametro frm.
   * Dessa forma, a gente limpa o Formulario, de forma a nao ficar sujo, para que, ao abrir o Dialogo novamente, nao sejam
   * exibidas as validacoes do Formulario.
   * Voltar para pessoa-cadastro.component.html.
   * 
   * 13. Quando a gente confirma, a gente esta dando, agora, um reset() no nosso Formulario. Repare-se que, ao abrir o Dialogo novamente,
   * ele vai estar limpo, tudo okay. So que o Formulario limpou tambem o Registro que estava vinculado ao Formulario ainda. O que que
   * nos vamos ter que fazer para corrigir isso, entao? Nos vamos precisar criar uma nova instancia de Contato antes de dar o push(),
   * no metodo confirmarContato(). Entao, o que nos vamos fazer? Nos vamos criar um metodo que vai pegar esse Contato que esta sendo
   * editado e vai criar uma nova instancia de Contato a partir dele, para nos nao utilizarmos a mesma referencia que ja esta vinculada
   * com Contato. 
   * 
   * 14. Vamos chamar esse novo metodo de clonarContato(). Ele vai receber um Contato como parametro e vai devolver um Contato.
   * Entao, vamos definir return e pensamos em definir return para utilizarmos o Construtor de Contato. So que esse Construtor
   * nao foi definido ainda. Entao, vamos defini-lo agora. Abrir a model.ts, na Classe Contato.
   * 
   * 16. Retornar direto, no metodo clonarContato(), uma nova instancia de Contato, passando as propriedades que estao vindo 
   * no contato do parametro. Agora, sim, nos temos o Contato clonado.
   * 
   * 17. Agora, ao inves de dar um push no Contato, diretamente, nos vamos chamar o metodo clonarContato(), passando esse contato
   * que a gente ja estava utilizando.
   * 
   * 18. Agora, nos vamos voltar no Browser e vamos tentar inserir um Registro de Teste: Clicar no botao Novo, surge a tela de Novo
   * Contato, informar: Nome: 'Teste', E-mail: 'teste@algamoney.com', Telefone: '(88) 88888-8888', clicar em Confirmar. Agora, o 
   * Registro tem que vir para a Grid e, tambem, quando clicarmos novamente no botao Novo e abrir o Dialogo novamente, o Formulario
   * tem que estar limpo, para que possamos inserir um outro Registro. Okay, ao clicar em Confirmar, o Registro foi para a Grid e, ao
   * abrir novamente o Dialogo, ao clicar no botao Novo, o Dialogo aparece limpo, sem dados.
   * 
   * 19. Vamos inserir outro Registro de Teste: Nome: 'Teste 2', E-mail: 'teste2@algamoney.com', Telefone: '(99) 99999-9999', 
   * clicar em Confirmar. O registro foi para a Grid de Contatos.
   * 
   * 20. Vamos mandar Salvar, agora, com esses 4 Contatos, 2 novos e 2 que ja existiam. Eh exibido a mensagem: 
   * 'Pessoa alterada com sucesso!'. Apertamos F5 e verificamos que os novos Contatos foram adicionados na Base de Dados.
   * O objetivo desta aula foi comprido: a gente conseguiu inserir novos Contatos, a gente  corrigiu esse problema do Dialogo, de a 
   * gente precisar chamar o reset() antes de inserir um novo Registro de Contato e, tambem, a gente resolveu o problema aqui que foi
   * o problema que, logo depois que a gente utilizou o metodo reset(), isso estava limpando o Registro que a gente tinha acabado de
   * de ser confirmado. Entao, a gente resolveu esses dois probleminhas e, nas proximas aulas, a gente vai cuidar da Edicao, da 
   * Exclusao e de outros detalhes do nosso Mestre-Detalhe.
   * Fim da Aula 23.14. Incluindo um Novo Contato.
   */
  /**
   * Aula 23.16. Editando o Contato
   * 16. E, na hora de confirmar esse Contato, ou seja, no metodo confirmarContato(), ao inves de chamar o metod push(), nos vamos ter
   * que utilizar o indice. Sera atribuido ao Contato posicionado em contatoIndex o Clone que estamos fazendo para o Contato.
   * this.pessoa.contatos[this.contatoIndex] = this.clonarContato(contato);
   * Apagamos a linha do metodo push() e, agora, vamos utilizar contatoIndex.
   */
  /**
   confirmarContato(frm: FormControl) {
    /** this.pessoa.contatos.push(this.contato); **/
    /** this.pessoa.contatos.push(this.clonarContato(this.contato)); **
    this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato = false;
    frm.reset();
  }
  **/

  /**
   * Aula 23.17. Removendo Contato
   * 3. Criar o metodo removerContato(), que vai receber o indice.
   * Vamos pegar this.pessoa.contatos e, aqui, vamos utilizar o metodo splice() de Array, passando dois parametros: o primeiro eh o 
   * indice e o segundo parametro eh a quantidade de elementos que queremos remover desse array. Nos vamos passar 1, porque nos 
   * queremos remover somente 1 registro, referente ao indice passado como parametro.
   * Voltar para pessoa-cadastro.component.html.
   */
  /**
   removerContato(index: number) {
    this.pessoa.contatos.splice(index, 1);
  }
  **/

  /**
   * Aula 23.16. Editando o Contato
   * 
   * 3. Criar o metodo prepararEdicaoContato(), que recebe, como parametro, contato, do tipo Contato.
   * Aqui, o que vamos fazer eh atribuir esse contato do parametro ao contato que eh a nossa propriedade desta Classe: this.contato.
   * E tambem vamos definir a nossa variavel exibindoFormularioContato como 'true'.
   * Na verdade, nos ja sabemos que vai dar um probleminha aqui, mas queremos mostrar, porque esse aqui seria um caminho bem obvio
   * que muita gente segue antes de esbarrar no problema que vamos mostrar agora.
   * 
   * 4. Entao, podemos, agora, testar: abrir o Browser. Vamos entrar na Pessoa de Codigo 1: http://localhost:4200/pessoas/1.
   * E, agora, vamos clicar aqui, por exemplo, nesse Teste 2, vamos mandar edita-lo.
   * 
   * 5. Apareceu o Dialogo modal com os dados do Registro de Nome 'Teste 2'. Agora, olhando a Ultima Linha da Grid correspondente
   * a esse Registro, verificamos que, a medida que vamos editando o Nome para 'Teste 2222222222', vai sendo alterado tambem
   * o Registro na Ultima Linha da Grid. Qual que eh o problema disto? O problema eh que, se cancelarmos, clicando no botao X no 
   * topo superior direito da tela de Dialogo, o Registro, na Grid, continua com o valor de 'Teste 2222222222' para a Coluna Nome.
   * 
   * 6. E, se persistirmos, ele vai salver com o valor Teste 2222222222. O problema eh que nos nao clicamos no botao Confirmar da Tela
   * de Dialogo. O comportamento desejado eh que: para o Registro vir para a Grid alterado, mesmo que ainda nao tenha sido persistido
   * no banco, mas, para o Registro vir para a Grid, o comportamento desejado eh que o Usuario tenha que clicar em Confirmar. E como que
   * a gente faz isso?
   * 
   * 7. Nos vamos fazer isso utilizando a tecnica que a gente utilizou com o metodo confirmarContato, ao chamar o metodo clonarContato().
   * Ao inves de atribuir diretamente, nos vamos clonar esse contato que esta vindo como parametro. E vamos jogar para a variavel de 
   * instancia this.contato o contato clonado que a gente esta chamando de clonado, mas que, simplesmente, a gente esta criando uma
   * nova instancia de Contato a partir de uma existente.
   * 
   * 8. Entao, vamos voltar no Browser e vamos editar novamente o Registro de Nome 'Teste 2'. A medida que formos alterando para
   * 'Teste 2222222222', nao pode ser alterado o mesmo Registro na Grid. Esse problema ja esta resolvido. Ao alterar o E-mail 
   * tambem, na Grid nao se alterou: 'teste2@alga.com'. O Telefone tambem, ao inves de (88) 88888-8888, vamos definimos 
   * (11) 11111-1111 e a Grid tambem nao se alterou.
   * 
   * 9. Agora, vamos para o outro problema. Ao clicar no botao de Confirmar, eh criado um Novo Registro na Grid, sendo que era para ter
   * alterado o Registro anterior. Obviamente, isso nao pode acontecer, o comportamento desejado eh que altere, substituindo 
   * a Ultima Linha da Grid com novos valores.
   * 
   * 10. Para podermos fazer isso, nos vamos voltar ao nosso metodo. A gente vai precisar, na hora de confirmar o
   * Contato (metodo confirmarContato()), do indice desse Contato. Entao, na hora que formos Confirmar, se estivermos editando, 
   * no metodo prepararEdicaoContato(), nos vamos ter que receber qual que eh o indice desse Contato e, depois, quando Confirmarmos, 
   * quando o Contato estiver confirmado (metodo confirmarContato()), nos usamos esse indice que recebemos em 
   * prepararEdicaoContato() e confirmamos (metodo confirmarContato()).
   * 
   * 11. Ai vai vir mais uma outra coisa. Como, agora, nos precisamos do indice para podermos confirmar, em prepararNovo(), nos tambem
   * vamos precisar configurar esse indice. Por mais que, nesse metodo, configure-se sempre para o ultimo indice, nos vamos precisar
   * Confirmar, entao, vamos precisar configurar esse indice tambe. 
   * 
   * 12. Entao, o que iremos fazer? Nos iremos criar uma nova variavel de instancia, a qual chamaremos de contatoIndex, do tipo number.
   * 
   * 14. E esse contatoIndex, no metodo preparaNovoContato(), nos vamos atribuir um valor para ele que vai ser o seguinte:
   * this.contatoIndex = this.pessoa.contatos.length. Ver o metodo preparaNovoContato().
   * 
   * 15. Obviamente, nao podemos fazer a mesma coisa no metodo de edicao prepararEdicaoContato(), nos vamos precisar receber esse
   * index como parametro. E a propriedade contatoIndex vai receber o indice recebido por parametro.
   * 
   * 16. E, na hora de confirmar esse Contato, ou seja, no metodo confirmarContato(), ao inves de chamar o metod push(), nos vamos ter
   * que utilizar o indice. Sera atribuido ao Contato posicionado em contatoIndex o Clone que estamos fazendo para o Contato.
   * this.pessoa.contatos[this.contatoIndex] = this.clonarContato(contato);
   * Apagamos a linha do metodo push() e, agora, vamos utilizar contatoIndex.
   * 
   * 17. O passo que falta, agora, obviamente, eh a gente passar o index para o metodo prepararEdicaoContato().
   * Como que a gente vai fazer isso? Ver pessoa-cadastro.component.html.
   */
  /** prepararEdicaoContato(contato: Contato) { **/
  /**
    prepararEdicaoContato(contato: Contato, index: number) {
    /** this.contato = contato; **
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }
  **/

  /**
  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, 
        contato.nome, contato.email, contato.telefone);
  }
  **/
  /**
   * Aula 24.04. Preenchendo o Dropdown de Estados
   * 7. Criar o metodo carregarEstados().
   * Dentro desse metodo, chamar utilizar o Servico PessoaService e vamos buscar lista de estados, invocando o metodo then()
   * passando a arrow function estados => {} e, no corpo da arrow function, nos vamos transformar a lista retornada de estados
   * que tem a propriedade codigo e nome em uma lista de um formato que eh especifico do Componente Dropdown do PrimeNG, 
   * onde a gente vai utilizar label e value. 
   * 
   * 8. E, para isso, primeiramente, acontecer, nos vamos criar, nesta Classe, PessoaCadastroComponent,
   * a propriedade estados, que vai ser um array do tipo any.
   * 
   * 9. Vamos, agora, voltar para o metodo carregarEstados(). Vamos transformar a lista 'estados' na lista de Estados para serem
   * utilizados pelo Componente Dropdown: this.estados = listaEstados.map(), vamos mapear essa lista e vamos transforma-la em uma
   * lista de Estados com as propriedades label e value. Entao, map() vai receber, como parametro, um arrow function com uf, 
   * ou seja, o estado e, apois a arrow, definimos um objeto que vai ter as propriedades label, que tera, como valor, uf.nome e
   * value, que tera. como valor, uf.codigo. Definir parenteses antes das chaves para a arrow function nao confundir como se as 
   * chaves fossem o corpo do metodo da arrow function, pois a intencao eh construirmos um objeto entre os parenteses 
   * e nao metodo.
   * 
   * 10. Falta somente tratarmos o erro, com a chamada para o metodo catch() para tratarmos o eventual erro.
   * 
   * 11. Vamos chamar o metodo carregarEstados() no Construtor, logo apos a configuracao do titulo. 
   * 
   * 12. Agora, nos ja podemos fazer um teste, http://localhost:4200/pessoas/1. Verificamos que o Campo Cidade teve problema, 
   * porque ainda teremos que alterar e no Campo Estados, ja apareceram os registros de Estados.
   * 
   * 13. Agora, vamos colocar o Campo de Estado no lugar do Campo de Cidade, vai ficar melhor em termos de layout, pois 
   * sao combos dependentes.
   * Ver pessoa-cadastro.component.html.
   */
  /**
   * Aula 24.06. Validando Cidade e Estado e salvando Pessoa
   * 6. Alterar metodo carregarPessoa() para carregar Estado, Cidade para Edicao.
   * Primeiro, nesse metodo, nos vamos ter que pegar o Estado selecionado. Como que fazemos isso? Nos vamos ter que ver se tem 
   * Cidade, se tiver Cidade, vamos devolver o codigo do estado, caso contrario, devolve nulo.
   * this.estadoSelecionado = this.pessoa.endereco.cidade ? this.pessoa.endereco.cidade.estado.codigo : null;
   * 
   * 7. Agora, vamos fazer uma verificacao, se tiver estado, this.estadoSelecionado, vamos mandar carregar as cidades, para poder
   * aparecer no dropdown de Cidades.
   * if (this.estadoSelecionado) {
   *    this.carregarCidades();
   * }
   * 
   * 8. Agora, ja podemos fazer um teste, http://localhost:4200/pessoas/1, apertar F5 no Browser. Agora, a cidade veio carregada.
   * Entao, nos temos o Campo Estado com o valor Minas Gerais e o Campo Cidade com o valor Belo Horizonte.
   * Vamos selecionar uma outra Cidade do Estado de Sao Paulo, o Combo de Cidade foi preenchido com Sao Paulo e Campinas. Vamos
   * selecionar Campinas. E, agora, vamos salvar, clicar no botao Salvar. A Aplicacao retornou a mensagem: 
   * 'Pessoa alterada com sucesso'. 
   * 
   * 9. Apertar F5 no Browser para atualizar a Pagina. Continuou, com Cidade selecionada, Campinas.
   * 
   * 10. Vamos, agora, adicionar um Novo Registro, clicar no botao Novo. Nos queremos bloquear o dropdown de Cidade enquanto o 
   * dropdown de Estado nao estiver selecionado.
   * 
   * 11. A gente vai fazer isso da seguinte forma. Nos vamos, simplesmente, utilizar, em pessoa-cadastro.component.html,
   * o atributo disabled do dropdown de Cidade. Ver pessoa-cadastro.component.html.
   */
  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/novo']);
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
        .then(listaEstados => {
          this.estados = listaEstados.map(uf => ({ label: uf.nome, value: uf.codigo }));
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
        .then(listaCidades => {
          this.cidades = listaCidades.map(c => ({ label: c.nome, value: c.codigo }));
        })
        .catch(erro => this.errorHandler.handle(erro));
  }  

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoa.codigo = this.lastRecord + 1;
    this.pessoa.ativo = true;
    return this.pessoaService.adicionar(this.pessoa)
        .then((pessoaAdicionada) => {
          /** this.toasty.success("Pessoa adicionada com sucesso!"); **/
          this.messageService.add( { severity : 'success', detail : 'Pessoa adicionada com sucesso!' } );
          // form.reset();
          // this.pessoa = new Pessoa();
          this.router.navigate(['/pessoas', pessoaAdicionada.codigo])
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then((pessoa) => {
        this.pessoa = pessoa;
        /** this.toasty.success("Pessoa alterada com sucesso!"); **/
        this.messageService.add( { severity : 'success' , detail : 'Pessoa alterada com sucesso!' } );
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));    
  }

  buscarUltimoRegistro() {
    return this.pessoaService.buscarUltimoRegistro()
      .then(lastRecord => {
        this.lastRecord = lastRecord;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }  

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
        .then(pessoa => {
          this.pessoa = pessoa;

          this.estadoSelecionado = this.pessoa.endereco.cidade ? this.pessoa.endereco.cidade.estado.codigo : null;
          if (this.estadoSelecionado) {
            this.carregarCidades();
          }

          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

}

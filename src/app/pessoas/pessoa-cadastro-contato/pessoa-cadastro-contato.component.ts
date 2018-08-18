import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Contato } from '../../core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  /**
   * Aula 23.18. Criando Componente de Contatos
   * 16. Vamos, agora, criar a propriedade contatos, que vai ser um Array de Contato.
   * Voltar, agora, para pessoa-cadastro-contato.component.html.
   * 
   * 19. Criar a propriedade contato, do tipo Contato.
   * Voltar, agora, para pessoa-cadastro-contato.component.html.
   * 
   * 23. Vamos Comentar as propriedades exibindoFormularioContato, contato e contatoIndex na Classe pessoa-cadastro.component.ts 
   * e Copiar e Colar em pessoa-cadastro-contato.component.ts, porque nos sabemos que essas sao propriedades que foram definidas 
   * na Classe pessoa-cadastro.component.ts por causa do Cadastro de Contato.
   * A propriedade contato ja havia sido definida no Passo 19, entao nao precisar ser Copiada.
   * 
   * 24. Voltar, agora, para pessoa.cadastro.component.ts.
   * 
   * 26. Agora, vamos Comentar e Copiar os metodos prepararNovoContato(), prepararEdicaoContat(), confirmarContato(),
   * removerContato() e, por ultimo, o metodo clonarContato() da classe pessoa-cadastro.component.ts e Colar na classe
   * pessoa-cadastro-contato.component.ts.
   * 
   * 27. Agora, nos precisamos ajustar, porque, aqui, obviamente, nos nao temos a propriedade this.pessoa. No metodo 
   * preprarNovoContato(), devemos, apenas, remover this.pessoa: this.contatoIndex = this.contatos.length;
   * 
   * 28. Em preparaEdicaoContato(), nao eh necessario alterar nada.
   * 
   * 29. No metodo confirmarContato(), devemos importar a Classe FormControl. Nao temos a propriedade this.pessoa, so temos
   * a propriedade this.contatos: this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
   * 
   * 30. No metodo removerContato(), nao temos a propriedade this.pessoa, so temos a propriedade this.contatos:
   * this.contatos.splice(index, 1);
   * 
   * 31. Nos precisamos, agora, de uma referencia para a Lista de Contatos que esta la dentro de Pessoa. Pessoa a que nos referimos
   * eh a propriedade pessoa, do tipo Pessoa, na Classe PessoaCadastroComponent. Entao, precisamos definir a Lista de Contatos dessa
   * propriedade, porque nos vamos repassar essa Lista para a outra propriedade contatos aqui no Componente 
   * PessoaCadastroContatoComponent. Entao, como que nos fazemos isso?
   * 
   * 32. Nos vamos definir o Decorador @Input na propriedade contatos desta Classe. Ai nos temos que abrir/fechar parenteses:
   * @Input(). Nos tornamos, agora, a propriedade contatos desta Classe PessoaCadastroContatoComponent em uma propriedade tambem do
   * Componente HTML de pessoa-cadastro-contato.component.html.
   * 
   * 33. Entao, o que nos faremos agora? Nos vamos ate o Componente HTML pessoa-cadastro.component.html, onde foi utilizado este
   * Componente atraves da tag <app-pessoa-cadastro-contato> e nos vamos definir dentro dessa tag a propriedade contatos definida
   * aqui. 
   * Ver pessoa-cadastro.component.html.
   * 
   * 37. Agora, na nossa Classe pessoa-cadastro-contato.component.ts, nos temos acesso aos contatos da Pessoa onde esse Componente
   * tiver sido inserido, que, nesse caso, eh simplesmente o proprio Cadastro de Pessoa dentro de Painel (tag <p-panel>).
   * 
   * 38. Agora, ja podemos fazer um teste. Vamos re-iniciar o Servidor, ng serve e vamos abrir o Browser.
   * 
   * 39. Antes de testar, vamos fazer uma Correcao. Ver o novo Componente: pessoa-cadastro-contato.component.html.
   * 
   * 41. Agora, vamos fazer uma Correcao. Nos temos definido fixo, no titulo do Dialogo, o texto 'Novo Contato', so que, quando
   * estivermos editando um Contato, nos queremos que seja exibido 'Editando Contato'. Para isso, vamos criar o metodo editando(),
   * que vai devolver this.contato && this.contato.codigo;
   * Voltar, agora, para pessoa-cadastro-contato.component.html.
   * 
   */
  @Input() contatos: Array<Contato>;
  contato: Contato;
  exibindoFormularioContato = false;
  contatoIndex: number;

  constructor() { }

  ngOnInit() {
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    /** this.contatoIndex = this.pessoa.contatos.length; **/
    this.contatoIndex = this.contatos.length;
  }
  
  prepararEdicaoContato(contato: Contato, index: number) {
    /** this.contato = contato; **/
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(frm: FormControl) {
    /** this.pessoa.contatos.push(this.contato); **/
    /** this.pessoa.contatos.push(this.clonarContato(this.contato)); **/
    /** this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato); **/
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato = false;
    frm.reset();
  }

  removerContato(index: number) {
    /** this.pessoa.contatos.splice(index, 1); **/
    this.contatos.splice(index, 1);
  }


  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, 
        contato.nome, contato.email, contato.telefone);
  }

  get editando() {
    return this.contato && this.contato.codigo;
  }

}

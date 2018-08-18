import { Component } from '@angular/core';

/** import { ToastyConfig } from 'ng2-toasty'; **/
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /** Toasty serah utilizado para exibicao de mensagens.
   * No AppCompoment configurar o tema do nosso Toasty */
  /** Injetar Objeto de Configuracao do Toasty no construtor. 
   * So com esta configuracao nao funciona. Eh necessario tambem 
   * configurar o arquivo css do Toasty em .angular-cli.json. */ 
  /**
   * Aula 25.06. Usando o Growl
   * 
   * 27.1. Na Classe app-component.ts, tem algumas configuracoes nela e a gente pode remover, porque a gente nao precisa mais 
   * da biblioteca ng2-toasty.
   * Voltar para pessoas-pesquisa.component.ts.
   * */ 
  constructor(
    /** private toastyConfig: ToastyConfig, **/
    private router: Router
  ) {
    /** this.toastyConfig.theme = 'bootstrap'; **/
  }

  exibindoNavBar() {
    return this.router.url !== '/login';
  }

}

/**
 * Aula Atualizando o PrimeNG

 * Vamos, entao, atualizar o PrimeNG, que eh a nossa biblioteca de componentes, algo importante 
 * dentro do Projeto do nosso curso. A gente vai atualizar para a versao mais recente do momento, 
 * que eh a 5.2.3.

 * Duas coisas bacanas que a gente tem nessa versao eh que o nome dos pacotes ficou simplificado, 
 * eles ficaram menores e, tambem, a gente vai poder utilizar um novo componente do PrimeNG, que eh o 
 * TurboTable, com a DataTable que a gente vem utilizando, so que ela tem uma performance muito melhor, 
 * segundo os proprios desenvolvedores do PrimeNG.

 * A primeira coisa que a gente vai fazer eh atualizar, no package.json, o PrimeNG.

 * You only need run 

 * npm update --save 

 * into the folder that contains your package.json
 * Note: this command update whole your dependencies...
 * fonte: <https://stackoverflow.com/questions/43258960/update-angular2-primeng-version-1-1-4-to-last-version>

 * + @types/jasmine@2.8.8 
 * + karma-jasmine@1.1.2
 * + moment@2.22.2
 * + core-js@2.5.7
 * + primeng@5.2.7
 * updated 5 packages in 34.109s

 * Foi atualizado para a versao 5.2.7 porque eh a ultima versao estavel. A ultima versao eh a 6.0.0, 
 * mas eh uma versao beta.

 *   "primeng": "^5.2.7",
	
 * Como sabemos que a versao eh a ultima versao? Nos podemos olhar la no site do PrimeNG ou no repositorio 
 * dele, mas podemos, tambem, rodar o comando:

 * npm info primeng

 * Podemos rodar esse comando com qualquer pacote do npm, que esse comando vai exibir as informacoes. 
 * No comeco da resposta esta a informacao sobre ultima versao:

 * 'dist-tags': { latest: '6.0.0-beta.1' },


 * Para instalar os pacotes que foram atualizados em package.json, rodar o comando:

 * npm install

 * Agora, nos vamos abrir o Projeto e conferir se o Projeto continua funcionando com os caminhos de 
 * pacotes antigos. Primeiramente, vamos rodar a Aplicacao:

 * ng serve

 * Abrindo o browser e acessando a Aplicacao, notamos que o nosso Projeto continua funcionando, mesmo 
 * com os caminhos dos pacotes antigos do PrimeNG. E, agora, nos vamos atualiza-los, porque, como o 
 * PrimeNG esta mais simplificado, vamos ver como que ficou o padrao agora.

 * Em primefaces/org/primeng, em Get Started, Secao Import, temos o exemplo do componente:

 * import {AccordionModule} from 'primeng/accordion';

 * E vai ficar, agora, so primeng / [o nome do componente]. Eh isso que a gente vai fazer no 
 * nosso Projeto.

 * Os nossos componentes, como eles sao declarados em cada modulo, entao a gente vai ir abrindo os 
 * modulos e procurando pelos componentes:

 * core.module.ts
 * lancamentos.module.ts
 * pessoas.module.ts
 * seguranca.module.ts
 * 
 */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
/** import { DataTableModule } from 'primeng/datatable'; **/
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SharedModule } from './../shared/shared.module';
/** import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component'; **/
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { RouterModule } from '@angular/router';
import { LancamentosRoutingModule } from './lancamentos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    /** Aula 21.8: Criando um Formulario Reativo */
    ReactiveFormsModule,
    /** Nao precisa importar de novo porque o LancamentosRoutingModule ja exporta */
    /** RouterModule, */

    InputTextModule,
    ButtonModule,
    /** DataTableModule, **/
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    /**
     * Aula 23.19. Upload com Componente FileUpload
     * 3. Incluir o Modulo FileUploadModule do PrimeNG para definirmos o Componente de Upload, com a tag <p-fileUpload>, em 
     * lancamento-cadastro.component.html.
     * Voltar para lancamento-cadastro.component.html.  
     */
    FileUploadModule,
    /**
     * Aula 23.22. Utilizando o Componente ProgressSpinner
     * 4. Importar o Modulo ProgressSpinnerModule, para definir a tag <p-progressSpinner> em 
     * lancamento-cadastro.component.html.
     * Voltar para lancamento-cadastro.component.html.
     */
    ProgressSpinnerModule,


    SharedModule,
    LancamentosRoutingModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
    /** LancamentosGridComponent **/
  ],
  exports: [
    /** Nao vai precisar mais disso.  
     * Era necessario somente porque eram utilizados os seletores
     * <app-lancamentos-pesquisa> e <app-lancamento-cadastro> em app.component.html.
     * Como nao esta mais usando os Componentes pelo Seletor e sim pelo roteador do Angular (o 
     * roteador acessa direto o Componente), nao eh necessario mais exportar, 
     * este modulo nao precisa mais exportar esses Componentes, apenas declarar 
     * (Secao declarations).
      LancamentoCadastroComponent,
      LancamentosPesquisaComponent
    */
  ]
})
export class LancamentosModule { }

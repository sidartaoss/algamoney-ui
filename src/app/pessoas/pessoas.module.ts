import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/inputmask';
/** import { DataTableModule } from 'primeng/datatable'; **/
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from './../shared/shared.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
/** import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component'; **/
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { RouterModule } from '@angular/router';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
/**    DataTableModule, **/
    TableModule,
    TooltipModule,
    InputMaskModule,
    /**
     * Aula 23.11. Listando Contatos na Tela Mestre-Detalhe
     * 3. Adicionar PanelModule, para podermos utilizar a tag <p-panel> do PrimeNG em pessoa-cadastro.component.html.
     * Voltar para pessoa-cadastro.component.html.
     */
    PanelModule,
    /**
     * Aula 23.12. Criando o Dialogo de Contato
     * 2. Adicionar o Modulo DialogModule, para podermos utilizar a tag <p-dialog> do PrimeNG em pessoa-cadastro.component.html.
     * Voltar para pessoa-cadastro.component.html.
     */
    DialogModule,
    /**
     * Aula 24.04. Preenchendo o Dropdown de Estados
     * 5. Adicionar o Modulo Dropdown, para podermos utilizar a tag <p-dropdown> do PrimeNG em pessoa-cadastro.component.html.
     * Voltar para pessoa-cadastro.component.html.
     */
    DropdownModule,

    SharedModule,
    PessoasRoutingModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoaCadastroContatoComponent
    /** PessoasGridComponent **/
  ],
  exports: [
    /** Nao vai precisar mais disso.
     * Era necessario somente porque eram utilizados os seletores
     * <app-pessoas-pesquisa> e <app-pessoa-cadastro> em app.component.html.
     * Como nao esta mais usando os Componentes pelo Seletor e sim pelo roteador do Angular (o 
     * roteador acessa direto o Componente), nao eh necessario mais exportar, 
     * este modulo nao precisa mais exportar esses Componentes, apenas declarar 
     * (Secao declarations).
      PessoaCadastroComponent,
      PessoasPesquisaComponent
    */
  ]
})
export class PessoasModule { }

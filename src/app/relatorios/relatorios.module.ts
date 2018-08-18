import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
/**
 * Aula 23.08. Configurando Formulário do Relatório
 * 4. Importar o Modulo de Formularios para podermos utiliza-lo em 
 * relatorio-lancamentos.component.html.
 * Voltar para relatorio-lancamentos.component.html.
 */
    FormsModule,

/**
 * Aula 23.08. Configurando Formulário do Relatório
 * 7. Importar o Modulo de Calendar do PrimeNG.
 * Voltar em para relatorio-lancamentos.component.html, no Formulario, 
 * para definir <p-calendar>
 * */
    CalendarModule,
/**
 * Aula 23.07. Criando Modulo de Relatorios

 * Nesta aula, a gente vai comecar a atividade onde a gente vai gerar um Relatorio 
 * em PDF, aqui no nosso Front-End, no nosso Client Angular. Para fazer isso, primeiro 
 * nos vamos criar um Modulo chamado Relatorios. Depois, nos vamos criar um Componente 
 * RelatoriosLancamento, que vai ser o Componente que vai guardar o formulario para a 
 * gente poder buscar o PDF que vai nos trazer Lancamentos Por Pessoa. Entao, depois 
 * nos vamos criar o Componente, depois, a gente vai criar o Servico e fazer esse 
 * Relatorio ser exibido para o Usuario final. 
 * 
 * Nesta aula aqui, o que nos vamos fazer eh criar o Modulo e criar o Componente e ja 
 * tambem mapear, ja coloca-lo na Rota para a gente conseguir abrir o Componente no 
 * Browser. Obviamente, o formulario e as outras coisas vao ficar para as proximas 
 * aulas. Nesta aula aqui, a gente vai chegar ate a criacao e mapeamento da Rota do 
 * Componente. 
 *
 * 1. Vamos abrir o VS Code e criar o Modulo com o comando:
 *
 * ng g m relatorios --routing --spec=false
 *
 * --routing para criar as Rotas
 *
 * --spec=false para nao criar os arquivos de teste.
 *
 * Vamos abrir o Modulo, relatorios.module.ts.
 *
 * 2. A primeira coisa que nos iremos fazer eh adicionar o SharedModule na Secao de 
 * Imports.
 * 
 * 3. Agora, nos vamos criar o Componente:
 * ng g c relatorios/relatorio-lancamentos --spec=false
 * 
 * 4. Agora, nos vamos em relatorios-routing.module.ts para fazer o mapeamento da
 * rota.
 * Ver relatorios-routing.module.ts.
 * 
 */
    SharedModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatorioLancamentosComponent]
})
export class RelatoriosModule { }

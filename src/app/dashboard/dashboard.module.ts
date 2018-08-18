import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

/** Aula 23.02. Plotando Graficos com Dados Estaticos 
 * 7. Vamos importar o modulo de graficos do PrimeNG.
 * Nao precisa ficar importando, para cada tipo de grafico, definir um modulo aqui.
 * Nos temos somente o modulo Chart e, dentro dele, nos temos o Grafico de Linha, o 
 * Grafico de Pizza e alguns outros para a gente poder utilizar.
 * Agora, vamos definir na propriedade imports.
*/
import { ChartModule } from 'primeng/chart';
import {PanelModule} from 'primeng/panel';

/**
 * Aula 23.01. Criando o Modulo Dashboard

  * Vamos comecar, entao, algumas melhorias no nosso front-end. E a primeira delas sera a criacao de 
  * um Dashboard para o nosso front-end, vamos melhorar o nosso front-end com esse dashboard, onde a 
  * gente vai colocar dois graficos ali: um grafico de linha e um grafico de pizza. 

  * Nesta aula, o que a gente vai fazer eh a criacao do modulo de Dashboard do componente. Nos vamos 
  * criar um componente, mas nos vamos deixa-lo vazio e vamos criar tambem as formas, para deixar 
  * tambem a pagina abrindo. Entao, vamos la, vamos abrir o Visual Studio Code.

  * Vamos abrir o terminal:

  * cd C:\Users\SEMPR\algamoney-ui

  * 1. Vamos criar um novo modulo chamado dashboard, utilizando o parametro --routing para ja criarmos o 
  * nosso arquivo de rotas. Entao, nos vamos criar o modulo Dashboard e tambem as rotas. Digitar o 
  * comando:

  * ng g m dashboard --routing

  * Ja foi criado o nosso modulo. Vamos abrir o arquivo dashboard.module.ts. Aqui no nosso modulo, o 
  * que a gente vai precisar eh somente importar o SharedModule.
  * 
  * 2. No modulo, eh isso mesmo que a gente precisa.
  * Antes de mexer nas rotas, o que nos vamos precisar eh do nosso componente. Entao, o que nos vamos
  * fazer eh mandar gerar o nosso componente.
  * 
  * Vamos voltar no terminal e mandar gerar um novo componente chamado dashboard tambem e vai ficar 
  * dentro do modulo dashboard.
  * 
  * ng g c dashboard/dashboard --spec=false
  * 
  * 3. Agora, nos vamos mudar a rota, vamos criar o rota onde nos vamos chamar essa pagina Dashboard,
  * referente a esse componente. Abrir arquivo dashboard-routing.module.ts.
 */

@NgModule({
  imports: [
    CommonModule,

    PanelModule,
    /** Aula 23.02. Plotando Graficos com Dados Estaticos 
     * 8. Definir ChartModule.
     * Agora, voltar para a pagina dashboard.component.html para definir o grafico.
     * */
    ChartModule,

    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ],
  /**Aula 23.06. Formatando labels no Chart.JS
   * 13. Definir a propriedade Providers e adicionar no array de Providers o 
   * DecimalPipe, porque, senao, ele nao vai ser injetado no Construtor do 
   * DashboardComponent automaticamente.
   * Voltar para dashboard.component.ts.
   */
  providers: [
    DecimalPipe
  ]
})
export class DashboardModule { }

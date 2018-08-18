import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../seguranca/auth.guard';

/**
 * Aula 23.01. Criando o Modulo Dashboard
 * 4. Aqui nos vamos definir onde nos vamos abrir a pagina em que sera exibido o componente 
 * dashboard que futuramente vai conter os nossos graficos.
 * Dentro do array routes, a gente vai criar uma nova rota onde nos vamos ter como path: /dashboard
 * Antes de mudar aqui, nos vamos mudar o modulo raiz, as rotas raizes em app-routing.module.ts.
 * Por que mudar la? Porque, agora, nos temos o lazy-loading configurado la.
 * Ver em app-routing.module.ts.
 * 
 * 6. Voltando aqui, nos nao precisamos definir o path para nao ficar repetido, como nos aprendemos na Aula sobre Carregamento Tardio,
 * sobre Lazy Loading de modulos. Entao, aqui, na proxima linha, o componente que nos vamos utilizar vai ser o DashboardComponent.
 * Em seguida, vamos definir o atributo canActivate para especificar aqui o nosso AuthGuard.
 * Em seguida, vamos definir dados para a seguranca que, basicamente, sao os papeis que eh necessario ter para acessar a pagina
 * de dashboard. Vamos, por ora, definir ROLE_PESQUISAR_LANCAMENTO. Quem tiver a permissao de pesquisar lancamento, vai ter a permissao
 * tambem de acessar a nossa Dashboard. Caso tenhamos uma permissao especifica, basta incluirmos-la aqui e, obviamente, inseri-la 
 * na nossa base de dados e, claro, vincular com o nosso usuario.
 * Entao, desse modo a gente ja tem que conseguir abrir a nossa pagina. Vamos subir o nosso servidor com o comando ng serve para 
 * testar. Abrir o Browser: http://localhost:4200, fazer o login na Aplicacao com admin@algamoney.com
 * Agora, vamos entrar na pagina de Dashboard: http://localhost:4200/dashboard. Apareceu o nosso 
 * componente que nos estavamos esperando. A gente vai evoluir esse componente ao longo das proximas
 * aulas.
 * Uma coisa que iremos fazer nesta aula eh definir a pagina principal como a pagina de dashboard. Para
 * isso, a gente precisa alterar em dois lugares. O primeiro deles eh na nossa aplicacao de rotas raiz,
 * app-routing.module.ts. 
 * Ver app-routing.module.ts.
 *
 * 8. O outro lugar que a gente precisa alterar eh no componente de login: LoginFormComponent.
 * Ver login-form.component.ts.
 * 
 * 10. Fim da Aula 23.01. Criando o Modulo Dashboard.
 * 
 * */
const routes: Routes = [
  {   
    path: '',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    data: { roles: [ 'ROLE_PESQUISAR_LANCAMENTO' ] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

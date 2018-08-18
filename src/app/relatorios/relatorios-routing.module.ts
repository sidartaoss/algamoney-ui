import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { AuthGuard } from '../seguranca/auth.guard';

/** Aula 23.07. Criando Modulo de Relatorios
 * 5. Iniciamos o mapeamento da Rota aqui na definicao da variavel routes.
 * Definimos, primeiramente, a propriedade path. Nos vamos ter um path
 * raiz, que eh o relatorios e sera mapeado em app-routing.module.ts.
 * Ver app-routing.module.ts.
 * 
 * 7. Aqui vamos definir o path lancamentos, pois vai ser um Relatorio de Lancamentos.
 * Vai ficar, entao, http://localhost:4200/relatorios/lancamentos
 * 
 * 8. Em seguida, o atributo seguinte eh o component e o Componente que iremos definir
 * aqui eh o RelatorioLancamentosComponent.
 * 
 * 9. Em seguida, o atributo canActivate, onde definiremos a Classe AuthGuard.
 * 
 * 10. Tem mais um atributo, que eh data, onde a gente passa um objeto com a 
 * propriedade roles.
 * 
 * 11. Pronto, a Rota esta definida. Ja podemos fazer um teste para saber se
 * ja podemos acessar esse Componente.
 * 
 * 12. Nesta aula, nos criamos o Modulo, criamos o Componente e ja fizemos o mapeamento
 * da Rota para ele.
 * Fim da Aula 23.07. Criando Modulo de Relatorios.
 */
const routes: Routes = [
  {
    path: 'lancamentos',
    component: RelatorioLancamentosComponent,
    canActivate: [ AuthGuard ],
    data: { roles: [ 'ROLE_PESQUISAR_LANCAMENTO' ] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }

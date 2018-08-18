import { Component, OnInit } from '@angular/core';

/**
 * Protegendo Rotas com Guarda de Rotas (CanActivate)

 * Neste momento, qualquer Usuario pode navegar para qualquer lugar da Aplicacao. Mas, 
 * se o Usuario nao tiver Permissao para acessar uma URL nao autorizada, eh melhor 
 * que a gente direcione esse Usuario para uma Pagina, dizendo que o Acesso
 * nao eh permitido. Nos podemos adicionar uma Guarda de Rotas para tratar isso. 
 * Existem alguns tipos de Guardas de Rotas, mas a que vamos usar aqui, nesta aula, 
 * eh do tipo CanActivate, que permite decidir se uma Rota pode ou nao ser ativada.

 * Criar a View NaoAutorizada. Criar o Componente dentro da pasta core.

 * ng g c core/pagina-nao-encontra --inline-style --inline-template --flat --spec=false

 * --inline-style: definir o estilo CSS como inline, ou seja,
 * definido em uma linha somente dentro do arquivo component.ts. Nao ira criar 
 * arquivo de estilo CSS.

 * --inline-template: definir o template como inline, ou seja,
 * definido em uma linha somente dentro do arquivo component.ts. Nao ira criar 
 * arquivo html.

 * --flat: para nao criar uma pasta para esse Componente

 * --spec-false: para nao criar uma Classe de teste.
 * 
 * Criar tambem a Rota /nao-autorizado que direciona para esse componente.
 * Ir em app-routing.module.ts e definir a Rota.
 * 
 * Feito isso, agora, a gente vai criar a nossa guarda de rotas. Vamos usar o 
 * Angular/CLI para isso: 
 * 
 * ng g g seguranca/auth --spec=false
 * g: generate
 * g: guarda
 * 
 * 
 */

@Component({
  selector: 'app-nao-autorizado',
  template: `
    <div class="container">
      <h1 class="text-center">Acesso Negado!</h1>
    </div>
  `,
  styles: []
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

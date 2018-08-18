import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontra',
  /** Definir uma div. Essa div vai ter a classe CSS 'container' do Bootstrap
   * e um h1 com a frase. Definir a classe CSS 'text-center' para h1, que eh 
   * tambem do Bootstrap.
   */
  template: `
    <div class="container">
      <h1 class='text-center'>Página não encontrada</h1>
    </div>
  `,
  styles: []
})
export class PaginaNaoEncontraComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

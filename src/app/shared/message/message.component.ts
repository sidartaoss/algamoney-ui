import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="ui-message ui-messages-error">
      {{ text }}
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class MessageComponent {

  // @Input. Decorator para definir que é uma propriedade que entra no componente.
  // error, control e text são propriedades de entrada no componente.
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;


  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}

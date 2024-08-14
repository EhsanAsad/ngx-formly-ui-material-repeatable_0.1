import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index;" class="row">
      <formly-field  [field]="field"></formly-field>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType implements OnInit {
  ngOnInit() {
    console.log(this.field);
    if (this.field.fieldGroup.length === 0) {
      this.add();
    }
  }
}

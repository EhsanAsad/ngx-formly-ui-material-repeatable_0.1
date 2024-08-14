import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { OuterArrayService } from './outer-array.service';
import { InnerArrayService } from './inner-array.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  innerArrayData: any = {};

  constructor(
    private outerArrayService: OuterArrayService,
    private innerArrayService: InnerArrayService
  ) {}

  ngOnInit() {
    this.outerArrayService.getOuterArrayData().subscribe((outerArrayData) => {
      this.innerArrayService.getInnerArrayData().subscribe((innerArrayData) => {
        this.innerArrayData = innerArrayData.payment_schedules;
        this.model = this.populateModel(outerArrayData, innerArrayData);
        this.fields = this.getOuterArrayFields(outerArrayData, innerArrayData);
      });
    });
  }

  populateModel(outerArrayData: any[], innerArrayData: any): any {
    const model = {};
    outerArrayData.forEach((outerItem) => {
      model[outerItem.id] = {
        label: outerItem.label,
        innerArray: innerArrayData.payment_schedules[outerItem.id] || [],
      };
    });
    return model;
  }

  getOuterArrayFields(
    outerArrayData: any[],
    innerArrayData: any
  ): FormlyFieldConfig[] {
    return outerArrayData.map((outerItem) => ({
      key: outerItem.id,
      fieldGroup: [
        {
          key: 'label',
          type: 'input',
          templateOptions: {
            label: 'Schedule Name',
          },
          defaultValue: outerItem.label,
        },
        {
          key: 'innerArray',
          type: 'repeat',
          fieldArray: {
            fieldGroup: this.getInnerArrayFields(
              innerArrayData.payment_schedules[outerItem.id] || []
            ),
          },
          templateOptions: {
            readonly: false,
          },
        },
      ],
    }));
  }

  getInnerArrayFields(innerArrayData: any[]): FormlyFieldConfig[] {
    return innerArrayData.map((innerItem, index) => ({
      fieldGroup: [
        {
          key: `payment_date`,
          type: 'input',
          templateOptions: {
            label: 'Payment Date',
          },
          defaultValue: innerItem.payment_date,
        },
        {
          key: `value`,
          type: 'input',
          templateOptions: {
            label: 'Value',
          },
          defaultValue: innerItem.value,
        },
      ],
    }));
  }

  addNewField() {
    const newField = {
      key: 'newItem',
      fieldGroup: [
        {
          key: 'label',
          type: 'input',
          templateOptions: {
            label: 'Schedule Name',
          },
        },
        {
          key: 'innerArray',
          type: 'repeat',
          fieldArray: {
            fieldGroup: this.getInnerArrayFields(
              this.innerArrayData.non_contract_supply.map((item, index) => ({
                payment_date: item.payment_date,
                value: '',
              }))
            ),
          },
          templateOptions: {
            readonly: false,
          },
        },
      ],
    };

    this.fields.push(newField);

    // Update the form to reflect the new fields without resetting the form state
    this.form = new FormGroup({});
    this.options = {};
  }

  removeLastField() {
    if (this.fields.length > 0) {
      this.fields.pop();
      this.form = new FormGroup({});
      this.options = {};
    }
  }

  submit() {
    if (this.form.valid) {
      console.log(this.model);
    }
  }
}

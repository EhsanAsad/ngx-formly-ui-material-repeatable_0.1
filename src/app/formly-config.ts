import { FormlyFieldConfig } from '@ngx-formly/core';
import { PaymentScheduleFields } from './payment-schedule.model';
import { InnerArrayService } from './inner-array.service';

const getInnerArrayFields = (
  innerArrayData: PaymentScheduleFields[],
  readonly: boolean
): FormlyFieldConfig[] => {
  return innerArrayData.map((innerItem) => ({
    fieldGroup: [
      {
        key: 'payment_date',
        type: 'input',
        templateOptions: {
          label: 'Payment Date',
          readonly: readonly,
        },
        defaultValue: innerItem.payment_date,
      },
      {
        key: 'value',
        type: 'input',
        templateOptions: {
          label: 'Value',
          readonly: readonly,
        },
        defaultValue: innerItem.value,
      },
    ],
  }));
};

export const getOuterArrayFields = (
  outerArrayData: any[],
  innerArrayService: InnerArrayService
): FormlyFieldConfig[] => {
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
          fieldGroup: getInnerArrayFields(
            innerArrayService.getInnerArrayDataSync(outerItem.id),
            false
          ),
        },
        templateOptions: {
          readonly: false,
        },
      },
    ],
  }));
};

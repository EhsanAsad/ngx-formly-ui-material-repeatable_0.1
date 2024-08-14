import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaymentScheduleFields } from './payment-schedule.model';

@Injectable({
  providedIn: 'root',
})
export class InnerArrayService {
  private innerArrayData = {
    payment_schedules: {
      non_contract_supply: [
        { payment_date: '2023-01-01', value: 100 },
        { payment_date: '2023-01-01', value: 200 },
      ],
      nkt_supply_contract: [
        { payment_date: '2023-02-01', value: 1100 },
        { payment_date: '2023-02-01', value: 1200 },
      ],
    },
  };

  getInnerArrayData(): Observable<{
    payment_schedules: { [key: string]: PaymentScheduleFields[] };
  }> {
    return of(this.innerArrayData);
  }

  getInnerArrayDataSync(outerItemId: string): PaymentScheduleFields[] {
    return this.innerArrayData.payment_schedules[outerItemId] || [];
  }
}

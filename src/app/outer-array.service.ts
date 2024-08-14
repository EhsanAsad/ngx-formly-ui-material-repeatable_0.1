import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OuterArrayService {
  getOuterArrayData(): Observable<any[]> {
    return of([
      {
        id: 'non_contract_supply',
        label: 'Non-Contract Supply',
        description: 'Description 1',
      },
      {
        id: 'nkt_supply_contract',
        label: 'NKT Supply Contract',
        description: 'Description 2',
      },
    ]);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { Result } from 'app/shared/models/result.model';

@Pipe({
  name: 'amountRaised',
  pure: false
})

export class AmountRaisedPipe implements PipeTransform {

  transform(value: Result[], args?: string): Result[] {
    return value.filter(eachRes => eachRes.funding_type = args);
  }

}

import { Pipe, PipeTransform } from '@angular/core';


import { Result } from 'app/shared/models/result.model';

@Pipe({
  name: 'sort',
  pure: true,
})

export class ArraySortPipe implements PipeTransform {

  private previousValue: Array<Result>;
  private cacheResult: Array<Result>;

  transform(array: Array<Result>, args?: any) {
    if (array === undefined) {
      return null;
    } else {
      console.log("inside pipeee",array.slice(1,2), args);
      if (!this.previousValue || (array !== this.previousValue)) {
        this.previousValue = array;
        if ((args == 'asc') || args === undefined) {
          this.cacheResult = array.sort((a: Result, b: Result) => {
            if (a.end_time < b.end_time) {
              return -1;
            } else if (a.end_time > b.end_time) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          this.cacheResult = array.sort((a: Result, b: Result) => {
            if (a.end_time < b.end_time) {
              return 1;
            } else if (a.end_time > b.end_time) {
              return -1;
            } else {
              return 0;
            }
          });
        }
        return array;
      }
    }
  }
}

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
      console.log("inside pipeee", args);
      if (!this.previousValue || (array !== this.previousValue)) {
        this.previousValue = array;
        this.cacheResult = this.transformArrayFromArgs(array, args);
        return this.cacheResult;
      }
      console.log("the cache value got ot us", array.length);
      return this.transformArrayFromArgs(array, args);
    }
  }

  transformArrayFromArgs(array: Array<Result>, args?: Array<string>) {
    let filterVar = args[0];
    let order = args[1];
    if (filterVar == "end_time") {
      return this.sortEndTime(array, order);
    }
    if (filterVar == "raised") {
      return this.sortRaisedAmount(array, order);
    }
    if (filterVar == "more_to_come") {
      console.log("we'll do this shit later");
    }
  }

  sortEndTime(array: Array<Result>, order: string) {
    if (order == 'asc') {
      return array.sort((a: Result, b: Result) => {
        if((a.end_time == undefined) && (b.end_time == undefined)){
          return 0;
        }
        if(a.end_time == undefined){
          return -1;
        }
        if(b.end_time == undefined){
          return 1;
        }
        if (a.end_time < b.end_time) {
          return -1;
        } else if (a.end_time > b.end_time) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      return array.sort((a: Result, b: Result) => {
        if((a.end_time == undefined) && (b.end_time == undefined)){
          return 0;
        }
        if(a.end_time == undefined){
          return 1;
        }
        if(b.end_time == undefined){
          return -1;
        }
        if (a.end_time < b.end_time) {
          return 1;
        } else if (a.end_time > b.end_time) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }

  sortRaisedAmount(array: Array<Result>, order: string) {
    if (order == 'asc') {
      return array.sort((a: Result, b: Result) => {
        if (a.raised < b.raised) {
          return -1;
        } else if (a.raised > b.raised) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      return array.sort((a: Result, b: Result) => {
        if (a.raised < b.raised) {
          return 1;
        } else if (a.raised > b.raised) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }
}


import { Pipe, PipeTransform } from '@angular/core';


import { Result } from 'app/shared/models/result.model';

@Pipe({
  name: 'sort',
  pure: true,
})
/**
 * The sorting mechanism assigned to the sorting feature on the display
 */
export class ArraySortPipe implements PipeTransform {

  /**
   * These two variables were essential to stopping Angular 2 from throwing errors that only happen in development mode.
   * If the value is not cached or compared to the previousValue of the unfiltered array Angular's double change detection will see that something has changed
   * This is due to Pipes changing the nature of the data very fast
   */
  private previousValue: Array<Result>;
  private cacheResult: Array<Result>;
  /**
   * Essential Transormation function form the PipeTransform interface!
   * @param array : the array to apply the transformation to
   * @param args : the arugments aplied to the pipe, here they were in format ['sort_field', 'order']
   */
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

  /**
   * Function to sort data based on which 'sort_field' (filterVar) was used.
   * @param array : same as above
   * @param args : same as above
   */
  transformArrayFromArgs(array: Array<Result>, args?: Array<string>) {
    let filterVar = args[0];
    let order = args[1];
    if (filterVar == "end_time") {
      return this.sortEndTime(array, order);
    }
    if (filterVar == "raised") {
      return this.sortRaisedAmount(array, order);
    }
  }

  /**
   * The function to sort by endTime
   * null values had to be considered as they were quite present
   * @param array : array to sort by endTime
   * @param order : sorting order
   */
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

  /**
   * Sorting function for amount_raised field
   * @param array : array to sort
   * @param order : order to sort by
   */
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


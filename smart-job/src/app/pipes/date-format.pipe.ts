import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormatUTC' })
export class DateFormatUTCPipe implements PipeTransform {
  defaultFormat = 'DD-MMM-YYYY';

  constructor() {}

  transform(value: Date, format: string = this.defaultFormat): string {
    return value !== null && value !== undefined
      ? moment.utc(value).format(format)
      : null;
  }
}

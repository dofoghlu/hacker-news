import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../common/util';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: number): string {

    // unix time to milliseconds
    time *= 1000;

    const now = new Date();
    const diff = now.getTime() - time;

    switch (true) {
      case diff >= Time.YEAR:
        const options: any = { month: 'long', year: 'numeric' }
        return 'on ' + new Intl.DateTimeFormat('en-GB', options).format(new Date(time));
      case diff >= Time.MONTH:
        const months = Math.round(diff / Time.MONTH);
        return months + (months > 1 ? ' months' : ' month') + ' ago';
      case diff >= Time.WEEK:
        const weeks = Math.round(diff / Time.WEEK);
        return weeks + (weeks > 1 ? ' weeks' : ' week') + ' ago';
      case diff >= Time.DAY:
        const days = Math.round(diff / Time.DAY);
        return days + (days > 1 ? ' days' : ' day') + ' ago';
      case diff >= Time.HOUR:
        const hours = Math.round(diff / Time.HOUR)
        return hours + (hours > 1 ? ' hours' : ' hour') + ' ago';
      case diff >= Time.MINUTE:
        const minutes = Math.round(diff / Time.MINUTE)
        return minutes + (minutes > 1 ? ' minutes' : ' minute') + ' ago';
      default:
        const seconds = Math.round(diff / Time.SECOND)
        return seconds + (seconds > 1 ? ' seconds' : ' second') + ' ago';
    }
  }

}

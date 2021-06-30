import { pipe } from 'rxjs';
import { TimePipe } from './time.pipe';

describe('TimePipe', () => {

  let TIME = {
    SECOND: 1e3,
    MINUTE: 6e5,
    HOUR: 36e5,
    DAY: 864e5,
    WEEK: 6048e5,
    MONTH: 2629746e3,
    YEAR: 31556952e3
  }

  it('create an instance', () => {
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return time in seconds', () => {
    const pipe = new TimePipe();

    let date = new Date();
    const time1 = date.setTime(date.getTime() - TIME.SECOND) / 1000;
    const time2 = time1 - TIME.SECOND / 1000;

    expect(pipe.transform(time1)).toBe('1 second ago');
    expect(pipe.transform(time2)).toBe('2 seconds ago');
  });

  it('should return time in minutes', () => {
    const pipe = new TimePipe();

    let date = new Date();
    const time1 = date.setTime(date.getTime() - TIME.MINUTE) / 1000;
    const time2 = time1 - TIME.MINUTE / 1000;

    expect(pipe.transform(time1)).toBe('1 minute ago');
    expect(pipe.transform(time2)).toBe('2 minutes ago');
  });

  it('should return time in hours', () => {
    const pipe = new TimePipe();
    let date = new Date();
    const time1 = date.setTime(date.getTime() - TIME.HOUR) / 1000;
    const time2 = time1 - TIME.HOUR / 1000;

    expect(pipe.transform(time1)).toBe('1 hour ago');
    expect(pipe.transform(time2)).toBe('2 hours ago');
  });

  it('should return time in days', () => {
    const pipe = new TimePipe();

    const date = new Date();
    const time1 = date.setTime(date.getTime() - TIME.DAY) / 1000;
    const time2 = time1 - TIME.DAY / 1000;

    expect(pipe.transform(time1)).toBe('1 day ago');
    expect(pipe.transform(time2)).toBe('2 days ago');
  });

  it('should return time in weeks', () => {
    const pipe = new TimePipe();

    const date = new Date();
    const time1 = date.setTime(date.getTime() - TIME.WEEK) / 1000;
    const time2 = time1 - TIME.WEEK / 1000;

    expect(pipe.transform(time1)).toBe('1 week ago');
    expect(pipe.transform(time2)).toBe('2 weeks ago');
  });

  it('should return time in months', () => {
    const pipe = new TimePipe();

    const date = new Date();
    const time1 = date.setTime(date.getTime() - TIME.MONTH) / 1000;
    const time2 = time1 - TIME.MONTH / 1000;

    expect(pipe.transform(time1)).toBe('1 month ago');
    expect(pipe.transform(time2)).toBe('2 months ago');
  });

  // it('should return time as date', () => {
  //   const pipe = new TimePipe();

  //   const date = new Date();
  //   const time1 = date.setTime(date.getTime() - TIME.YEAR) / 1000;

  //   expect(pipe.transform(time1)).toBe('29 June 2020');
  // });
});

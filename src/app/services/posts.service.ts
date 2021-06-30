import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, zip } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  URL = 'https://hacker-news.firebaseio.com/v0'

  itemIds: number[] | undefined;
  endpoint = '';

  pageSize = 20;
  maxPages = 500 / this.pageSize;

  constructor(private http: HttpClient) {
  }

  getPosts(endpoint: string, page: number) {
    if (this.endpoint !== endpoint) {
      this.endpoint = endpoint;
      this.itemIds = undefined;
    }

    let postsObservable = (this.itemIds ? of(this.itemIds) : undefined) || this.getItemIds(endpoint)

    return postsObservable.pipe(concatMap((items: any) => {

      if (!this.itemIds) this.itemIds = items;

      const end = page * this.pageSize
      const start = end - this.pageSize;

      const observables = [];

      for (let i = start; i < end; i++) {
        observables.push(this.getItem(items[i]));
      }

      return zip(...observables)
    }))
  }

  getItemIds(endpoint: string) {
    return this.http.get(this.URL + '/' + endpoint + '.json');
  }

  getItem(itemId: Number) {
    return this.http.get(this.URL + '/item/' + itemId + '.json');
  }

}

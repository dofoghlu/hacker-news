import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    postsService = TestBed.inject(PostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(postsService).toBeTruthy();
  });

  it('should return array of item ids', (done) => {
    postsService.getItemIds('topstories').subscribe(response => {
      expect(response).toEqual([1, 2, 3, 4]);
      done();
    });
    const request = httpTestingController.expectOne('https://hacker-news.firebaseio.com/v0/topstories.json');
    expect(request.request.method).toBe('GET');

    request.flush([1, 2, 3, 4]);

    httpTestingController.verify();
  });

  it('should return single item', (done) => {
    postsService.getItem(1).subscribe(response => {
      expect(response).toEqual({
        title: 'mock title',
        url: 'mock url'
      });
      done();
    });

    const request = httpTestingController.expectOne('https://hacker-news.firebaseio.com/v0/item/1.json');
    expect(request.request.method).toBe('GET');

    request.flush({
      title: 'mock title',
      url: 'mock url'
    });

    httpTestingController.verify();
  });
});

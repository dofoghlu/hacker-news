import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  scrollObservable: any;
  postsSubscription: any;

  posts: any = []
  page = 1;
  loading = false;
  scrollPercent = 70;

  constructor(private router: Router, private postsService: PostsService) { }

  ngOnInit(): void {
    this.loadPosts(this.page)

    // scroll event
    fromEvent(document, 'scroll')
      .pipe(
        map((e: any) => {
          return {
            scrollTop: e.target.documentElement.scrollTop,
            scrollHeight: e.target.documentElement.scrollHeight,
            clientHeight: e.target.documentElement.clientHeight
          }
        }),
        pairwise(),
        filter((scrollEvents: any[]) => this.isScrollingDown(scrollEvents) && this.isScrollPastTarget(scrollEvents[1], this.scrollPercent))
      ).subscribe(() => {
        if (!this.loading && this.page !== this.postsService.maxPages) {
          this.loadPosts(++this.page)
        }
      })
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  getApiEndointFromUrl(url: string) {
    switch (url) {
      case '/new':
        return 'newstories'
      case '/best':
        return 'beststories'
      default:
        return 'topstories'
    }
  }

  isScrollingDown(scrollEvents: any[]) {
    return scrollEvents[0].scrollTop < scrollEvents[1].scrollTop;
  }

  isScrollPastTarget(scrollEvent: any, targetPercent: number) {
    return (scrollEvent.scrollTop + scrollEvent.clientHeight) / scrollEvent.scrollHeight > (targetPercent / 100);
  }

  loadPosts(page: number) {
    const endpoint = this.getApiEndointFromUrl(this.router.url)

    this.loading = true;

    this.postsSubscription = this.postsService.getPosts(endpoint, page).subscribe((data) => {
      this.posts = [...this.posts, ...data];
      this.loading = false;
    });
  }
}

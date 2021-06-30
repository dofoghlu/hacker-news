import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if scroll down - true', () => {
    const scrollEvents = [
      {
        scrollTop: 1
      },
      {
        scrollTop: 2
      }
    ]

    expect(component.isScrollingDown(scrollEvents)).toBe(true);
  });

  it('should check if scroll down - false', () => {
    const scrollEvents = [
      {
        scrollTop: 2
      },
      {
        scrollTop: 1
      }
    ]

    expect(component.isScrollingDown(scrollEvents)).toBe(false);
  });

  it('should check if scroll position is greater than percentage - true', () => {
    const scrollEvent =
    {
      scrollTop: 300,
      clientHeight: 600,
      scrollHeight: 1000
    }

    expect(component.isScrollPastTarget(scrollEvent, 70)).toBe(true);
  });

  it('should check if scroll position is greater than percentage - false', () => {
    const scrollEvent =
    {
      scrollTop: 300,
      clientHeight: 400,
      scrollHeight: 1000
    }

    expect(component.isScrollPastTarget(scrollEvent, 70)).toBe(false);
  });

  it('should check if scroll position is greater than percentage - false', () => {
    const scrollEvent =
    {
      scrollTop: 300,
      clientHeight: 400,
      scrollHeight: 1000
    }

    expect(component.isScrollPastTarget(scrollEvent, 70)).toBe(false);
  });

  it('should get api endpoint from url', () => {
    const testCases = [
      { input: '/top', expected: 'topstories' },
      { input: '/new', expected: 'newstories' },
      { input: '/best', expected: 'beststories' }
    ]

    testCases.forEach(tc => {
      expect(component.getApiEndointFromUrl(tc.input)).toEqual(tc.expected);
    });
  });
});

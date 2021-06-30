import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { TimePipe } from 'src/app/pipes/time.pipe';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent, TimePipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    component.post = {
      title: 'mock title',
      score: 10,
      by: 'mock user',
      time: 1625066646,
      kids: [1, 2, 3, 4]
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'mock title'`, () => {
    expect(component.post.title).toEqual('mock title');
  });

  it('should render post title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toBe('mock title');
  });

  it('should render post score', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#score').textContent).toBe('10 points ');
  });

  it('should render post user', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#by').textContent).toBe('by mock user ');
  });

  it('should render post comments', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#comments').textContent).toBe('• 4 comments');
  });
});

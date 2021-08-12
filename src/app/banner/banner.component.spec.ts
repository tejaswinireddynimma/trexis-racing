import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { BannerComponent } from './banner.component';
import { HttpClientModule } from '@angular/common/http';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [HttpClientModule, RouterModule],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(BannerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.display-4').textContent).toContain('Trexis Racing');
    expect(compiled.querySelector('.lead').textContent).toContain('Redefining digital frontiers.');
  });
});

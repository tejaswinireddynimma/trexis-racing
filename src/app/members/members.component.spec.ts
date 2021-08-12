import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { MembersComponent } from './members.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {of} from 'rxjs';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadMembers() should call service', () => {
    spyOn(component.appService, 'getMembers').and.returnValue(of([]));
    component.loadMembers();
    expect(component.members).toEqual([]);
  });

  it('deleteMemberById() should call service', () => {
    spyOn(component.appService, 'deleteMember').and.returnValue(of([]));
    spyOn(component, 'loadMembers').and.callFake(function () {});
    component.deleteMemberById(1);
    expect(component.loadMembers).toHaveBeenCalled();
  });

  it('goToAddMemberForm() should redirect', () => {
    component.goToAddMemberForm();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/details');
  });

  it('editMemberByID() should redirect', () => {
    component.editMemberByID(1);
    // expect(mockRouter.navigate).toHaveBeenCalledWith(['/details'], {queryParams: {id: 1}});
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/details');
  });

  it('ngOnInit() should call loadservice', () => {
    spyOn(component, 'loadMembers').and.callThrough();
    component.ngOnInit();
    expect(component.loadMembers).toHaveBeenCalled();
  });

});

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppService } from '../app.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MemberDetailsComponent } from './member-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    navigate: jasmine.createSpy('navigate')
  }
  const fb: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        HttpClient,
        {provide: FormBuilder, useValue: fb},
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addMember() should call service', () => {
    spyOn(component.appService, 'addMember').and.returnValue(of({}));
    component.addMember();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/members');
  });

  it('onSubmit() should call updateMember for edit mode', () => {
    spyOn(component.appService, 'updateMember').and.returnValue(of({}));
    spyOn(component, 'updateMember').and.callThrough();
    component.editMode = true;
    component.onSubmit({});
    expect(component.updateMember).toHaveBeenCalled();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/members');
  });

  it('onSubmit() should call updateMember for edit mode', () => {
    spyOn(component.appService, 'addMember').and.returnValue(of({}));
    spyOn(component, 'addMember').and.callThrough();
    component.editMode = false;
    component.onSubmit({});
    expect(component.addMember).toHaveBeenCalled();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/members');
  });

  it('loadRouteParams() should load the component in editmode', ()=> {
    const member = {firstName: 'test', lastName: 'test'}
    component.appService.editMemberId = 1;
    spyOn(component.appService, 'getMember').and.returnValue(of(member));
    component.loadRouteParams();
    expect(component.editMode).toEqual(true);
    expect(component.editId).toEqual(1);
    expect(component.memberForm.controls['firstName'].value).toEqual('test');
    expect(component.memberForm.controls['lastName'].value).toEqual('test');
  });

  it('ngOnInit() should call loadRouteParams()', ()=> {
    component.appService.editMemberId = 1; 
    spyOn(component.appService, 'getTeams').and.returnValue(of([]));
    spyOn(component, 'loadRouteParams').and.callFake(function (){});
    component.ngOnInit();
    expect(component.loadRouteParams).toHaveBeenCalled();
    expect(component.appService.editMemberId).toEqual(undefined);
  })
});

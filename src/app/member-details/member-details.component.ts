import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppService } from '../app.service';
import { Member } from '../model/member';
import { Router } from '@angular/router';
import { Team } from '../model/team';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams: Team[] = [];
  editMode: boolean;
  editId: number;

  constructor(private fb: FormBuilder, public appService: AppService, public router: Router) {
  }

  ngOnInit() {
    this.memberForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });

    this.appService.getTeams().subscribe(teams => {
      this.teams = teams
      if (this.appService.editMemberId != undefined) {
        this.loadRouteParams();
        this.appService.editMemberId = undefined;
      }
    });
  }


  loadRouteParams() {
    this.editId = this.appService.editMemberId;
    this.editMode = true;
    this.appService.getMember(this.editId).subscribe(member => { 
      this.memberForm.controls['firstName'].setValue(member.firstName);
      this.memberForm.controls['lastName'].setValue(member.lastName);
      this.memberForm.controls['jobTitle'].setValue(member.jobTitle);
      this.memberForm.controls['team'].setValue(member.team);
      this.memberForm.controls['status'].setValue(member.status);
    });
  }

  ngOnChanges() { }

  onSubmit(value) {
    this.memberModel = value;
    this.editMode ? this.updateMember() : this.addMember();
  }

  addMember() {
    this.appService.addMember(this.memberModel).subscribe(m => {
      this.router.navigateByUrl('/members');
    });
  }

  updateMember() {
    this.appService.updateMember(this.editId, this.memberModel).subscribe(m => {
      this.router.navigateByUrl('/members');
    });
  }
}

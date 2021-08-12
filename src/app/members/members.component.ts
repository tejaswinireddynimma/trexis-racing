import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { Member } from '../model/member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[] = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    this.router.navigateByUrl('/details');
  }

  editMemberByID(id: number) {
    this.appService.editMemberId = id;
    this.router.navigateByUrl('/details');
    // this.router.navigate(['/details'], {queryParams: {id: id}});
  }

  deleteMemberById(id: number) {
    console.log('delete id=', id);
    this.appService.deleteMember(id).subscribe( res => {
      this.loadMembers();
    });
  }
}

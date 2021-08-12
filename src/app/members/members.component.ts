import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: any[] = [];

  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getMembers()
  }

  goToAddMemberForm() {
    
  }

  getMembers(){
    this.appService.getMembers().subscribe((members: any) => (this.members = members));
  }
}

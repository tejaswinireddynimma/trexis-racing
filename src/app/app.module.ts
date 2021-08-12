import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { BannerComponent } from './banner/banner.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MembersComponent } from './members/members.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// We may be missing a route...
const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'details',
    component: MemberDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

// Notice how both FormsModule and ReactiveFormsModule imported...choices, choices!
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BannerComponent,
    MemberDetailsComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppService, HttpClient, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }

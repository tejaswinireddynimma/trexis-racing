import { AppService } from "src/app/app.service";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate { 
  constructor(private appService: AppService) {}; 

  canActivate() {
    const loggedIn = this.appService.isLoggedIn();
    console.log('is user loggedIn = ', loggedIn);
    return loggedIn;
  }
}
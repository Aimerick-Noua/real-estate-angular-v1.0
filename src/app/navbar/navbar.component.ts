import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userServiceService } from '../admins/users/userService.service';
import { UserAuthService } from '../servicesAuth/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  userRoles: any;
  roleName: any;

  constructor(private userAuthService:UserAuthService,
    private router:Router,
    public userService:userServiceService) { }
    adminRole!:any;

  ngOnInit(): void {
    if(this.isLoggedIn()){
      this.adminRole = this.userAuthService.getRoles();

      if (this.adminRole) {
        this.userRoles = JSON.parse(this.adminRole);
        // Assuming there's only one role in the array, you can extract the roleName like this:
        if (this.userRoles.length > 0) {
          this.roleName = this.userRoles[0].roleName;
        }
      }
    }
  }
  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }
  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }

}


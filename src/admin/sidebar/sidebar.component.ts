import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DisplayService } from 'src/app/Services/display.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private jwtHelper: JwtHelperService,private router: Router,private displayService: DisplayService) { }


  public logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("ApplicationUserId");
    localStorage.removeItem("UserName");
    this.router.navigate(["/admin/dashboardLogin"]);
  }

  ngOnInit() {
    this.displayService.setNavigationVisibility(false);
  }
  ngOnDestroy(): void {
    this.displayService.setNavigationVisibility(true);
  }
  

}

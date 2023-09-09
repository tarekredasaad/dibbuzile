import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }
  
  canActivate() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      //const decodeToken = this.jwtHelper.decodeToken(token);
      return true;
    }
    this.router.navigate(['']); 
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please Login',
    })
        return false;
  }
}

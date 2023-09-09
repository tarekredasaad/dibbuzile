import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EnrollService } from 'src/authintication/Services/enroll.service';
import { ForbiddenEmailValidator } from 'src/authintication/validations/email.validators';
import Swal from 'sweetalert2';
import { DisplayService } from 'src/app/Services/display.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private jwtHelper: JwtHelperService,private enrollService: EnrollService, private fb: FormBuilder, private router: Router,private displayService: DisplayService) { }

  LoginForm = this.fb.group({
    Password: ['', [Validators.required]],
    Email: ['', [Validators.required, ForbiddenEmailValidator(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)]],
  })

  passErrorMSG:string="";

  

  get Email() {
    return this.LoginForm.get('Email');
  }

  get Password() {
    return this.LoginForm.get('Passwords');
  }


  ngOnInit() {
    this.displayService.setNavigationVisibility(false);
  }
  
  ngOnDestroy(): void {
    this.displayService.setNavigationVisibility(true);
  }
  
  Login() {
    if (this.LoginForm.valid) {
       this.enrollService.LoginEmailAndPassword(this.LoginForm.value).subscribe({
        next: (data:any) => {
        console.log(data);
        if(data.statusCode==200)
        {
        const token = (<any>data).data.token;
        localStorage.setItem("jwt", token);
        const decodeToken = this.jwtHelper.decodeToken(token);
        console.log(decodeToken)
        localStorage.setItem("ApplicationUserId",decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
        localStorage.setItem("UserName", decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
        let roles = decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if(Array.isArray(roles))
          this.router.navigate(["/admin/dashboard/categories"]);
        }
        else if(data.statusCode==404)
        {
            this.passErrorMSG=data.message;
            console.log(this.passErrorMSG)
        }
        },
        error: err => {
          console.log(err);
        }
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid Password',
      })
    }
  }





}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnrollService } from 'src/authintication/Services/enroll.service';
import { ConfirmPasswordValidator } from 'src/authintication/validations/confirmPassword.validators';
import { ForbiddenEmailValidator } from 'src/authintication/validations/email.validators';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  UserName:any;
  display = '';
  Emaildisplay = '';
  passworddisplay = '';
  confirmPassdisplay = '';
  ConfirmPasswordDiv = false;

  passErrorMSG:string="";

  constructor(private jwtHelper: JwtHelperService,private enrollService: EnrollService, private fb: FormBuilder, private router: Router) { }

  LoginForm = this.fb.group({
    Password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    Email: ['', [Validators.required, ForbiddenEmailValidator(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)]],
  }, { validator: [ConfirmPasswordValidator] })



  ngOnInit() {

  }

  openLoginModal() {
    this.display = 'block';
  }

  onCloseLoginModal() {
    this.display = 'none';
    this.Emaildisplay = 'none';
    this.passworddisplay = 'none';
    this.confirmPassdisplay = 'none';
  }



  openEmailModal() {
    this.Emaildisplay = 'block';
    this.display = 'none';
  }

  onCloseEmailModal() {
    this.Emaildisplay = 'none';
    this.display = 'block';
  }



  openPasswordModal() {
    this.passworddisplay = 'block';
    this.Emaildisplay = 'none';
    this.display = 'none';
  }

  onClosePasswordModal() {
    this.Emaildisplay = 'block';
    this.passworddisplay = 'none';
    this.display = 'none';
  }



  openConfirmPasswordModal() {
    this.confirmPassdisplay = 'block';
    this.passworddisplay = 'none';
    this.Emaildisplay = 'none';
    this.display = 'none';
  }

  onCloseConfirmPasswordModal() {
    this.confirmPassdisplay = 'none';
    this.Emaildisplay = 'block';
    this.passworddisplay = 'none';
    this.display = 'none';
  }




  get Email() {
    return this.LoginForm.get('Email');
  }

  get Password() {
    return this.LoginForm.get('Passwords');
  }

  get confirmPassword() {
    return this.LoginForm.get('confirmPassword');
  }



  sendEmail() {
    if (this.LoginForm.get('Email')?.valid) {
      //call service
      this.enrollService.PostEmail(this.LoginForm.value).subscribe({
        next: (data:any) => {
          console.log(data.statusCode);
          console.log(data.message);
          if(data.statusCode==200)
          this.openPasswordModal() // Login pass
          else if(data.statusCode==204)
          this.openConfirmPasswordModal();
          else // 203 deleted user
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Email already exist but Deleted and can't be used",
          })
        },
        error: err => {
          console.log(err);
          // Register pass
        }
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid Email',
      })
    }
  }


  sendEmailAndPassRegister() {
    if (this.LoginForm.valid) {
      //call service
      this.enrollService.RegisterEmailAndPassword(this.LoginForm.value).subscribe({
        next: (data:any) => {
        console.log(data);
        if(data.statusCode==200)
        {
          this.onCloseLoginModal();
          this.sendEmailAndPassLogin();
                 
        }
        else if(data.statusCode==404)
        {
            console.log(data.data.ModelStateErrors.errors)//errorMessage
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

  sendEmailAndPassLogin() {
    if (this.LoginForm.get('Password')?.valid) {
      //call service
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
        //this.router.navigate(["/resturant/profile"]);
        window.location.href='';
        this.onCloseLoginModal();
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


  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.UserName=localStorage.getItem("UserName");
      const decodeToken = this.jwtHelper.decodeToken(token);
      return true;
    }
    else {
      return false;
    }
  }

  
  public logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("ApplicationUserId");
    localStorage.removeItem("UserName");
   // this.router.navigate(['']);
    window.location.href='';

  }


  search(serachInputValue:any)
  {
    console.log(serachInputValue)
      this.router.navigate(['/filteration/Advertisment/',0,serachInputValue]);
  }

}

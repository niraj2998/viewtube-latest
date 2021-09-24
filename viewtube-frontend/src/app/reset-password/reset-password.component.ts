import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ResetPassword } from '../Models/resetPassword';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  faUser = faUser;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword : string;

  constructor(private router: Router,private authsvc: AuthServiceService) { }

  handleSubmit(form : any){
    let user = new ResetPassword(this.email, this.oldPassword, this.newPassword);
    if(this.confirmPassword == this.newPassword){
      this.authsvc.resetPassword(user).subscribe(
        (res: any) => {
          alert("password reset successfully done");
          this.router.navigate(['login']);
        },
        (error: any) => {
          alert(`please fill the data in all fields`)
        }
      );
    }
    else
    {
      alert("Confirm password and password does not match");
    }
  }

  userprofile(){
    this.router.navigate(['userprofile'])
  }
  getHome(){
    this.router.navigate(['home'])
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  ngOnInit(): void {
  }

}

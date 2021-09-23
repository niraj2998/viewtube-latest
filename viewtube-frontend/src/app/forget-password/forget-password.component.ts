import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetPassword } from '../Models/forgetPassword';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  email: string;
  newPassword: string;
  confirmPassword : string;

  isEmail : boolean = false;
  isRegister: boolean = false;

  constructor(private router: Router,private authsvc: AuthServiceService) { }

  handleSubmit(form : any){
    // let user = new ForgetPassword(this.email, this.newPassword);
    if(!this.isEmail){
      this.authsvc.getUserForForgetPass(this.email).subscribe(
        (res: any) => {
          alert(`Reset password link sent to ${this.email}`)
          this.isEmail = true;
        },
        (error: any) => {
          alert(`User with this ${this.email} does not exist!`)
        }
      );
    }
    else
    {
      if(this.confirmPassword == this.newPassword){
        let user = new ForgetPassword(this.email, this.newPassword);
    this.authsvc.forgetPassword(user).subscribe(
      (res: any) => {
        alert("password reset successfully done");
        this.router.navigate(['login']);
      },
      (error: any) => {
        alert(`${error.error}!`)
      }
    );
      }
      else{
        alert("Confirm password and password field does not match");
      }
    
    }
    

  }

  register() {
    this.isRegister = !this.isRegister;
    //this.router.navigate(['registration'])
  }
  login(){
    this.router.navigate(['login'])
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ApiServiceService } from '../api-service.service';
import { AuthServiceService } from '../Services/auth-service.service';
import { SharedService } from '../Services/shared.service';


@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {
 // @Input() videoId : any;
 faUser = faUser;
   videoId:any;
  constructor( private authservice:AuthServiceService, private service: ApiServiceService,private router : Router,private shared:SharedService) { }

  ngOnInit(): void {
    this.videoId = this.shared.getVideoId();
    console.log(this.videoId);
      
  } 
  userprofile() {
    this.authservice.getUser().subscribe(
      (res: any) => {
        this.router.navigate(['userprofile'])
 
      }
    ) 
  }
  getFavourites(){
    this.router.navigate(['fav'])
  }
  resetPassword(){
    this.router.navigate(['reset-password'])
  }
  
  logout(){
    sessionStorage.clear();
    this.router.navigate(['login'])
  }
  getHome(){
    this.router.navigate(['home'])
  }
}

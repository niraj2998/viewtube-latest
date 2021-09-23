import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MiddleService } from '../middle.service';
import { SharedService } from '../Services/shared.service';
import {FavServiceService} from '../Services/fav-service.service';
import { AuthServiceService } from './../Services/auth-service.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  faUser = faUser;
  userFavourites:any;
  favChannelList:any;
  userId:any;
  userData : any;
  videoData:any;
  videoid:any=[];
  constructor(  private authservice:AuthServiceService,private favservice:FavServiceService ,private mservice:MiddleService,private router:Router,private share:SharedService) { }
  
  ngOnInit(): void {
   // this.userId=this.favservice.favVideoDetails.userId;
   // console.log(this.userId)
   
    this.authservice.getUser().subscribe(res=>{
     this.userData = res;
     this.userId = this.userData.userId;
     console.log(this.userId)
        
    this.favservice.myfavVideos(this.userId).subscribe((data) => {
      console.log(data);
      this.videoData=data;
      for(let item of this.videoData) {
        this.videoid.push(item.videoId);
      }
      console.log(this.videoid)
    })
    });
  
 // console.log(this.userId);
   
  }
  // getFavourites(){
  //   this.userFavourites=this.share.getFavourites()
   // console.log(this.userFavourites)
  // }
  resetPassword(){
    this.router.navigate(['reset-password'])
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
  getFavourites(){
    this.router.navigate(['fav'])
  }
 
}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FavServiceService } from '../Services/fav-service.service';
import { SharedService } from '../Services/shared.service';



@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.css']
})
export class FavButtonComponent implements OnInit {
  @Input() thumbnail : any;
  @Input() videoTitle : any;
  @Input() videoId :any;
  @Input() channelTitle : any;
  @Input() isUserProfile : any;
  @Input() userId:any;
  @Input() isFav : boolean;
  @Input() iconClass : string = "far fa-heart";
  // userId : number ;

  if(isFav){
    this.iconClass = "fas fa-heart"
  }  
  
   videoDetails:any;
  constructor( private favVideoService:FavServiceService,private shared:SharedService, private router: Router) {
   }

  addToFav(userId,thumbnail,videoTitle,channelTitle,videoId){
    var isLoggedIn = sessionStorage.getItem("email");
    if(isLoggedIn != null) {
      this.isFav = !this.isFav;
      this.isFav ? this.iconClass = "fas fa-heart" : this.iconClass = "far fa-heart"

      if(this.isFav){
        var videoDetails = { 
          userId: userId,
          thumbnail: thumbnail, 
          videoTitle: videoTitle,
          channelTitle : channelTitle,
          videoId : videoId 
       }; 
      //  this.shared.addToFavourite(videoDetails);
        console.log("addint to favlist:",videoDetails);
        this.favVideoService.addVideos(videoDetails).subscribe(
          (res: any) => {
            console.log(res);
          },
          (error: any) => {
            alert(error);
            //console.log(error)
            //alert(error.error)
          }
        );
      }
      else{
        var videoDetails = { 
          userId: userId,
          thumbnail: thumbnail, 
          videoTitle: videoTitle,
          channelTitle : channelTitle,
          videoId : videoId 
       };
       this.favVideoService.deleteFavVideos(videoDetails).subscribe(
        (res: any) => {
          console.log(res);
        },
        (error: any) => {
          alert(error);
          //console.log(error)
          //alert(error.error)
        }
      );

      }


      
    }
    else
    {
      alert("Login first");
      this.router.navigate(['/']);
    }
  }
 deleteFromFav(){

 }
  ngOnInit(): void {
    
    if(this.isFav){
      this.iconClass = "fas fa-heart"
    }
  
  }

}

import { ApiServiceService } from './../api-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../Services/shared.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthServiceService } from '../Services/auth-service.service';


@Component({
  selector: 'app-video-section',
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.css']
})
export class VideoSectionComponent implements OnInit {
  @Input() thumbnail : any;
  @Input() videoTitle : any;
  @Input() videoId :any;
  @Input() channelTitle : any;
  @Input() isUserProfile : any;
  
  @Input() favVideoArray : any[];
  iconClass : string = "far fa-heart";
  @Input() isFav : boolean;

  filledHeart : string = "fas fa-heart"
  emptyHeart : string = "far fa-heart"

   


  
  userDetails:any;
  singleUser:any;
  constructor(private router:Router,private authService:AuthServiceService,private shared:SharedService) {

   }

  handleCick(){
    
    let vid = this.videoId;
    this.shared.setVideoId(vid)
    this.router.navigate(['videoplayer'])
   
  }
  
  ngOnInit(): void {
    // for(let id of this.favVideoArray){
    //   if(id === this.videoId){
    //     this.isFav = true;
    //   }
    //   else
    //   {
    //     this.isFav = false;
    //   }
    // }

    this.authService.getUser().subscribe((res) => {
      console.log("in video section");
    
      //console.log(res);
      this.userDetails=res;
      this.singleUser=this.userDetails.userId;
    });

    
     

  }


  

}

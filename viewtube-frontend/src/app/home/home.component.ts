import { FavServiceService } from './../Services/fav-service.service';
import { AuthServiceService } from './../Services/auth-service.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { MiddleService } from '../middle.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faUser = faUser;
  @ViewChild('channelName') channelName: ElementRef;
  @ViewChild('categoryChannel') categoryChannel: ElementRef;
  popularVideos: any
  //cat: any = []
  inHOme : boolean = true;
  inSearch : boolean = false;
  inCategory : boolean = false;
  catChannl:any;
  cID: any = [];
  searchedVideos: any;
  videosByCategory : any;
  favVideos : any; 
  userDetails:any;
  userId : any;
  isFav : any;
  favVideosList : any[] = [];
  //isUser : boolean = false;
  constructor(private http: HttpClient,private authservice:AuthServiceService, private service: ApiServiceService, private router: Router, private mservice: MiddleService, private favVideosService : FavServiceService) {
  }
  //email : any = sessionStorage.getItem("email");

  userprofile() {
    var isLoggedIn = sessionStorage.getItem("email");
    if(isLoggedIn != null){
      this.authservice.getUser().subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['userprofile'])
   
        }
      )
    }
    else
    {
      alert("you need to login first");
      this.router.navigate(['/']);
    }
   
  }
  ngOnInit(): void {
    // this.authservice.getUser().subscribe((res) => {
    //   console.log(res)
    //   this.userDetails=res;
    // });
    // console.log(this.userDetails.userId)
    this.service.getPopularVideos().subscribe(
       (data) => {
        console.log("fetching all channels{10}", data);
        this.popularVideos = data.items;
        console.log(this.popularVideos)
        this.authservice.getUser().subscribe((res) => {
          //console.log(res)
          this.userDetails=res;
          console.log(this.userDetails.userId)
          this.userId = this.userDetails.userId;
          this.favVideosService.myfavVideos(this.userId).subscribe(
            (data) => {

              this.favVideos = data;
              console.log(this.favVideos);
              this.popularVideos.forEach((video) => {
                video.isFav = false;
                this.favVideos.map((favVideo) => {
                  // console.log(favVideo)
                  if(video.id == favVideo.videoId){

                    this.favVideosList.push(favVideo.videoId);
                    video.isFav = true
                  }
                })
              })

              }
          );
        });
      }
    );
  // testing
  this.service.categoryChannels(this.cID).subscribe((data)=>{
    console.log("category channels:",data)
    this.catChannl=data.items;
    console.log(this.catChannl);
    
  });

  

  

  
 // console.log(this.userDetails.userId)

}
  //testing

  
  searchVideos() {
    this.inHOme = false;
    this.inSearch = true;
    this.inCategory = false;
    let channelName = this.channelName.nativeElement.value;
    this.service.searchVideosService(channelName).subscribe((data) => {
      console.log("searched channels", data);
      this.searchedVideos = data.items;

      this.authservice.getUser().subscribe((res) => {
        //console.log(res)
        this.userDetails=res;
        console.log(this.userDetails.userId)
        this.userId = this.userDetails.userId;
        this.favVideosService.myfavVideos(this.userId).subscribe(
          (data) => {
  
            this.favVideos = data;
            console.log(this.favVideos);
  
            this.searchedVideos.forEach((video) => {
              video.isFav = false;
              console.log(video);
              this.favVideos.map((favVideo) => {
                // console.log(favVideo)
                if(video.id.videoId == favVideo.videoId){
                  this.favVideosList.push(favVideo.videoId);
                  video.isFav = true
                }
              })
            })
  
            }
        );
      });
    })
  }

  category(id){
    this.inHOme = false;
    this.inSearch = false;
    this.inCategory = true;

    this.service.categoryChannels(id).subscribe((data) => {
      console.log("got videos by category", data);
      this.videosByCategory = data.items;

      this.authservice.getUser().subscribe((res) => {
        //console.log(res)
        this.userDetails=res;
        console.log(this.userDetails.userId)
        this.userId = this.userDetails.userId;
        this.favVideosService.myfavVideos(this.userId).subscribe(
          (data) => {
  
            this.favVideos = data;
            console.log(this.favVideos);
  
            this.videosByCategory.forEach((video) => {
              video.isFav = false;
              console.log(video);
              this.favVideos.map((favVideo) => {
                // console.log(favVideo)
                if(video.id == favVideo.videoId){
                  this.favVideosList.push(favVideo.videoId);
                  video.isFav = true
                }
              })
            })
  
            }
        );
      });
      
    })
  }

    // categoriChannels(){
    //   //let categoryName= this.categoryChannel.nativeElement.value;
    //   this.service.categoryChannels(this.cID).subscribe((data)=>{
    //   console.log("category channels:",data)
    //   this.catChannl=data.items;
    //   console.log(this.catChannl)
    //   })
  
    // }
    resetPassword(){
      this.router.navigate(['reset-password'])
    }
  
    getFavourites(){
      this.router.navigate(['fav'])
    }
    logout(){
      sessionStorage.clear();
      this.router.navigate(['login'])
    }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertismentServiceService } from '../Services/advertisment-service.service';
import { IFavourite } from '../Interface/IFavorite';
import { FavoriteService } from '../Services/favorite.service';

@Component({
  selector: 'app-advertisment-user',
  templateUrl: './advertisment-user.component.html',
  styleUrls: ['./advertisment-user.component.scss']
})
export class AdvertismentUserComponent implements OnInit {
  userId:any;
  advertismentUser:any;
  Favorite: IFavourite = new IFavourite("", 0);
  appUserId: any;
  errorMessage:string="";
  
  
  constructor(private favoriteService:FavoriteService,private activeRoute:ActivatedRoute, private advertismentUserService :AdvertismentServiceService,private router:Router){}
  ngOnInit(): void {
    this.appUserId = localStorage.getItem("ApplicationUserId");
    this.userId=this.activeRoute.snapshot.paramMap.get("id");

      this.advertismentUserService.getAdvertismentUser(this.userId,this.appUserId).subscribe({
        next:data=>{
          this.advertismentUser=data
        },
       })
       
  }

  AdvertismentUserDetails(a:any){
   this.router.navigate(["/Details",a.id])
  }

  async AddToFavorite(ads:any){
    var heart=document.getElementById("heart"+ads.id+this.appUserId);
    console.log(heart?.style.color);
    if(heart?.style.color=="rgb(255, 255, 255)"){
    //console.log("hi")
    this.Favorite.advertismentID=ads.id;
    this.Favorite.applicationUserId=this.appUserId;
    await this.favoriteService.AddFavorite(this.Favorite).subscribe({
    next:data=>console.log(data),
    error:error=>this.errorMessage=error
  })
  heart.style.color="rgb(224, 0, 0)";
  }
  else{
  console.log("hi")
   this.favoriteService.DeleteFavorite(ads.id,this.appUserId).subscribe({
    next:data=>console.log(data),
    error:error=>this.errorMessage=error
   })
   heart!.style.color="rgb(255, 255, 255)";
  }
  }
}

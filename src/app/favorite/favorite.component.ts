import { Component , OnInit} from '@angular/core';
import { FavoriteService } from '../Services/favorite.service';
import { Router } from '@angular/router';
import { IFavourite } from '../Interface/IFavorite';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  userId:any=''
  favorites:any;
  errorMessage:any;
  Favorite:IFavourite=new IFavourite("",0);
  index:any;
  arr:any;
  constructor(private favoriteService:FavoriteService,private router:Router){}
  ngOnInit(): void {
    this.userId=localStorage.getItem("ApplicationUserId");
    this.favoriteService.getAllFavorite(this.userId).subscribe({
      next:data=>this.favorites=data.advertismentHomePageDTOs,
      error:error=>this.errorMessage=error
    })
  }
  AdvertismentDetails(a:any){
    console.log(a.id);
    this.router.navigate(["/Details",a.id]);
  } 

  async AddToFavorite(ads:any,i:any){
    var heart=document.getElementById("heart"+ads.id+this.userId);
    console.log(heart?.style.color);
    if(heart?.style.color=="rgb(255, 255, 255)"){
    //console.log("hi")
    this.Favorite.advertismentID=ads.id;
    this.Favorite.applicationUserId=this.userId;
    await this.favoriteService.AddFavorite(this.Favorite).subscribe({
    next:data=>console.log(data),
    error:error=>this.errorMessage=error
  })
  heart.style.color="rgb(224, 0, 0)";
}
else{
  console.log("hi")
   this.favoriteService.DeleteFavorite(ads.id,this.userId).subscribe({
    next:data=>console.log(data),
    error:error=>this.errorMessage=error
   })
   heart!.style.color="rgb(255, 255, 255)";
   this.favorites.splice(i,1);
}
  }
}

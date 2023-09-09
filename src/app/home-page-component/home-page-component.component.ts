import { Component,OnInit } from '@angular/core';
import { HomeServiceService } from '../Services/home-service.service';
import { Route, Router } from '@angular/router';
import { IFavourite } from '../Interface/IFavorite';
import { FavoriteService } from '../Services/favorite.service';

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page-component.component.html',
  styleUrls: ['./home-page-component.component.scss']
})
export class HomePageComponentComponent implements OnInit{
  categories:any=[]
  errorMessage:string=""
  Favorite:IFavourite=new IFavourite("",0);
  isSaved:boolean=false;
  Advertisments:any;
  userId:any
constructor(private homeService:HomeServiceService, private router:Router,private favoriteService:FavoriteService){}
  ngOnInit(): void {
    this.userId=localStorage.getItem("ApplicationUserId")
    //console.log("hello",localStorage.getItem("ApplicationUserId"))
    this.homeService.getCategoriesWithSub().subscribe({
      next:data=>this.categories=data,
      error:error=>this.errorMessage=error
    })
    this.homeService.getAdvertisments(this.userId).subscribe({
      next:data=>this.Advertisments=data,
      error:error=>this.errorMessage=error
    })
  }

  AdvertismentsByCategory(c:any){
    this.router.navigate(["/filteration/Advertisment/",c.id,'category'])
}
AdvertismentsBySubCategory(s:any){
  this.router.navigate(["/filteration/Advertisment/",s.id,'subcategory'])
}
   AdvertismentDetails(a:any){
    console.log(a.id);
    this.router.navigate(["/Details",a.id]);
  } 
  async AddToFavorite(ads:any){
    var heart=document.getElementById("heart"+ads.id+this.userId);
    console.log(heart?.style.color);
    if(heart?.style.color=="rgb(255, 255, 255)"){
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
}
}

NavigateToAds(category:any){
  this.router.navigate(["/filteration/Advertisment/",category.id,'category']);
}
}

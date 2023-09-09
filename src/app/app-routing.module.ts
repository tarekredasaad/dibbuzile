import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponentComponent } from './home-page-component/home-page-component.component';
import { ChatComponent } from './chatpage/chat/chat.component';
import { AdvertismentDetailsComponent } from './advertisment-details/advertisment-details.component';
import { AdvertismentUserComponent } from './advertisment-user/advertisment-user.component';
import { FavoriteComponent } from './favorite/favorite.component';

import { PackageComponent } from 'src/admin/package/package.component';
import { PackagesComponent } from './packages/packages.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { CategoriesBeforePackagesComponent } from './categories-before-packages/categories-before-packages.component';
import { MyPackagesComponent } from './my-packages/my-packages.component';

import { UserprofileComponent } from 'src/profile/userprofile/userprofile.component';
import { CatBeforeAdComponent } from './cat-before-ad/cat-before-ad.component';
import { AdPostComponent } from './ad-post/ad-post.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { AuthGuardService } from 'src/authintication/Services/auth-guard.service';









const routes: Routes = [
{path:'',component:HomePageComponentComponent},
//test
  //{path:"profile",component:UserprofileComponent},
  

  {path:'',component:HomePageComponentComponent},

  //{path:"profile",component:UserprofileComponent}
 {path:"chat/:adId/:UserID",component:ChatComponent},

  {path:'Home/:id',component:HomePageComponentComponent},
  // {path:'home-page',loadChildren:()=>import("../home-page/home-page.module").then(m=>m.HomePageModule)},

 {path:"myprofile",loadChildren:()=>import("../profile/profile.module").then(m=>m.ProfileModule)},
//  {path:'Home',component:HomePageComponentComponent},
  {path:'categories',component:CategoriesBeforePackagesComponent,canActivate:[AuthGuardService]},
  {path:'package/:id',component:PackagesComponent,canActivate:[AuthGuardService]},
  {path:'Details/:id',component:AdvertismentDetailsComponent},
  {path:'Favorite',component:FavoriteComponent,canActivate:[AuthGuardService]},
  {path:'MyAds',component:MyAdsComponent,canActivate:[AuthGuardService]},
  {path:'MyPackages',component:MyPackagesComponent,canActivate:[AuthGuardService]},
  {path:'AdvertismetUser/:id',component:AdvertismentUserComponent},
   {path:'',component:HomePageComponentComponent},
   {path:'selectCategory',component:CatBeforeAdComponent,canActivate:[AuthGuardService]},
   {path:'postYourAd/:catID/:SubCatID',component:AdPostComponent,canActivate:[AuthGuardService]},
   {path:'editYourAd/:adID/:SubCatID',component:AdEditComponent,canActivate:[AuthGuardService]},
  //{path:'',component:LandingComponent},
  {path:'authintication',loadChildren:()=>import("../authintication/authintication.module").then(m=>m.AuthinticationModule)},
  {path:'filteration',loadChildren:()=>import("../filteration/filteration.module").then(m=>m.FilterationModule)},
  {path:'admin',loadChildren:()=>import("../admin/admin.module").then(m=>m.AdminModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

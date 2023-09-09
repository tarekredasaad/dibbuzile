import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { ChatComponent } from './chatpage/chat/chat.component';
// import { HomeComponent } from 'src/home-page/home/home.component';
import { CommonModule } from '@angular/common';


import { HomePageComponentComponent } from './home-page-component/home-page-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CatNavBarComponent } from './cat-nav-bar/cat-nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { JwtModule } from '@auth0/angular-jwt';


export function tokenGetter() {
  return localStorage.getItem("jwt");
}
import { FilterationModule } from 'src/filteration/filteration.module';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AdvertismentDetailsComponent } from './advertisment-details/advertisment-details.component';
import { AdvertismentUserComponent } from './advertisment-user/advertisment-user.component';
import { FavoriteComponent } from './favorite/favorite.component';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DelAccountComponent } from './del-account/del-account.component';

/* import { AddAdvComponent } from './add-adv/add-adv.component'; */
import { PackagesComponent } from './packages/packages.component';


import { AdDetailsComponent } from './ad-details/ad-details.component';

//signalr
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { MyAdsComponent } from './my-ads/my-ads.component';
import { CategoriesBeforePackagesComponent } from './categories-before-packages/categories-before-packages.component';
import { MyPackagesComponent } from './my-packages/my-packages.component';
import { CatBeforeAdComponent } from './cat-before-ad/cat-before-ad.component';
import { AdPostComponent } from './ad-post/ad-post.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';

// import { UserprofileComponent } from 'src/profile/userprofile/userprofile.component';




@NgModule({
  declarations: [
    AppComponent,
    DelAccountComponent,
    
    ChatComponent,

    NavBarComponent,
    CatNavBarComponent,
    FooterComponent,
    AdDetailsComponent,
    MyAdsComponent,
    

    AdvertismentDetailsComponent,
    AdvertismentUserComponent,
    FavoriteComponent, 
    DelAccountComponent,
    NavBarComponent,
    CatNavBarComponent,
    FooterComponent,
    HomePageComponentComponent,
    PackagesComponent,
    CategoriesBeforePackagesComponent,
    MyPackagesComponent,
    CatBeforeAdComponent,
    AdPostComponent,
    AdEditComponent
  
  ],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    DropDownListModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
       allowedDomains: ["localhost:7189"],
        disallowedRoutes: []
      }
  }),

    FilterationModule,

  ],
  providers: [MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'icon_name',
      this.domSanitizer.bypassSecurityTrustResourceUrl('path/to/icon.svg')
    );
  }
 }

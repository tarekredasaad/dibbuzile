import { Component } from '@angular/core';
import { AdvertismentServiceService } from '../Services/advertisment-service.service';
import { IAdvertisment } from '../Interfaces/IAdvertisment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent {

  LodedAdvertisments:IAdvertisment[]=[];
  FiltredAdvertisments:IAdvertisment[]=[];

  applicationUserId:any=localStorage.getItem('ApplicationUserId')
  AllAdsCounter:number=0;
  ActivedsCounter:number=0;
  InActivedsCounter:number=0;
  PendingdsCounter:number=0;
  ModerateddsCounter:number=0;

  ChatingUsers:any=[];

  FlagStatus:any="";
  BuyerUserId:any;
  display = '';
  AdInModal:IAdvertisment={
    title: '',
    categoryID: 0,
    subCategoryID: 0,
    adType: '',
    adStatus: '',
    location: '',
    date: '',
    expirationDate: '',
    expireDateOfPremium: '',
    isPremium: false,
    advertisment_FiltrationValuesList: [],
    advertismentImagesList: [],
    isSaved: false,
    applicationUserId: '',
    advertisment_RentOptionsList: []
  };

  constructor(private advertismentUserService :AdvertismentServiceService,private router:Router){}
  
  ngOnInit(): void {

      this.advertismentUserService.getMyAdvertisments(this.applicationUserId).subscribe({
        next:(data:any)=>{
          this.LodedAdvertisments=data.data;
          this.FiltredAdvertisments=this.LodedAdvertisments;
          this.counterAds();
        },
        error: err => {
          console.log(err);
        }
       })
  }

  counterAds()
  {
    this.AllAdsCounter=this.ActivedsCounter=this.InActivedsCounter=this.PendingdsCounter=this.ModerateddsCounter=0;
    this.LodedAdvertisments.forEach((ad:IAdvertisment)=>{
      this.AllAdsCounter++;
      if(ad.adStatus=="Active")
          this.ActivedsCounter++;
      else if (ad.adStatus=="Not Active")
          this.InActivedsCounter++;
      else if (ad.adStatus=="Pending")
          this.PendingdsCounter++;
      else 
          this.ModerateddsCounter++;
    })
  }

  AllAds()
  {
    this.FiltredAdvertisments=this.LodedAdvertisments;
    this.FlagStatus="All";
  }

  ActiveAds()
  {
     this.FiltredAdvertisments = this.LodedAdvertisments.filter((ad:IAdvertisment) =>{
      return ad.adStatus=="Active";
  });
  this.FlagStatus="Active";

  }

  InactiveAds()
  {
    this.FiltredAdvertisments = this.LodedAdvertisments.filter((ad:IAdvertisment) =>{
      return ad.adStatus=="Not Active";
     });
     this.FlagStatus="Not Active";

  }

  PendingAds()
  {
    this.FiltredAdvertisments = this.LodedAdvertisments.filter((ad:IAdvertisment) =>{
      return ad.adStatus=="Pending";
  });
  this.FlagStatus="Pending";

  }

  ModeratedAds()
  {
    this.FiltredAdvertisments = this.LodedAdvertisments.filter((ad:IAdvertisment) =>{
      return ad.adStatus=="Moderated";
  });
  this.FlagStatus="Moderated";
  }


  DeActive(AdID:any)
  {
    this.advertismentUserService.deActivateMyAd(AdID).subscribe({
      next:(data:any)=>{

       let index1= this.LodedAdvertisments.findIndex(Ad => Ad.id == AdID) 
       this.LodedAdvertisments[index1].adStatus="Moderated";
       let index2= this.FiltredAdvertisments.findIndex(Ad => Ad.id == AdID) 
       this.FiltredAdvertisments[index2].adStatus="Moderated";

       if(this.FlagStatus=="All" || this.FlagStatus=="")
       {
          this.AllAds();
       }
       else if(this.FlagStatus=="Active")
       {
          this.ActiveAds()
       }
       else if(this.FlagStatus=="Moderated")
       {
          this.ModeratedAds()
       }
       else if(this.FlagStatus=="Pending")
       {
          this.PendingAds()
       }
       else
       {
          this.InactiveAds();
       }
       this.counterAds()
      },
      error: err => {
        console.log(err);
      }
     })
  }

  Active(AdID:any)
  {
    this.advertismentUserService.ActivateMyAd(AdID).subscribe({
      next:(data:any)=>{
        let index1= this.LodedAdvertisments.findIndex(Ad => Ad.id == AdID) 
        this.LodedAdvertisments[index1].adStatus="Active";
        let index2= this.FiltredAdvertisments.findIndex(Ad => Ad.id == AdID) 
        this.FiltredAdvertisments[index2].adStatus="Active";
 
        if(this.FlagStatus=="All" || this.FlagStatus=="")
        {
           this.AllAds();
        }
        else if(this.FlagStatus=="Active")
        {
           this.ActiveAds()
        }
        else if(this.FlagStatus=="Moderated")
        {
           this.ModeratedAds()
        }
        else if(this.FlagStatus=="Pending")
        {
           this.PendingAds()
        }
        else
        {
           this.InactiveAds();
        }
        this.counterAds()
      },
      error: err => {
        console.log(err);
      }
     })
  }

  openModal(ad:IAdvertisment) {
    this.display = 'block';
    this.AdInModal=ad;
    this.advertismentUserService.GetAdChatUsers(ad.id).subscribe({
      next:(data:any)=>{
        this.ChatingUsers=data.data;
        console.log(this.ChatingUsers)
      },
      error: err => {
        console.log(err);
      }
     })
  }

  onCloseModal() {
    this.display = 'none';
  }

  MarkAsSold(soldBtn:any,UserId:any)
  {
      soldBtn.disabled=false;
      this.BuyerUserId=UserId;
  }

  Sold(AdInModalID:any)
  {
    this.advertismentUserService.RentMyAd(AdInModalID,this.BuyerUserId).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.onCloseModal();
        Swal.fire({
          icon: 'success',
          text: 'Ad Marked as Sold Successfully',
        })
        

        let index1= this.LodedAdvertisments.findIndex(Ad => Ad.id == AdInModalID) 
        this.LodedAdvertisments[index1].adStatus="Not Active";
        let index2= this.FiltredAdvertisments.findIndex(Ad => Ad.id == AdInModalID) 
        this.FiltredAdvertisments[index2].adStatus="Not Active";
 
        if(this.FlagStatus=="All" || this.FlagStatus=="")
        {
           this.AllAds();
        }
        else if(this.FlagStatus=="Active")
        {
           this.ActiveAds()
        }
        else if(this.FlagStatus=="Moderated")
        {
           this.ModeratedAds()
        }
        else if(this.FlagStatus=="Pending")
        {
           this.PendingAds()
        }
        else
        {
           this.InactiveAds();
        }
        this.counterAds()


      },
      error: err => {
        console.log(err);
      }
     })
  }

  Edit(adID:any,subCategoryID:any)
  {
    this.router.navigate(['/editYourAd/',adID,subCategoryID]);
  }

  AdvertismentDetails(adID:any){
    this.router.navigate(["/Details",adID]);
  } 

}

import { Component, OnInit } from '@angular/core';
import { AdvertismentServiceService } from '../Services/advertisment-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewserviceService } from '../Services/reviewservice.service';
import { IReview } from '../Interfaces/Review';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from "@angular/core";
import { IFavourite } from '../Interface/IFavorite';
import { FavoriteService } from '../Services/favorite.service';

@Component({
  selector: 'app-advertisment-details',
  templateUrl: './advertisment-details.component.html',
  styleUrls: ['./advertisment-details.component.scss']
})

export class AdvertismentDetailsComponent implements OnInit {
  advertismentId: any
  filtredReviewList: IReview[] = []
  private hubConnectionBuilder!: HubConnection
  appUserId: any;
  username: any
  editIndex: any;
  reviewId: any;
  advertismentDetail: any = {};
  FirstChar: string = "";
  reviewAdded!: IReview
  Favorite: IFavourite = new IFavourite("", 0);
  errorMessage: string = ""
  numRate=[1,2,3,4,5];
  selectedRadio:any;
    constructor(private favoriteService: FavoriteService, private fb: FormBuilder, private reviewService: ReviewserviceService, private advertismentService: AdvertismentServiceService, private activeRoute: ActivatedRoute, private router: Router) { }

  ReviewForm: any = this.fb.group({
    id: [0],
    text: [''],
    rate: [''],
    userName: [localStorage.getItem("UserName")],
    autherId: [localStorage.getItem("ApplicationUserId")],
    advertismentID: [this.activeRoute.snapshot.paramMap.get("id")],
  })

  get text() {
    return this.ReviewForm.get('text');
  }
  get rate() {
    return this.ReviewForm.get('rate');
  }
  get userName() {
    return this.ReviewForm.get('userName');
  }
  get autherId() {
    return this.ReviewForm.get('autherId');
  }
  get advertismentID() {
    return parseInt(this.ReviewForm.get('advertismentID'));
  }

  async ngOnInit() {

    this.appUserId = localStorage.getItem("ApplicationUserId");
    this.advertismentId = this.activeRoute.snapshot.paramMap.get("id");
    this.username = localStorage.getItem("UserName");

    // this.reviewAdded = {
    //   text: "", advertismentID: this.advertismentId, rate: 0,
    //    autherId: this.appUserId, userName: this.username, id: this.reviewId
    // }
    this.advertismentService.getDetails(this.advertismentId, this.appUserId).subscribe({
      next: data => {
        this.advertismentDetail = data;
        this.FirstChar = data.applicationUserName.charAt(0)
        this.filtredReviewList=this.advertismentDetail.reviewsList;

        console.log(this.advertismentDetail)
      },
      error: err => {
        console.log(err);
      }

    })

    this.hubConnectionBuilder = new signalR.HubConnectionBuilder().withUrl('http://localhost:7189/Review',
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).configureLogging(signalR.LogLevel.Debug).build();

    await setTimeout(() => {
      this.hubConnectionBuilder.start().then(() => {
        console.log("connection started");
      }).catch(err => console.log(err));
    }, 2000);


    await setTimeout(async () => {
      console.log(this.ReviewForm.value)
      console.log("after invoke")
      await this.hubConnectionBuilder.on('NewReviewNotify', (rev) => {
        console.log(rev)
        this.advertismentDetail.reviewsList.push(rev);
       
        this.selectedRadio= document.querySelector('input[name=rad]:checked');
        if(this.selectedRadio.value==-1)
        {
              this.filtredReviewList=this.advertismentDetail.reviewsList
        }
        else if(this.selectedRadio.value>=0&&this.selectedRadio.value<=5)
        {
          this.filtredReviewList=this.advertismentDetail.reviewsList.filter((r:any)=>{
            return r.rate==this.selectedRadio.value
          })
        }

      });
    }, 2000)

await setTimeout(async () => {
    this.hubConnectionBuilder.on('RemoveReviewNotify', (i) => {
      console.log("after invoke")
      console.log(i)
      this.advertismentDetail.reviewsList.splice(i, 1);
      this.selectedRadio= document.querySelector('input[name=rad]:checked');
      if(this.selectedRadio.value==-1)
      {
            this.filtredReviewList=this.advertismentDetail.reviewsList
      }
      else if(this.selectedRadio.value>=0&&this.selectedRadio.value<=5)
      {
        this.filtredReviewList=this.advertismentDetail.reviewsList.filter((r:any)=>{
          return r.rate==this.selectedRadio.value
        })
        console.log(this.selectedRadio.value)
        console.log(this.filtredReviewList)
      }

    })
  }, 2000)

    await setTimeout(async () => {
      console.log(this.ReviewForm.value)
      console.log("after invoke")
      await this.hubConnectionBuilder.on('EditReviewNotify', (i,rev) => {
        console.log(rev)
        console.log(i)
        this.advertismentDetail.reviewsList[i] = rev;

        this.selectedRadio= document.querySelector('input[name=rad]:checked');
        if(this.selectedRadio.value==-1)
        {
              this.filtredReviewList=this.advertismentDetail.reviewsList
        }
        else if(this.selectedRadio.value>=0&&this.selectedRadio.value<=5)
        {
          this.filtredReviewList=this.advertismentDetail.reviewsList.filter((r:any)=>{
            return r.rate==this.selectedRadio.value
          })
        }

      });


    }, 2000)



   


  }

  AdvertismentUser(advertismentDetail: any) {
    this.router.navigate(["/AdvertismetUser", advertismentDetail.applicationUserId])
  }


  async sendReview() {
    this.reviewService.AddReview(this.ReviewForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.hubConnectionBuilder.invoke('NewReview', data);    
      },
      error: error => console.log(error),
    });

    this.ReviewForm.patchValue({
      id: 0,
      text: '',
      rate: ''
    })

  }

  delreview(rl: any, i: any) {
    this.reviewId = rl.id

    this.reviewService.DeleteReview(this.reviewId).subscribe({
      next: data => {
        console.log(data);
        this.hubConnectionBuilder.invoke('RemoveReview', i)
        //this.advertismentDetail.reviewsList.splice(i,1);
      },
      error: error => console.log(error),
    })


  }

  editreview(id: any, i: any, TextInput: any, RateInput: any, SaveBtn: any) {
    TextInput.disabled = RateInput.readonly = false;
    SaveBtn.hidden = false;
    this.editIndex = i;
    this.reviewId = id;
  }

  async SaveEdit(TextInput: any, RateInput: any, SaveBtn: any) {
    this.ReviewForm.patchValue({
      id: this.reviewId,
      text: TextInput.value,
      rate: RateInput.rate
    })
    this.reviewService.EditReview(this.ReviewForm.value).subscribe({
      next: data => {
        console.log(data);
        this.hubConnectionBuilder.invoke('EditReview', this.editIndex,data);
      },
      error: error => console.log(error),
    });

    this.ReviewForm.patchValue({
      id: 0,
      text: '',
      rate: ''
    })

    TextInput.disabled = RateInput.readonly = true;
    SaveBtn.hidden = true;

  }
 




  filterReviews(star:any)
  {
    if(star!=-1)
    {
      this.filtredReviewList=this.advertismentDetail.reviewsList.filter((r:any)=>{
          return r.rate==star;
      })
    }
    else
    {
      this.filtredReviewList=this.advertismentDetail.reviewsList;
    }
  }


  async AddToFavorite(ads:any){
    var heart=document.getElementById("heart");
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



//   BeginChat(applicationUserId:string)
// {
//   console.log(applicationUserId)
  BeginChat(advertismentDetail:any)
{
  console.log(advertismentDetail.id,advertismentDetail.applicationUserId)
  console.log(this.appUserId)
  this.router.navigate(['/chat/',advertismentDetail.id,advertismentDetail.applicationUserId])
}



  counter(i: number) {
    return new Array(i);
}



}
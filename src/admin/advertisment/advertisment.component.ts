import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdvertismentService } from '../Services/advertisment.service';

@Component({
  selector: 'app-advertisment',
  templateUrl: './advertisment.component.html',
  styleUrls: ['./advertisment.component.scss']
})
export class AdvertismentComponent {

    AdvertismntList: any = [];
    messageError = '';
  
    constructor(private advertismentService: AdvertismentService, private fb: FormBuilder) { }
  
  
  
  
    ngOnInit() {
      this.advertismentService.getallNotActiveAds().subscribe({
        next: (data: any) => {
          if (data.statusCode == 200) {
            console.log(data);
            this.AdvertismntList = data.data;
          }
          else {
            this.messageError = data.message;
          }
  
        },
        error: err => {
          console.log(err);
        }
      });
  
    }
  

    Accept(AdID:any,index :any)
    {
      this.advertismentService.EditNotActiveAd(AdID).subscribe({
        next: (data: any) => {
          if (data.statusCode == 200) {
            console.log(data);
            this.AdvertismntList.splice(index,1);
          }
          else {
            this.messageError = data.message;
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }
  
  
  }


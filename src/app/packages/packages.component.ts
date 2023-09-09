import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PackageServiceService } from '../Services/package-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent {

constructor(private activatRoute:ActivatedRoute,private packageService:PackageServiceService){}

Packages:any=[];
subCategoryID:any;
ApplicationUserId:any=localStorage.getItem('ApplicationUserId');

ngOnInit() {
  this.activatRoute.paramMap.subscribe((params:ParamMap)=>{
    this.subCategoryID= params.get('id');
  })

  this.packageService.getPackages(this.subCategoryID).subscribe({
    next: (data:any) => {
    console.log(data);
    this.Packages=data.data;
    },
    error: err => {
      console.log(err);
    }
  }); 

  }

  Pay(Package:any)
  {
    let PackageAppUser={applicationUserId:this.ApplicationUserId,packageID:Package.id,numOfRemainAds:Package.numOfAds}
    this.packageService.Pay(PackageAppUser).subscribe({
      next: (data:any) => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        text: data.data,
      })
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          text: err,
        })
      }
    }); 
  }

}

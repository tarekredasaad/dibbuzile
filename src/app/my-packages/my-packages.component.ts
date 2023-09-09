import { Component } from '@angular/core';
import { PackageServiceService } from '../Services/package-service.service';

@Component({
  selector: 'app-my-packages',
  templateUrl: './my-packages.component.html',
  styleUrls: ['./my-packages.component.scss']
})
export class MyPackagesComponent {

  LodedPackages:any[]=[];
  FiltredPackages:any[]=[];

  applicationUserId:any=localStorage.getItem('ApplicationUserId')
  AllPackagesCounter:number=0;
  ActivePackagesCounter:number=0;
  ExpiredPackagesCounter:number=0;
  

  constructor(private packageService :PackageServiceService){}
  
  ngOnInit(): void {

      this.packageService.getPackagesOfLoggedUser(this.applicationUserId).subscribe({
        next:(data:any)=>{
          this.LodedPackages=data.data;
          this.FiltredPackages=this.LodedPackages;
         this.counterPackages();
        },
        error: err => {
          console.log(err);
        }
       })
  }

  counterPackages()
  {
    this.LodedPackages.forEach((Package:any)=>{
      this.AllPackagesCounter++;
      if(Package.status=="Active")
          this.ActivePackagesCounter++;
      else 
          this.ExpiredPackagesCounter++;
    })
  }

  AllPackages()
  {
    this.FiltredPackages=this.LodedPackages;
  }

  ActivePackages()
  {
     this.FiltredPackages = this.LodedPackages.filter((Package:any) =>{
      return Package.status=="Active";
  });

  }

  ExpiredPackages()
  {
    this.FiltredPackages = this.LodedPackages.filter((Package:any) =>{
      return Package.status=="Expired";
  });
  }



}

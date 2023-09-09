import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {  IAdvertisment } from 'src/app/Interfaces/IAdvertisment';
import { AdvertismentServiceService } from 'src/app/Services/advertisment-service.service';
import { FilterValueKey } from './../../../app/Interfaces/IAdvertisment';
import { IFavourite } from 'src/app/Interface/IFavorite';
import { FavoriteService } from 'src/app/Services/favorite.service';

@Component({
  selector: 'app-addvertis-side',
  templateUrl: './addvertis-side.component.html',
  styleUrls: ['./addvertis-side.component.scss']
})

export class AddvertisSideComponent {

  
Advertisments:IAdvertisment[]=[];
Loaded_dedaddvertisment:IAdvertisment[]=[];
filterationKeyArray:FilterValueKey[]=[];
cat_locationFilterationArry :any[]=[];
userId:any=localStorage.getItem('ApplicationUserId');
Favorite:IFavourite=new IFavourite("",0);
errorMessage:string=""
appUserId:any;

constructor(private activatRoute:ActivatedRoute,private advertismentService:AdvertismentServiceService,private router:Router,private favoriteService:FavoriteService)
{
  activatRoute.paramMap.subscribe((params:ParamMap)=>{
    console.log(params.get('id'))
    if(params.get('type')=='category')
    {
      console.log(true)
      this.advertismentService.getAdsByCategoryID(params.get('id'),this.userId).subscribe({
        next: (data:any) => {
          this.Loaded_dedaddvertisment=data.data;
          this.Advertisments=this.Loaded_dedaddvertisment;

        console.log(data);
        },
        error: err => {
          console.log(err);
        }
      }); 
    }
    else if(params.get('type')=='subcategory')
    {
      this.advertismentService.getAdsBySubCategoryID(params.get('id'),this.userId).subscribe({
        next: (data:any) => {
          this.Loaded_dedaddvertisment=data.data;
          this.Advertisments=this.Loaded_dedaddvertisment;
        console.log(data);
        },
        error: err => {
          console.log(err);
        }
      }); 
      console.log(false)
    }
    else
    {
      console.log(params.get('type'))
      this.advertismentService.getAdvertismentByQuery(params.get('type'),this.userId).subscribe({
        next: (data:any) => {
          this.Loaded_dedaddvertisment=data.data;
          this.Advertisments=this.Loaded_dedaddvertisment;
        console.log(data);
        },
        error: err => {
          console.log(err);
        }
      }); 
      console.log(false)
    }


  })
}

filtertonarrayHave(filterValue:FilterValueKey):boolean
{  var Match=false;
   this.filterationKeyArray.forEach(item =>{
    if(item.id==filterValue.id && item.filtervalue==filterValue.filtervalue)
    {
      Match=true;
    }
  });
 
  return Match;
}
 

handleDataChange(filterValue:FilterValueKey)
{  
  console.log(filterValue );
  if (this.filtertonarrayHave(filterValue)  )
  {
    console.log(this.filterationKeyArray=this.filterationKeyArray.filter(e=>e.filtervalue!=filterValue.filtervalue));
  }
  else
  {
    this.filterationKeyArray.push(filterValue);
    console.log(this.filterationKeyArray);
    console.log("fromPUsh");
  }
  this.Advertisments=[];
  this.Advertisments=this.filterByCat_locatiomFilterationArray(this.makefilterationByCheckbox(this.filterationKeyArray,this.Loaded_dedaddvertisment),this.cat_locationFilterationArry);
}
handelChanOfCategory(newdata:String)
{
  this.cat_locationFilterationArry[0]=newdata;
  this.Advertisments=[];
  this.Advertisments=this.filterByCat_locatiomFilterationArray(this.makefilterationByCheckbox(this.filterationKeyArray,this.Loaded_dedaddvertisment),this.cat_locationFilterationArry);
  // this.Advertisments=this.filterByCat_locatiomFilterationArray(this.Loaded_dedaddvertisment,this.cat_locationFilterationArry);
}
handelChanOflocation(newdata:String)
{   console.log(newdata);
    this.cat_locationFilterationArry[1]=newdata;
    this.Advertisments=[];
    this.Advertisments=this.filterByCat_locatiomFilterationArray(this.makefilterationByCheckbox(this.filterationKeyArray,this.Loaded_dedaddvertisment),this.cat_locationFilterationArry);
    //this.Advertisments=this.filterByCat_locatiomFilterationArray(this.Loaded_dedaddvertisment,this.cat_locationFilterationArry);
}
filterByCat_locatiomFilterationArray(advertisment:IAdvertisment[],cat_LocFilterArry:String[]):IAdvertisment[]
{
  if(cat_LocFilterArry.length==0)
  { console.log("1#");
    return advertisment;
  }
  else if (cat_LocFilterArry.length==1 && cat_LocFilterArry[0]!=null)
  { 
    console.log("2#");
    if(Number(cat_LocFilterArry[0])==0)
    return  advertisment;
    else
    return  advertisment.filter(item =>item.subCategoryID==Number(cat_LocFilterArry[0]) );

  }
  else if (cat_LocFilterArry.length==1 && cat_LocFilterArry[1]!=null)
  {
    console.log("3#");
    return advertisment.filter(item =>item.location==cat_LocFilterArry[1] );
  }
  else if (cat_LocFilterArry.length==2 && cat_LocFilterArry[0]=="0" && cat_LocFilterArry[1]!=null && cat_LocFilterArry[1]!="all")
  {
    console.log("3#2");
    return advertisment.filter(item =>item.location==cat_LocFilterArry[1] );
  }
  else if (cat_LocFilterArry.length==2 && cat_LocFilterArry[1]=="all" && cat_LocFilterArry[0]!=null && cat_LocFilterArry[0]!="0")
  {
    console.log("3#3");
    return advertisment.filter(item =>item.subCategoryID==Number(cat_LocFilterArry[0]));
  }
  else if(cat_LocFilterArry.length==2 &&cat_LocFilterArry[1]!="all"&& cat_LocFilterArry[0]!="0")
  {
    console.log("4#");
    return advertisment.filter(item =>item.subCategoryID==Number(cat_LocFilterArry[0]) &&item.location==cat_LocFilterArry[1] );
  }
  return advertisment;
}
makefilterationByCheckbox( filterationKeyArray: FilterValueKey[],advertismentArray: IAdvertisment[]): IAdvertisment[]
{
  if(filterationKeyArray.length>0)
  {
     
    const countofUniqFilteration = new Set(filterationKeyArray.map(obj => obj.id)).size;
    console.log(countofUniqFilteration)
     
     let tempadvertismentArray:IAdvertisment[]=[];
     advertismentArray.forEach(item => 
      {
        var countOfMatching=0;
        filterationKeyArray.forEach(e=>
        {             
         console.log(filterationKeyArray);
         console.log(item.advertisment_FiltrationValuesList);

         console.log(item.advertisment_FiltrationValuesList.find( x=>x.id==e.id && x.filtervalue==e.filtervalue))
         if(item.advertisment_FiltrationValuesList.find( x=>x.id==e.id && x.filtervalue==e.filtervalue))
         { countOfMatching++; }
        });
          console.log('countOfMatching :', countOfMatching);
          console.log('countofUniqFilteration :', countofUniqFilteration)
          
        if (countOfMatching>=countofUniqFilteration && countOfMatching<=filterationKeyArray.length )
          { console.log( "Filter");
            tempadvertismentArray.push(item);
          }
      });
     return   tempadvertismentArray;
  }
  else
  {
    return advertismentArray;
  }



}
async AddToFavorite(ads:any){
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
}
}

AdvertismentDetails(a:any){
  this.router.navigate(["/Details",a.id]);
} 

BeginChat(advertismentDetail:any)
{
  console.log(advertismentDetail.id,advertismentDetail.applicationUserId)
  this.appUserId = localStorage.getItem("ApplicationUserId");
  console.log(this.appUserId)
  this.router.navigate(["/chat",advertismentDetail.id,advertismentDetail.applicationUserId])
}


//#region dddddddd
// {

//   if(this.filterationKeyArray.length > 0)
//   {
//     let addvertisment:IAdvertisment[] =[];
//     advertismentArray.forEach(item =>
//       {
//         let for2Condition=false;
//         item.advertisment_FiltrationValuesList.forEach(Advertes_filterationItem=>
//           {
//               let forCondition=false;
//               filterationKeyArray.forEach(filterationcondiotn =>
//                 {
//                   console.log(filterationcondiotn);
//                   if(Advertes_filterationItem==filterationcondiotn)     
//                   {
//                     forCondition=true;
//                     console.log(filterationcondiotn);
//                   }
//                 });
//               if (forCondition){ for2Condition=true;}
          
//           });
//           if (for2Condition)
//           {
//             addvertisment.push(item);
//           }

//       });
//       return addvertisment;
//   }
//   else
//   {
//     return advertismentArray;
//   }
// }
//#endregion
}

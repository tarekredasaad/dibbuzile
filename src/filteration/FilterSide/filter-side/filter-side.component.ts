import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ICategory } from 'src/app/Interfaces/ICategory';
import { ISubCategoryFilter } from 'src/app/Interfaces/ISubCategoryFilter';
import { FiltrationServiceService } from 'src/app/Services/filtration-service.service';
import { CategoryServiceService } from '../../../app/Services/category-service.service';
import { FilterValueKey } from 'src/app/Interfaces/IAdvertisment';


@Component({
  selector: 'app-filter-side',
  templateUrl: './filter-side.component.html',
  styleUrls: ['./filter-side.component.scss']
})
export class FilterSideComponent {
  categorySelectedValue: String="";
  LocationSelectedValue: String="";
  SubCategoryFilters:ISubCategoryFilter[]=[];
  @Output() dataChanged = new EventEmitter<FilterValueKey>();
  @Output() filterByCategory = new EventEmitter<String>();
  @Output() filterBylocation = new EventEmitter<String>();
  flag:boolean=true;
  locationList:String[]=["Cairo","Asuuit","Sohag","Alex"];
  categoryList:ICategory[]=[];
  makefilter(newData: string,id:number)
  {
    this.dataChanged.emit(new FilterValueKey(id,newData));
  }
  changeCategoryFiltertion() 
  {
    this.filterByCategory.emit(this.categorySelectedValue);
  }
  changelocationFiltertion() 
  {
    console.log("changed"+this.LocationSelectedValue);
    this.filterBylocation.emit(this.LocationSelectedValue);
  }


  constructor(private activatRoute:ActivatedRoute,private filterSrvice:FiltrationServiceService,private _CategoryServiceService:CategoryServiceService)
  {
      activatRoute.paramMap.subscribe((params:ParamMap)=>{
          if(params.get('type')!='category')
          {
            this.flag=false;
            console.log(true)
            this.filterSrvice.getSubCategoryFilters(params.get('id')).subscribe({
              next: (data:any) => {
                this.SubCategoryFilters=data.data;
                console.log("done 2");
                console.log(this.SubCategoryFilters);
                this._CategoryServiceService.getAllofsubCategories(params.get('id')).subscribe({
                  next: (data:any) => {
                    console.log("data arrived correctly"+data);
                    this.categoryList=data.data;
                  },
                  error: (err:any) =>{
                    console.log(err);
                  }
                })
              },
              error: (err:any) => {
                console.log(err);
              }
            }); 
          }
         else if(params.get('type')=='category')
          {
            this.flag=true;
                this._CategoryServiceService.getAllofsubCategories(params.get('id')).subscribe({
                  next: (data:any) => {
                    this.SubCategoryFilters=[];
                    console.log("data arrived correctly"+data);
                    this.categoryList=data.data;
                  },
                  error: (err:any) =>{
                    console.log(err);
                  }
                })
          }
          else 
          this.flag=true;
      });
     
  }
}

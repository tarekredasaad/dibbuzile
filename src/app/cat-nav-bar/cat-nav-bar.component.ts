import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from '../Services/category-service.service';
import { Router } from '@angular/router';
import { ICategory } from '../Interfaces/ICategory';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-cat-nav-bar',
  templateUrl: './cat-nav-bar.component.html',
  styleUrls: ['./cat-nav-bar.component.scss']
})

export class CatNavBarComponent implements OnInit {

  categories:ICategory[]=[]
  halfCategories1:ICategory[]=[];
  halfCategories2:ICategory[]=[]

  constructor(private categoryService:CategoryServiceService ,private router: Router) { }

  

  ngOnInit() {
  this.categoryService.getCategories().subscribe({
    next: (data:any) => {
    console.log(data);
    this.categories=data.data;
    this.categories.forEach((element:any,index:any)=>{
      if(index<6)
           this.halfCategories1.push(element);
      else
          this.halfCategories2.push(element);
    })
    console.log(this.halfCategories2)
   //this.router.navigate(["/resturant/profile"]);
    },
    error: err => {
      console.log(err);
    }
  }); 

  }

}

import { Component } from '@angular/core';
import { CategoryServiceService } from '../Services/category-service.service';
import { Router } from '@angular/router';
import { ICategory, ISubCategory } from '../Interfaces/ICategory';

@Component({
  selector: 'app-categories-before-packages',
  templateUrl: './categories-before-packages.component.html',
  styleUrls: ['./categories-before-packages.component.scss']
})
export class CategoriesBeforePackagesComponent {

  categories:ICategory[]=[]
  subCategories:ISubCategory[]=[]


  constructor(private categoryService:CategoryServiceService ,private router: Router) { }

  

  ngOnInit() {

  this.categoryService.getCategories().subscribe({
    next: (data:any) => {
    console.log(data);
    this.categories=data.data;
    },
    error: err => {
      console.log(err);
    }
  }); 
  
  }



  getSubCategories(categoryID:any)
  {
    let newArray:any = this.categories.filter( (category:any) =>{
      return category.id==categoryID;
  }
  );
  this.subCategories=newArray[0].subCategoriesList;
  }


  GoToPackage(sybCategoryID:any)
  {
      this.router.navigate(['/package/',sybCategoryID]);
  }

}

import { Component } from '@angular/core';
import { CategoryServiceService } from '../Services/category-service.service';
import { Router } from '@angular/router';
import { ICategory, ISubCategory } from '../Interfaces/ICategory';

@Component({
  selector: 'app-cat-before-ad',
  templateUrl: './cat-before-ad.component.html',
  styleUrls: ['./cat-before-ad.component.scss']
})
export class CatBeforeAdComponent {
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


  GoToPackage(CategorySelect:any,sybCategoryID:any)
  {
      this.router.navigate(['/postYourAd/',CategorySelect,sybCategoryID]);
  }
}

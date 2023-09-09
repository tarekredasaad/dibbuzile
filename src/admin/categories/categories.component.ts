import { Component } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DisplayService } from 'src/app/Services/display.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  display = '';
  displayEditModel = '';
  CategoryList: any = [];
  ParentCategoryList: any = [];
  messageError = '';
  EditIndex: any;

  constructor(private categoryService: CategoryService, private fb: FormBuilder,private displayService: DisplayService) { }




  ngOnInit() {
    this.displayService.setNavigationVisibility(false);
    this.categoryService.getallCategories().subscribe({
      next: (data: any) => {
        if (data.statusCode == 200) {
          console.log(data);
          this.CategoryList = data.data;
          this.CategoryList.forEach((category: any) => {
            if (category.parentCategory == null)
              this.ParentCategoryList.push(category)
          });
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

  ngOnDestroy(): void {
    this.displayService.setNavigationVisibility(true);
  }
  
  openCategoryModal() {
    this.display = 'block';
    if (this.parentCategoryID?.value == null) {
      console.log(this.parentCategoryID?.value)
      let counter = 0;
      this.ParentCategoryList.forEach((category: any) => {
        if (this.id?.value == category.id)
            {
              this.ParentCategoryList.splice(counter, 1)
            }
        counter++;
      });
    }

  }

  onCloseCategoryHandled() {
    this.display = 'none';
    this.ParentCategoryList=[];
    this.CategoryList.forEach((category: any) => {
      if (category.parentCategory == null)
        this.ParentCategoryList.push(category)
    });
  }


  AddForm = this.fb.group({
    id: [1, [Validators.required]],
    name: ['', [Validators.required]],
    parentCategoryID: [null, [Validators.required]],
  })

  get id() {
    return this.AddForm.get('id');
  }


  get name() {
    return this.AddForm.get('name');
  }

  get parentCategoryID() {
    return this.AddForm.get('parentCategoryID');
  }


  AddCategory() {
    if (this.name?.valid) {
      console.log(this.AddForm.value)
      this.categoryService.AddCategory(this.AddForm.value).subscribe({
        next: (data: any) => {
          if (data.statusCode == 200) {
            console.log(data);
            this.CategoryList.push(data.data);
            if (this.parentCategoryID?.value == null)
            {
              this.ParentCategoryList.push(data.data);
            }
            this.onCloseCategoryHandled();
            //   this.AddForm.patchValue({
            //   id:null,
            //   name:'',
            //   parentCategoryID:null

            //  })
          }
          else {
            this.messageError = data.data.ModelStateErrors.errors;
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }

  }





  openCategoryEditModal(category: any, index: any) {
    this.displayEditModel = 'block';
    this.AddForm.patchValue({
      id: category.id,
      name: category.name,
      parentCategoryID: category.parentCategoryID
    })
 
    if (this.parentCategoryID?.value == null) {
      console.log(this.parentCategoryID?.value)
      let counter = 0;
      this.ParentCategoryList.forEach((category: any) => {
        if (this.id?.value == category.id)
            {
              this.ParentCategoryList.splice(counter, 1)
            }
        counter++;
      });
    }
    this.EditIndex = index;

  }

  onCloseCategoryEditModal() {
    this.displayEditModel = 'none';
    this.ParentCategoryList=[];
    this.CategoryList.forEach((category: any) => {
      if (category.parentCategory == null)
        this.ParentCategoryList.push(category)
    });
    // this.AddForm.patchValue({
    //   userName:'ITI',

    //   }
    // })
  }

  EditCategory() {
    if (this.name?.valid) {
      this.categoryService.EditCategory(this.AddForm.value).subscribe({
        next: (data: any) => {
          if (data.statusCode == 200) {
              this.CategoryList[this.EditIndex] = data.data;
              this.onCloseCategoryEditModal();
              if(data.message!=null)
              {
                Swal.fire({
                  icon: 'info',
                  title: 'Notice',
                  text: data.message
                })
              }
              if (this.parentCategoryID?.value != null) {
                let counter = 0;
                this.ParentCategoryList.forEach((category: any) => {
                  if (this.id?.value == category.id)
                    this.ParentCategoryList.splice(counter, 1)
                  counter++;
                });
              }
          }
          else {
            console.log(data.message);
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }

  }


  Delete(categoryID: number, index: any) {
    this.categoryService.DeleteCategory(categoryID).subscribe({
      next: (data: any) => {
        if (data.statusCode == 200) {
         
            if(data.message!=null)
              {
                Swal.fire({
                  icon: 'info',
                  title: 'Notice',
                  text: data.message
                })
              }
              else
              {
                this.CategoryList.splice(index, 1);
              
              }
              let counter = 0;
              this.ParentCategoryList.forEach((category: any) => {
                if (category.id == categoryID)
                  this.ParentCategoryList.splice(counter, 1)
                counter++;
              });
        }
        else {
          console.log(data.message);
        }
      },
      error: err => {
        console.log(err);
      }
    });

  }


}

import { Component } from '@angular/core';
import { SubcatgoryFiltersService } from '../Services/subcatgory-filters.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DisplayService } from 'src/app/Services/display.service';

@Component({
  selector: 'app-subcategory-filters',
  templateUrl: './subcategory-filters.component.html',
  styleUrls: ['./subcategory-filters.component.scss']
})
export class SubcategoryFiltersComponent {
  display = '';
  displayEditModel = '';
  SubCatFilterList: any = [];
  SubCatList: any = [];
  FilterList: any = [];
  messageError = '';
  EditIndex: any;

  constructor(private subCategoryFilterService: SubcatgoryFiltersService, private fb: FormBuilder,private displayService: DisplayService) { }




  ngOnInit() {
    this.displayService.setNavigationVisibility(false);

    this.subCategoryFilterService.getallSubCatFilters().subscribe({
      next: (data: any) => {
        if (data.statusCode == 200) {
          console.log(data);
          this.SubCatFilterList = data.data.subCatFilterDTOs;
          this.SubCatList = data.data.subCategoryList
          console.log(this.SubCatList)
          this.FilterList = data.data.filterList
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
  
  openSubCatFilterModal() {
    this.display = 'block';

  }

  onCloseSubCatFilterHandled() {
    this.display = 'none';
  }


  AddForm = this.fb.group({
    id: [1, [Validators.required]],
    filterID: [null, [Validators.required]],
    subCatID: [null, [Validators.required]]
  })

  get id() {
    return this.AddForm.get('id');
  }
  get filterID() {
    return this.AddForm.get('filterID');
  }

  get subCatID() {
    return this.AddForm.get('subCatID');
  }


  AddSubCatFilter() {
    if (this.AddForm?.valid) {
      console.log(this.AddForm.value)
      this.subCategoryFilterService.AddSubCatFilter(this.AddForm.value).subscribe({
        next: (data: any) => {
          if (data.statusCode == 200) {
            console.log(data);
            this.SubCatFilterList.push(data.data);
            this.onCloseSubCatFilterHandled();
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





  openSubCatFilterEditModal(SubCatFilter: any, index: any) {

    this.displayEditModel = 'block';
    this.AddForm.patchValue({
      id: SubCatFilter.id,
      filterID: SubCatFilter.filterID,
      subCatID: SubCatFilter.subCatID
    })
    this.EditIndex = index;
  }

  onCloseSubCatFilterEditModal() {
    this.displayEditModel = 'none';
  }


  EditSubCatFilter() {
    if (this.AddForm.valid) {
      this.subCategoryFilterService.EditSubCatFilter(this.AddForm.value).subscribe({
        next: (data: any) => {
          if (data.statusCode == 200) {
            this.onCloseSubCatFilterEditModal();
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
                this.SubCatFilterList[this.EditIndex] = data.data;
              }
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


  Delete(SubCatfilterID: number, index: any) {
    console.log(index)
    this.subCategoryFilterService.DeleteSubCatFilter(SubCatfilterID).subscribe({
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
            this.SubCatFilterList.splice(index, 1);
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

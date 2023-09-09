import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FilterValueService } from '../Services/filter-value.service';
import Swal from 'sweetalert2';
import { DisplayService } from 'src/app/Services/display.service';

@Component({
  selector: 'app-filter-values',
  templateUrl: './filter-values.component.html',
  styleUrls: ['./filter-values.component.scss']
})
export class FilterValuesComponent {

    display = '';
    displayEditModel = '';
    FilterValuesList:any=[];
    SubCategoryFilterList: any = [];
    messageError = '';
    EditIndex: any;
  
    constructor(private filterValueService: FilterValueService, private fb: FormBuilder,private displayService: DisplayService) { }
  
  
    ngOnInit() {
      this.displayService.setNavigationVisibility(false);

      this.filterValueService.getallFilterValues().subscribe({
        next: (data: any) => {
          if (data.statusCode == 200) {
            console.log(data);
            this.FilterValuesList = data.data.filterValueDTOs;
           this.SubCategoryFilterList=data.data.subCategoriesFilters;
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
    
    openFilterValueModal() {
      this.display = 'block';
    }
  
    onCloseFilterValueHandled() {
      this.display = 'none';
    }
  
  
    AddForm = this.fb.group({
      id: [1, [Validators.required]],
      value: ['', [Validators.required]],
      subCategory_FilterID: ['', [Validators.required]],
    })
  
    get id() {
      return this.AddForm.get('id');
    }
  
  
    get value() {
      return this.AddForm.get('value');
    }
  
    get subCategory_FilterID() {
      return this.AddForm.get('subCategory_FilterID');
    }
  
  
    AddFilterValue() {
      if (this.AddForm?.valid) {
        console.log(this.AddForm.value)
        this.filterValueService.AddFilterValue(this.AddForm.value).subscribe({
          next: (data: any) => {
            if (data.statusCode == 200) {
              console.log(data);
              this.FilterValuesList.push(data.data);
              this.onCloseFilterValueHandled();
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
  
  
  
  
  
    openFilterValueEditModal(filterValue: any, index: any) {
      this.displayEditModel = 'block';
      this.AddForm.patchValue({
        id: filterValue.id,
        value: filterValue.value,
        subCategory_FilterID: filterValue.subCategory_FilterID
      })
      this.EditIndex = index;
    }
  
    onCloseFilterValueEditModal() {
      this.displayEditModel = 'none';
    }
  
    EditFilterValue() {
      if (this.AddForm?.valid) {
        this.filterValueService.EditFilterValue(this.AddForm.value).subscribe({
          next: (data: any) => {
            if (data.statusCode == 200) {
              this.FilterValuesList[this.EditIndex] = data.data;
              this.onCloseFilterValueEditModal();
              if(data.message!=null)
              {
                Swal.fire({
                  icon: 'info',
                  title: 'Notice',
                  text: data.message
                })
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
  
  
    Delete(filterValueID: number, index: any) {
      this.filterValueService.DeleteFilterValue(filterValueID).subscribe({
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
              this.FilterValuesList.splice(index, 1);
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

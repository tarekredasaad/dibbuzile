import { Component } from '@angular/core';
import { PackageService } from '../Services/package.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DisplayService } from 'src/app/Services/display.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent {

    display = '';
    displayEditModel = '';
    PackageList: any = [];
    SubCatList: any = [];
    messageError = '';
    EditIndex: any;
  
    constructor(private packageService: PackageService, private fb: FormBuilder,private displayService: DisplayService) { }
  
    ngOnInit() {
      this.displayService.setNavigationVisibility(false);

      this.packageService.getallPackages().subscribe({
        next: (data: any) => {
          if (data.statusCode == 200) {
            console.log(data);
            this.PackageList = data.data.packageDTOs;
            this.SubCatList = data.data.subCategoryList
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
    
    openPackageModal() {
      this.display = 'block';
    }
  
    onClosePackageHandled() {
      this.display = 'none';
    }
  
  
    AddForm = this.fb.group({
      id: [1, [Validators.required]],
      name: ['', [Validators.required]],
      numOfAds: ['', [Validators.required]],
      numOfPremiumDays: ['', [Validators.required]],
      adDuration: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      subCategoryID: ['', [Validators.required]],
    })
  

    get name() {
      return this.AddForm.get('name');
    }
    get numOfAds() {
      return this.AddForm.get('numOfAds');
    }
    get numOfPremiumDays() {
      return this.AddForm.get('numOfPremiumDays');
    }
    get adDuration() {
      return this.AddForm.get('adDuration');
    }
    get cost() {
      return this.AddForm.get('cost');
    }
    get subCategoryID() {
      return this.AddForm.get('subCategoryID');
    }
  

    AddPackage() {
      if (this.AddForm?.valid) {
        this.packageService.AddPackage(this.AddForm.value).subscribe({
          next: (data: any) => {
            if (data.statusCode == 200) {
              this.PackageList.push(data.data);
              this.onClosePackageHandled();
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
  
  
  
  
  
    openPackageEditModal(Package: any, index: any) {
      this.displayEditModel = 'block';
      this.AddForm.patchValue({
        id: Package.id,
        name: Package.name,
        numOfAds: Package.numOfAds,
        numOfPremiumDays:Package.numOfPremiumDays,
        adDuration:Package.adDuration,
        cost:Package.cost,
        subCategoryID:Package.subCategoryID
      })
      this.EditIndex = index;
    }
  
    onClosePackageEditModal() {
      this.displayEditModel = 'none';
    }
  
    EditPackage() {
      if (this.name?.valid) {
        this.packageService.EditPackage(this.AddForm.value).subscribe({
          next: (data: any) => {
            if (data.statusCode == 200) {
              this.PackageList[this.EditIndex] = data.data;
              this.onClosePackageEditModal();
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
  
  
    Delete(categoryID: number, index: any) {
      this.packageService.DeletePackage(categoryID).subscribe({
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
                this.PackageList.splice(index, 1);              
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

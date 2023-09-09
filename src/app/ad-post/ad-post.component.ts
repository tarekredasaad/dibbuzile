import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FiltrationServiceService } from '../Services/filtration-service.service';
import { Observable } from 'rxjs';
import { AdvertismentServiceService } from '../Services/advertisment-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-post',
  templateUrl: './ad-post.component.html',
  styleUrls: ['./ad-post.component.scss']
})
export class AdPostComponent {
  constructor(private router: Router, private filterService: FiltrationServiceService,
    private advertismentService: AdvertismentServiceService, private fb: FormBuilder, private activateRoute: ActivatedRoute) {
  }

  ApplicationUserId = localStorage.getItem("ApplicationUserId");
  errorMessage: any;
  catID: any;
  subCatID: any;
  filters: any = []
  filterList: any[][] = [];
  UnitList: any[] = [
    'Hour',
    'Day',
    'Week',
    'Month',
    'Year'
  ];
  flagRentBtn: boolean = false

  AdForm: any = this.fb.group({
    title: ['', [Validators.required]],
    location: ['', Validators.required],
    adType: ['', Validators.required],
    categoryID: [],
    subCategoryID: [],
    applicationUserId: [],
    AdvertismentFiltrationValuesList: this.fb.array([]),
    AdvertismentRentOptions: this.fb.array([]),
    AdvertismentImagesList: ['', Validators.required]
  })

  get title() {
    return this.AdForm.get('title');
  }
  get location() {
    return this.AdForm.get('location');
  }
  get adType() {
    return this.AdForm.get('adType');
  }


  ngOnInit() {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {

      this.catID = params.get('catID');
      this.subCatID = params.get('SubCatID');

      this.AdForm.patchValue({
        categoryID: this.catID,
        subCategoryID: this.subCatID,
        applicationUserId: localStorage.getItem("ApplicationUserId"),
      })

      this.filterService.getSubCategoryFiltersWithIds(this.subCatID).subscribe({
        next: (data: any) => {
          console.log(data);
          this.filters = data.data
          this.filters.forEach((element: any, index: number) => {
            this.filterList[index] = (element.filtrationValuesList)
            const FiltrationValues = this.AdForm.controls.AdvertismentFiltrationValuesList as FormArray;
            FiltrationValues.push(
              this.fb.group({
                filterValueID: ['', [Validators.required]],
              })
            );
          });
          console.log(this.filterList)
        },
        error: (err: any) => {
          console.log(err);
        }
      })
      /*{filterID: 1, filterName: 'BRAND', filtrationValuesList: Array(7)} */

    })


  }

  RentOptions = this.AdForm.controls.AdvertismentRentOptions as FormArray;

  AddRentOption() {
    this.flagRentBtn = true;
    this.AdForm.get('AdvertismentRentOptions').value = [];
    this.RentOptions.clear();
    this.RentOptions.push(
      this.fb.group({
        unit: ['', [Validators.required]],
        duration: ['', [Validators.required]],
        cost: ['', [Validators.required]],
      })
    );

  }

  AddRentOption2() {
    this.RentOptions.push(
      this.fb.group({
        unit: ['', [Validators.required]],
        duration: ['', [Validators.required]],
        cost: ['', [Validators.required]],
      })
    );

  }

  SellOption() {
    this.flagRentBtn = false;
    this.AdForm.get('AdvertismentRentOptions').value = [];
    this.RentOptions.clear();
    this.RentOptions.push(
      this.fb.group({
        unit: [''],
        duration: [0],
        cost: ['', [Validators.required]],
      })
    );

  }

  //selectedFiles?: FileList;
  selectedFiles: File[] = [];
  previews: string[] = [];
  numberOfFiles: any;

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      this.numberOfFiles = this.selectedFiles.length;
      if (this.numberOfFiles > 10) {
        this.numberOfFiles = 10;
      }
      for (let i = 0; i < this.numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }




  postData() {
    console.log(this.AdForm)

    if (this.AdForm.status != "INVALID") {
      const files = this.selectedFiles;
      const formData = new FormData();

      for (let file of files) {
        if (this.numberOfFiles < 20)
          formData.append('AdvertismentImagesList', file);
      }

      formData.append('title', this.AdForm.get('title').value);
      formData.append('location', this.AdForm.get('location').value);
      formData.append('adType', this.AdForm.get('adType').value);
      formData.append('categoryID', this.AdForm.get('categoryID').value);
      formData.append('subCategoryID', this.AdForm.get('subCategoryID').value);
      formData.append('applicationUserId', this.AdForm.get('applicationUserId').value);
      formData.append('AdvertismentFiltrationValuesList', JSON.stringify(this.AdForm.get('AdvertismentFiltrationValuesList').value));
      formData.append('AdvertismentRentOptions', JSON.stringify(this.AdForm.get('AdvertismentRentOptions').value));

      console.log(this.AdForm.get('AdvertismentRentOptions').value)
      this.advertismentService.postAd(formData).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.statusCode == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Ad posted Successfully',
            })
          }
          else if(data.statusCode==204)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message,
            })
          }
        },

        error: (err: any) => {
          console.log(err);
        }
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Information',
      })
    }

  }



}

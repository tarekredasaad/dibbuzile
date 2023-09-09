import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FiltrationServiceService } from '../Services/filtration-service.service';
import { Observable } from 'rxjs';
import { AdvertismentServiceService } from '../Services/advertisment-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.scss']
})
export class AdEditComponent {
  constructor(private router: Router, private filterService: FiltrationServiceService,
    private advertismentService:AdvertismentServiceService, private fb: FormBuilder, private activateRoute: ActivatedRoute) {
  }

  ApplicationUserId = localStorage.getItem("ApplicationUserId");
  errorMessage: any;
  adID: any;
  subCatID:any;
  AdDetails:any={};
  DeletedImages:any=[];
  DeletedRentOptions:any=[];

  currentImagesLegnth:any;
  currentRentOptionsLegnth:any;

  filters: any = []
  filterList: any[][] = [];
  UnitList:any[]=[
    'Hour',
    'Day',
    'Week',
    'Month',
    'Year'
  ];
  flagRentBtn:boolean=false

  EditForm: any = this.fb.group({
    id:[],
    title: ['', [Validators.required]],
    location: ['', Validators.required],
    adType: ['', Validators.required],
    AdvertismentFiltrationValuesList: this.fb.array([]),
    AdvertismentRentOptions:this.fb.array([]),
    AdvertismentImagesList: [''],
  })

  get title() {
    return this.EditForm.get('title');
  }
  get location() {
    return this.EditForm.get('location');
  }
  get adType() {
    return this.EditForm.get('adType');
  }


  ngOnInit() {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.adID = params.get('adID');
       this.subCatID=params.get("SubCatID");     
            
       this.advertismentService.GetAdvertsimentDetailsForEdit(this.adID).subscribe({
        next: (data: any) => {
          console.log(data);
          this.AdDetails = data.data;
          
          this.EditForm.patchValue({
            id:this.AdDetails.id,
            title:this.AdDetails.title,
            location:this.AdDetails.location,
            adType:this.AdDetails.adType
          })

          this.filterService.getSubCategoryFiltersWithIds(this.subCatID).subscribe({
            next: (data: any) => {
              console.log(data);
              this.filters = data.data
              this.filters.forEach((element: any, index: number) => {
                this.filterList[index] = (element.filtrationValuesList)
               
                const FiltrationValues = this.EditForm.controls.AdvertismentFiltrationValuesList as FormArray;
                FiltrationValues.push(
                  this.fb.group({//
                    filterValueID: [this.AdDetails.advertismentFiltrationValuesList[index], [Validators.required]],
                  })
                );
              });
if(this.AdDetails.adType=="For Rent")
{
              this.AdDetails.advertismentRentOptions.forEach((element:any,index:any) => {
                 this.RentOptions = this.EditForm.controls.AdvertismentRentOptions as FormArray;
                this.RentOptions.push(
                  this.fb.group({
                    id:[this.AdDetails.advertismentRentOptions[index].id],
                    unit: [this.AdDetails.advertismentRentOptions[index].unit, [Validators.required]],
                    duration: [this.AdDetails.advertismentRentOptions[index].duration, [Validators.required]],
                    cost: [this.AdDetails.advertismentRentOptions[index].cost, [Validators.required]],
                  })
                );
              }); 
            }
            else
            {
              this.AdDetails.advertismentRentOptions.forEach((element:any,index:any) => {
                this.RentOptions = this.EditForm.controls.AdvertismentRentOptions as FormArray;
               this.RentOptions.push(
                 this.fb.group({
                   id:[this.AdDetails.advertismentRentOptions[index].id],
                   unit: [''],
                   duration: [0],
                   cost: [this.AdDetails.advertismentRentOptions[index].cost, [Validators.required]],
                 })
               );
             }); 
            }


              this.currentImagesLegnth=this.AdDetails.advertismentImagesList.length;
              this.currentRentOptionsLegnth=this.AdDetails.advertismentRentOptions.length;
 
            },
            error: (err: any) => {
              console.log(err);
            }
          })
              
        },
        error: (err: any) => {
          console.log(err);
        }
      })     

    })


  }
  
   RentOptions = this.EditForm.controls.AdvertismentRentOptions as FormArray;


  AddRentOption2()
  {
    this.RentOptions.push(
      this.fb.group({
        id:[0],
        unit: ['', [Validators.required]],
        duration: ['', [Validators.required]],
        cost: ['', [Validators.required]],
      })
    );

  }

  

  selectedFiles:File[]=[];
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




  SaveData() {
    console.log(this.EditForm.get('AdvertismentFiltrationValuesList').value)
    if(this.EditForm.status!="INVALID")
    {
          if(!( (this.DeletedImages.length==this.currentImagesLegnth && this.selectedFiles.length==0)
          ||    (this.DeletedRentOptions.length==this.currentRentOptionsLegnth && this.EditForm.get('AdvertismentRentOptions').controls.length==0)))
          {
          const files =this.selectedFiles;
          const formData = new FormData();

          for (let file of files) {
            if (this.numberOfFiles < 20)
              formData.append('AdvertismentImagesList', file);
          }

          formData.append('id', this.EditForm.get('id').value);
          formData.append('title', this.EditForm.get('title').value);
          formData.append('location', this.EditForm.get('location').value);
          formData.append('AdvertismentFiltrationValuesList',JSON.stringify(this.EditForm.get('AdvertismentFiltrationValuesList').value));
          formData.append('AdvertismentRentOptions',JSON.stringify(this.EditForm.get('AdvertismentRentOptions').value));
          
          for (let imageID of this.DeletedImages) {
            formData.append('DeletedImages',imageID );
          }

          this.advertismentService.SaveAdvertsimentEdits(formData).subscribe({
            next: (data: any) => {
              console.log(data);
              Swal.fire({
                icon: 'success',
                text: 'Ad Edited Successfully',
              })
            },

            error: (err: any) => {
              console.log(err);
            }
          })
        }
  }
  else
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid Information',
    })
  }
  }

  
  deleteImage(imageID:any,index:any)
  {
    this.AdDetails.advertismentImagesList.splice(index,1)
    this.DeletedImages.push(imageID);
  }


  deleteRentOption(rentOptionID:any,index:any)
  {
    this.EditForm.controls.AdvertismentRentOptions?.controls.splice(index,1);
    this.DeletedRentOptions.push(rentOptionID);
    console.log(rentOptionID)
  }

}

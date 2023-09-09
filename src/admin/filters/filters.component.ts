import { Component } from '@angular/core';
import { FilterService } from '../Services/filter.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DisplayService } from 'src/app/Services/display.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  display='';
  displayEditModel='';
  FilterList:any=[];
  messageError='';
  EditIndex:any;

  constructor(private filterService:FilterService,private fb:FormBuilder,private displayService: DisplayService){}


  

  ngOnInit() {
    this.displayService.setNavigationVisibility(false);

    this.filterService.getallFilters().subscribe({
      next: (data:any) => {
        if(data.statusCode==200)
        {
          console.log(data);
          this.FilterList=data.data;
        }
        else
        {
          this.messageError=data.message;
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
    
    openFilterModal(){
    this.display='block';
   
  }

  onCloseFilterHandled(){
    this.display='none';
  }


    AddForm=this.fb.group({
    id:[1,[Validators.required]],
    name:['',[Validators.required]]
    })
  
    get id()
    {
      return this.AddForm.get('id');
    }


    get name()
    {
      return this.AddForm.get('name');
    }


    AddFilter()
    {
      if(this.name?.valid)
      {
        console.log(this.AddForm.value)
        this.filterService.AddFilter(this.AddForm.value).subscribe({
          next: (data:any) => {
            if(data.statusCode==200)
          {
          console.log(data);
          this.FilterList.push(data.data);
          this.onCloseFilterHandled();
          }
          else
          {
            this.messageError=data.data.ModelStateErrors.errors;
          }
          },
          error: err => {
            console.log(err);
          }
        }); 
      }
  
    }




  
    openFilterEditModal(filter:any,index:any)
  {
      this.displayEditModel='block';
         this.AddForm.patchValue({
        id:filter.id,
        name:filter.name  
       })
       this.EditIndex=index;
  }

  onCloseFilterEditModal(){
    this.displayEditModel='none';
  }


  EditFilter()
  {
    if(this.AddForm.valid)
    {
      this.filterService.EditFilter(this.AddForm.value).subscribe({
        next: (data:any) => {
          if(data.statusCode==200)
        {
        this.FilterList[this.EditIndex]=data.data;
        this.onCloseFilterEditModal();
        }
        else
        {
          this.messageError=data.data.ModelStateErrors.errors;
        }
        },
        error: err => {
          console.log(err);
        }
      }); 
    }
    
  }
  

  Delete(filterID:number,index :any){
  console.log(index)
    this.filterService.DeleteFilter(filterID).subscribe({
      next: (data:any) => {
        if(data.statusCode==200)
      {
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
              this.FilterList.splice(index,1);
            }
    
      }
      else
      {
        console.log(data.message);
      }
      },
      error: err => {
        console.log(err);
      }
    }); 

  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterationRoutingModule } from './filteration-routing.module';
import { FilterSideComponent } from './FilterSide/filter-side/filter-side.component';
import { AddvertisSideComponent } from './AddvertisSide/addvertis-side/addvertis-side.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FilterSideComponent,
    AddvertisSideComponent
    
  ],
  imports: [
    CommonModule,
    FilterationRoutingModule,
    FormsModule
  
  ]
  ,exports:[FilterSideComponent
  ,AddvertisSideComponent
  
]
})
export class FilterationModule { }

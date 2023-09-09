import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CategoriesComponent } from './categories/categories.component';
import { FiltersComponent } from './filters/filters.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubcategoryFiltersComponent } from './subcategory-filters/subcategory-filters.component';
import { FilterValuesComponent } from './filter-values/filter-values.component';
import { PackageComponent } from './package/package.component';
import { AdvertismentComponent } from './advertisment/advertisment.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    FiltersComponent,
    SidebarComponent,
    SubcategoryFiltersComponent,
    FilterValuesComponent,
    PackageComponent,
    AdvertismentComponent
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
   // MatTabsModule,
    ReactiveFormsModule
    
    
  ]
})
export class AdminModule { }

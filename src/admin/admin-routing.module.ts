import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { FiltersComponent } from './filters/filters.component';
import { SubcategoryFiltersComponent } from './subcategory-filters/subcategory-filters.component';
import { FilterValuesComponent } from './filter-values/filter-values.component';
import { PackageComponent } from './package/package.component';
import { AdvertismentComponent } from './advertisment/advertisment.component';
import { AdminAuthGuardService } from 'src/authintication/Services/admin-auth-guard.service';

const routes: Routes = [
  {path:'dashboardLogin',component:DashboardComponent},
  {path:'dashboard/categories',component:CategoriesComponent,canActivate:[AdminAuthGuardService]},
  {path:'dashboard/filters',component:FiltersComponent,canActivate:[AdminAuthGuardService]},
  {path:'dashboard/subCategoryFilters',component:SubcategoryFiltersComponent,canActivate:[AdminAuthGuardService]},
  {path:'dashboard/filterValues',component:FilterValuesComponent,canActivate:[AdminAuthGuardService]},
  {path:'dashboard/advertisments',component:AdvertismentComponent,canActivate:[AdminAuthGuardService]},
  {path:'dashboard/packages',component:PackageComponent,canActivate:[AdminAuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

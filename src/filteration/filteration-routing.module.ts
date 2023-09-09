import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddvertisSideComponent } from './AddvertisSide/addvertis-side/addvertis-side.component';

const routes: Routes = [
  {path:'Advertisment/:id/:type',component:AddvertisSideComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterationRoutingModule { }

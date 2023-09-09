import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubcatgoryFiltersService {

    
  _AllSubCatFiltersUrl="http://localhost:7189/api/Admin/GetAllSubCategoriesFilters";
  _AddSubCatFilterUrl="http://localhost:7189/api/Admin/PostSubCategoryFilter";
  _EditSubCatFilterUrl="http://localhost:7189/api/Admin/EditSubCategoryFilter";
  _DeleteSubCatFilterUrl="http://localhost:7189/api/Admin/DeleteSubCatFilter?id=";

  
  constructor(private http:HttpClient) { }

  getallSubCatFilters()
  {
   return this.http.get(this._AllSubCatFiltersUrl).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  AddSubCatFilter(SubCatfilter:any)
  {
   return this.http.post(this._AddSubCatFilterUrl,SubCatfilter).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  EditSubCatFilter(SubCatfilter:any)
  {
   return this.http.put(this._EditSubCatFilterUrl,SubCatfilter).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  DeleteSubCatFilter(SubCatfilterID:any)
  {
   return this.http.delete(this._DeleteSubCatFilterUrl+SubCatfilterID).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }

}

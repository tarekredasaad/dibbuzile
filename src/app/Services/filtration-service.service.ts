import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ISubCategoryFilter } from '../Interfaces/ISubCategoryFilter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltrationServiceService {

  _SubCatFilterUrl="http://tariqreda308-001-site1.etempurl.com/api/SubCategory_Filter/subCategoryID?subCategoryID=";


  constructor(private http:HttpClient) { }

  getSubCategoryFilters(subCategoryID:any):Observable<ISubCategoryFilter[]>
  {
   return this.http.get<ISubCategoryFilter[]>(this._SubCatFilterUrl+subCategoryID).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }

  getSubCategoryFiltersWithIds(subCategoryID:any)
  {
   return this.http.get("http://tariqreda308-001-site1.etempurl.com/api/SubCategory_Filter/GetAllFiltersWithAndValuesID?subCategoryID="+subCategoryID).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }

}

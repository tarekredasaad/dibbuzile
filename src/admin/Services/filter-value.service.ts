import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FilterValueService {


  _AllFilterValueUrl="http://localhost:7189/api/Admin/GetAllFiltrationValues";
  _AddFilterValueUrl="http://localhost:7189/api/Admin/PostFilterValue";
  _EditfilterValueUrl="http://localhost:7189/api/Admin/EditFilterValue";
  _DeletefilterValueUrl="http://localhost:7189/api/Admin/DeleteFilterValue?id=";

  
  constructor(private http:HttpClient) { }

  getallFilterValues()
  {
   return this.http.get(this._AllFilterValueUrl).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  AddFilterValue(filterValue:any)
  {
   return this.http.post(this._AddFilterValueUrl,filterValue).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  EditFilterValue(filterValue:any)
  {
   return this.http.put(this._EditfilterValueUrl,filterValue).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  DeleteFilterValue(filterValueID:any)
  {
   return this.http.delete(this._DeletefilterValueUrl+filterValueID).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }
}

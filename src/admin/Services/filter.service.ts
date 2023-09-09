import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  
  _AllFilterUrl="http://localhost:7189/api/Admin/GetAllFilters";
  _AddFilterUrl="http://localhost:7189/api/Admin/PostFilter";
  _EditFilterUrl="http://localhost:7189/api/Admin/EditFilter";
  _DeleteFilterUrl="http://localhost:7189/api/Admin/DeleteFilter?id=";

  
  constructor(private http:HttpClient) { }

  getallFilters()
  {
   return this.http.get(this._AllFilterUrl).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  AddFilter(filter:any)
  {
   return this.http.post(this._AddFilterUrl,filter).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  EditFilter(filter:any)
  {
   return this.http.put(this._EditFilterUrl,filter).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  DeleteFilter(filterID:any)
  {
   return this.http.delete(this._DeleteFilterUrl+filterID).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }

}

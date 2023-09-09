import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  _AllCategoryUrl="http://localhost:7189/api/Admin/GetAllCategories";
  _AddCategory="http://localhost:7189/api/Admin/PostCategory";
  _EditCategory="http://localhost:7189/api/Admin/EditCategory";
  _DeleteCategory="http://localhost:7189/api/Admin/DeleteCategory?id=";

  
  constructor(private http:HttpClient) { }

  getallCategories()
  {
   return this.http.get(this._AllCategoryUrl).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  AddCategory(category:any)
  {
   return this.http.post(this._AddCategory,category).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  EditCategory(category:any)
  {
   return this.http.put(this._EditCategory,category).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  DeleteCategory(categoryID:any)
  {
   return this.http.delete(this._DeleteCategory+categoryID).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }

}

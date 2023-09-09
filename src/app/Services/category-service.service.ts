import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from '../Interfaces/ICategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  api:string = "http://tariqreda308-001-site1.etempurl.com/api/"

  _CategoryUrl=this.api+"Category";
  _CategoryUrl2=this.api+"Category/categoryId?categoryId=";


  constructor(private http:HttpClient) { }

  getCategories():Observable<ICategory[]>
  {
   return this.http.get<ICategory[]>(this._CategoryUrl).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }
  getAllofsubCategories(id:any):Observable<ICategory[]>
  {
    return this.http.get<ICategory[]>(this._CategoryUrl2+id).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


}

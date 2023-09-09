import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PackageService {


  _AllPackageUrl="http://localhost:7189/api/Admin/GetAllPackages";
  _AddPackageUrl="http://localhost:7189/api/Admin/PostPackage";
  _EditPackageUrl="http://localhost:7189/api/Admin/EditPackage";
  _DeletePackageUrl="http://localhost:7189/api/Admin/DeletePackage?id=";

  
  constructor(private http:HttpClient) { }

  getallPackages()
  {
   return this.http.get(this._AllPackageUrl).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  AddPackage(Package:any)
  {
   return this.http.post(this._AddPackageUrl,Package).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  EditPackage(Package:any)
  {
   return this.http.put(this._EditPackageUrl,Package).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


  DeletePackage(packageID:any)
  {
   return this.http.delete(this._DeletePackageUrl+packageID).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }
}

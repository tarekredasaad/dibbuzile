import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageServiceService {

  _PackagesUrl="http://tariqreda308-001-site1.etempurl.com/api/Package/GetAllPackageBySubCategoryID?SubCategoryID=";
  _PayPackagesUrl="http://tariqreda308-001-site1.etempurl.com/api/Package/PostApplicationUser_Package";
  _PackagesUserUrl="http://tariqreda308-001-site1.etempurl.com/api/Package/GetAllPackageByUserID?ApplicationUserId=";



  constructor(private http:HttpClient) { }

  getPackages(subCategoryID:any)
  {
   return this.http.get(this._PackagesUrl+subCategoryID).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }

  Pay(PackageAppUser:any)
  {
    return this.http.post(this._PayPackagesUrl,PackageAppUser).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }


  getPackagesOfLoggedUser(userId:any)
  {
   return this.http.get(this._PackagesUserUrl+userId).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }
}

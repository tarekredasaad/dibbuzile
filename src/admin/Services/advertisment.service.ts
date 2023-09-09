import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertismentService {

  _AllNotActiveAdsUrl="http://localhost:7189/api/Admin/GetAllNotActiveAdvertisments";
  _EditNotActiveAdUrl="http://localhost:7189/api/Admin/EditAdvertisment?id=";

  
  constructor(private http:HttpClient) { }

  getallNotActiveAds()
  {
   return this.http.get(this._AllNotActiveAdsUrl).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }



  EditNotActiveAd(AdID:any)
  {
   return this.http.put(this._EditNotActiveAdUrl+AdID,0).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }


}

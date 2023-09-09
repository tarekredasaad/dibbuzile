import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAdvertisment } from '../Interfaces/IAdvertisment';
import { IAdvertismentDetails } from '../Interface/AdvertismentDetails';
import { IadvertismetUser } from '../Interface/Advertisments\'sUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertismentServiceService {

  api:string = "http://tariqreda308-001-site1.etempurl.com/api/"

  _AdvertismentCatUrl=this.api+"Advertisment/CategoryID?CategoryID=";
  _AdvertismentSubCatUrl=this.api+"Advertisment/subCategoryID?subCategoryID=";


  constructor(private http:HttpClient) { }

  getAdsByCategoryID(catId:any,userId:any):Observable<IAdvertisment[]>
  {
   return this.http.get<IAdvertisment[]>(this._AdvertismentCatUrl+catId+'&UserId='+userId).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }

  getAdsBySubCategoryID(SubCatID:any,userId:any):Observable<IAdvertisment[]>
  {
   return this.http.get<IAdvertisment[]>(this._AdvertismentSubCatUrl+SubCatID+'&UserId='+userId).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }



  getDetails(AdvertismentId:any,userId:any):Observable<IAdvertismentDetails>{
    return this.http.get<IAdvertismentDetails>(`${this.api}Advertisment/Details/${AdvertismentId}/${userId}`).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
  }));
  }

  getAdvertismentUser(userId:any,currentUserId:any):Observable<IadvertismetUser>{
    return this.http.get<IadvertismetUser>(`${this.api}Advertisment/Advertisment's User/${userId}/${currentUserId}`).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }


  getMyAdvertisments(userId:any):Observable<IAdvertisment>{
    return this.http.get<IAdvertisment>(`${this.api}Advertisment/GetMyAdvertisments?ApplicationUserID=${userId}`).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }

  deActivateMyAd(AdID:any)
  {
    return this.http.put(`${this.api}AdUser/DeActivateMyAd?id=${AdID}`,0).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }

  ActivateMyAd(AdID:any)
  {
    return this.http.put(`${this.api}AdUser/AvtivateMyAd?id=${AdID}`,0).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }

  getAdvertismentByQuery(query:any,UserId:any)
{
    return this.http.get(`${this.api}Advertisment/search?query=${query}&UserId=${UserId}`).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }

  postAd(formdata:any)
  {
    return this.http.post(`${this.api}AdUser/PostAdvertsiment`,formdata).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }

  GetAdChatUsers(AdID:any)
  {
    return this.http.get(`${this.api}AdUser/GetAdChatUsers?id=${AdID}`).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }


  RentMyAd(AdID:any,BuyerUserId:any)
  {
    return this.http.get(`${this.api}AdUser/RentMyAd?id=${AdID}&ApplicationUserId=${BuyerUserId}`).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }

  GetAdvertsimentDetailsForEdit(AdID:any)
  {
    return this.http.get(`${this.api}AdUser/GetAdvertsimentDetailsForEdit?ID=${AdID}`).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }


  SaveAdvertsimentEdits(formdata:any)
  {
    return this.http.put(`${this.api}AdUser/SaveAdvertsimentEdits`,formdata).pipe(catchError((err: any) => {
    return throwError(() => err.message || "server error");
    }));
  }
}

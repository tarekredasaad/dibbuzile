import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from '../Interface/ICategory';
import { IAdsHomePage } from '../Interface/IAdvertisment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http:HttpClient) { }
  api:string = "http://tariqreda308-001-site1.etempurl.com/api/"
  getCategoriesWithSub():Observable<Icategory[]>{
    return this.http.get<Icategory[]>(`${this.api}Category/CategoriesWithSubcategoriesAndAdvertisment`);
  }
  getAdvertisments(userId:any):Observable<IAdsHomePage[]>{
    return this.http.get<IAdsHomePage[]>(`${this.api}Advertisment/GetAllAdsInHomePage/${userId}`);
  }
}

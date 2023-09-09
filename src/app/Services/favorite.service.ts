import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFavourite } from '../Interface/IFavorite';
import { IGetAllFavorite } from '../Interface/GetIFavorite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http:HttpClient) { }
  api:string = "http://tariqreda308-001-site1.etempurl.com/api/"

  AddFavorite(AdsFavourite:any):Observable<IFavourite>{
    return this.http.post<IFavourite>(`${this.api}Favorite/AddFavorite`,AdsFavourite);
  }
  DeleteFavorite(AdsId:any,userId:any):Observable<IFavourite>{
    return this.http.delete<IFavourite>(`${this.api}Favorite/DeleteFavourite/${AdsId}/${userId}`);
  }
  getAllFavorite(userId:any):Observable<IGetAllFavorite>{
    return this.http.get<IGetAllFavorite>(`${this.api}Favorite/GetAllFavorite/${userId}`);
  }
}
